# Tema: Login utilizando JWT.

### Versión 1.0

Por **Gonzalo Concha** y **Kelsey Franken**

### Video
La cápsula contempla un video, en el siguiente [enlace](https://drive.google.com/file/d/1Wor427noXQ90w4blVWWWJMXD9vsi_2uT/view?usp=sharing) en donde se presenta cómo hacer la autentificación del usuario utilizando json web token (JWT). 

## ¿Qué veremos? 

JWT es un estándar para la generación y el intercambio de tokens entre 2 partes
El JWT propiamente tal, es una cadena de texto con puntos que dividen sus 3 partes: el header, el payload y la firma.
La firma se hace codificando el header y el payload  usando una codificación base64Url y una “clave secreta”, que se guardará en el servidor, específicamente en las variables de entorno. 

En esta cápsula, en primer lugar, se verá como generar y almacenar la clave secreta. En segundo lugar, se hablará de la generación del token y su intercambio para la realización de la autentificación. Por último, se mostrará como usar distintos middlewares para la protección de rutas y definión del current user.  

## Instalación de librerías de la

Antes de partir, se deben instalar las siguientes 2 librerías que nos permitirán generar el token y verificar su validez. 

Ejecuta el siguiente comando en consola. 

```bash
yarn add jsonwebtoken koa-jwt
```

## Clave secreta 

Para crear la clave secreta debemos ingresar a node. En la consola ejecutar 
```bash
node
```
Luego, usaremos una librería que nos permitirá crear nuestra clave secreta. Ejecutar en consola

```bash
require('crypto').randomBytes(32).toString('hex)
```
Esto nos entregará un string con nuestra clave que debemos guardar en nuestras variables de entorno con el nombre JWT_SECRET. 

## Generación e Intercambio del token

Primero, crearemos la base para nuestro archivo de rutas de autentificación. 

En api/auth.js 

``` javascript
const KoaRouter = require('koa-router');
 
const router = new KoaRouter();
 
module.exports = router;
```

Hay que agregar la librería que instalamos para la generación del tokens

``` javascript
const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');
 
const router = new KoaRouter();
 
module.exports = router;
```

Vamos a crear una función que genera el token. Esta recibe el usuario que está intentando iniciar sesión y retorna una promesa.

Utilizamos nuestra librería jwtgenerator, específicamente su función sign.

``` javascript
function generateToken(user){
    return new Promise((resolve, reject) =>{
        jwtgenerator.sign(
        )
    })
}
```

Lo que se le pasa a sign es el payload del token. En este caso le estaremos pasando el id del usuario al campo sub, referente al subject del token (se puede de todas formas entregar más valores, como fecha de creación, nombre del usuario, entre otros). 

``` javascript
function generateToken(user){
    return new Promise((resolve, reject) =>{
        jwtgenerator.sign(
            { sub: user.id },
        )
    })
}
```

Como segundo parámetro se le entrega el JWT_SECRET. Como mencionamos antes, este secreto nos permitirá codificar el header y payload para generar la firma.  

``` javascript
function generateToken(user){
    return new Promise((resolve, reject) =>{
        jwtgenerator.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
        )
    })
}
```

El tercer parámetro es el tiempo de expiración del token una vez generado. A este campo se le pueden pasar distintos valores (en distintos formatos). Por temas de seguridad es bueno que el token tenga una fecha o momento de expiración. Si es que no lo tuviera y este es robado, entonces quién lo robó tendría acceso para siempre a la información y permisos del usuario “dueño” del token. 

``` javascript
function generateToken(user){
    return new Promise((resolve, reject) =>{
        jwtgenerator.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
	     {expiresIn: ‘1h’},
        )
    })
}
```

De todas formas, hay maneras de refrescar un token. Esto es algo bueno a considerar, ya que no sería muy agradable para un usuario que esté haciendo uso de su página activamente tener que estar volviendo a iniciar sesión. 

Por último, le pasamos un callback, el cual es llamado con el error err o el token. Si hay un error, rechazamos la promesa inicial y si no hay error la resolvemos con el token.

``` javascript
function generateToken(user){
    return new Promise((resolve, reject) =>{
        jwtgenerator.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
	     {expiresIn: ‘1h’},
            (err, tokenResult) => (err ? reject(err) : resolve(tokenResult))
        )
    })
}
```
Ahora, hacemos el endpoint. En primer lugar, debemos obtener al usuario y validar tanto su existencia como que la contraseña haya sido ingresada correctamente. Manejaremos ambos errores.

``` javascript
router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });

  if (!user) ctx.throw(404, `No user found with email ${email}`);

  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');
});
```
Una vez pasadas las validaciones, podemos intentar generar y pasar el token con generateToken (recordar que esa función nos entregaba una promesa), a la cual le pasamos el usuario y si lo logramos generar, se lo pasamos al body. Además, le pasamos el tipo del token, que será Bearer. 

``` javascript
router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });

  if (!user) ctx.throw(404, `No user found with email ${email}`);

  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');

  const token = await generateToken(user);
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
  };
});
```
Los campos que le estamos entregando (acces_token y token_type) vienen de la [especificación asociada a los access token](https://datatracker.ietf.org/doc/html/rfc6749#section-5.1), específicamente a cuando la response es exitosa. 

Agregamos ahora la ruta en el index. Primero, importamos el archivo.
``` javascript
const auth = require('./auth');
```
Definimos la ruta.
``` javascript
router.use('/auth', auth.routes());
``` 
## Protección de rutas 
Utilizaremos librería de koa-jwt y la propiedad de los middlewares de ser ejecutados en orden para proteger ciertas rutas.  

Primero, vamos a añadir al index.js las variables de entorno (para acceder a nuestro secreto) y la librería de jwt que tiene el middleware que necesitamos. 

``` javascript
require('dotenv').config();
const jwt = require('koa-jwt');
```
Vamos a agregar el middleware. Este recibe el secreto y una key, la cuál cargará el contenido, osea el payload, del token al state. Esta key permite que el payload quede en ctx.state.authData y no es ctx.state.user. Sin esta especificación tendremos problemas si es que  queremos usar ctx.state.user.

``` javascript
/* Unprotected routes */
router.use('/auth', auth.routes());
 
/* Protected routes */
router.use(jwt({secret: process.env.JWT_SECRET, key:'authData'}))
 
router.use('/artists', artists.routes());
```
Ahora, ¿cómo hacemos para saber qué usuario es el “dueño” del token? Con un middleware. 

Primero vamos a obtener el payload del token ya que este contiene el id del usuario. Como vimos antes, este quedaba en el ctx.state como authData, así que accedemos a este. 

En middlewares/auth.js

``` javascript
function apiSetCurrentUser(ctx, next) {
    const {authData} = ctx.state;

    return next();
}
``` 

Luego, si es que existe este authData, vamos a obtener el id con authData.sub ya que estaba almacenado así en el payload, buscaremos el usuario con este id y lo definiremos como currentUser.

``` javascript
function apiSetCurrentUser(ctx, next) {
    const {authData} = ctx.state;
    if (authData) {
        ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
    }
    return next();
}
``` 

En index.js vamos a importar el middleware 

``` javascript
const { apiSetCurrentUser } = require('../../middlewares/auth');
```
y posterior al middleware de jwt ponemos nuestro middleware apiSetCurrentUser. 

``` javascript
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' });
router.use(apiSetCurrentUser);
``` 
Hay otras opciones para proteger las rutas, las cuáles no son excluyentes entre sí.

Usando este ejemplo en particular, se puede dejar los middlewares dentro de artists.js antes de la ruta que queremos proteger. 

Otra opción es usar el paquete (koa-unless)[https://github.com/Foxandxss/koa-unless] (de koa-jwt) que nos permite ignorar un middleware cuando se cumple cierta condición 

``` javascript
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }).unless({ method: 'GET' }));
``` 
Además, si queremos no proteger las rutas, pero si definir el current user, solo hay que definir como true el parámetro passtrough
``` javascript
router.use(jwt({secret: process.env.JWT_SECRET, key:'authData', passtrough:true}))
``` 

## Referencias 

[node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
[koa-jwt](https://github.com/koajs/jwt)
[The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749#section-5.1)
[koa-unless](https://github.com/Foxandxss/koa-unless)


