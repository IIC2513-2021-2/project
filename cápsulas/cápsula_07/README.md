# Tema: Validación de recursos.

### Versión 1.0

Por **Pablo Kipreos** (pjkipreos@uc.cl)

### Video
La cápsula contempla un video, en el siguiente [enlace](https://drive.google.com/file/d/11iUKVAgeXLtod7F2tSmxdNqin75tqpub/view?usp=sharing) en donde se presenta cómo integrar la validación de recursos de modelos y manejar los errores que se pueden presentar en el proceso.

## ¿Qué veremos? 

A lo largo de la cápsula se presentan tres temas principales. Primero, se explica como integrar en la definición de modelos la validación de sus atributos. Luego, se muestra como manejar el caso de que no se cumplan las validaciones establecidas. Por último, se muestra una forma de poder mantener la información ingresada por el usuario, en caso de que haya campos inválidos.

## Agregando las validaciones

La idea de las validaciones es establecer ciertas reglas al momento de instanciar un modelo. En este caso, definiremos restricciones para el valor que puede tomar un atributo. Si esta regla no se cumple, entonces no será posible guardar la instancia en nuestra base de datos.

El ejemplo más básico es establecer que un atributo, en este caso el nombre, no pueda ser vacío. Para implementar esto, tenemos que agregar un nuevo argumento al atributo, con nombre `validate`, donde iremos ingresando todas las validaciones que queramos implementar.

Así, el atributo `name` en nuestro modelo `artist` que estaba programado de la forma:

```javascript
name: DataTypes.STRING
```

pasará a definirse con la siguiente estructura:

```javascript
name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
}
```

donde `notEmpty` representa la validación que implementamos.



## Manejo de errores

Un tema importante a considerar es que, cuando hay un problema de validación, se levanta una excepción (en específico, `ValidationError`). Dado esto, si no manejamos correctamente el error, **nuestro servidor se va a caer**. Por suerte, podemos utilizar `try/catch` para no solo manejar el error, sino que también conseguir información sobre qué validaciones no se cumplieron.

Lo que haremos, entonces, es dejar el build del artista (en la ruta de `create`) dentro del try, y en el caso que no funcione, enviaremos al front end el contenido de `ValidationError.errors`, que es una lista con los problemas que se presentaron.

```javascript
try {
    await artist.save({ fields: ['name', 'origin', 'genres', 'formedAt', 'members'] });
    ctx.redirect(ctx.router.url('artists.list'));
  } catch (ValidationError) {
    await ctx.render('artists/new', {
      artist,
      errors: ValidationError.errors,
      submitArtistPath: ctx.router.url('artists.create'),
      artistsPath: ctx.router.url('artists.list'),
    });
}
```

Luego, en el frontend podemos imprimir cada error de la lista

```
<% if (locals.errors) { %>
    Please fix the following errors:
    <ul>
      <% errors.forEach(error => { %>
        <li><%= error.message %></li>
      <% }) %>
    </ul>
<% } %>
```

## Persistencia de información

Como se mencionamos, la idea es que la información que haya sido ingresada en el formulario para crear un artista se mantenga cuando la página se vuelva a renderizar (por problemas de validación). Para esto, podrás notar en el código anterior que estamos enviando el artista al frontend (fijate que en los parámetros está `artist`). El único problema que tenemos que solucionar es que ese mismo parámetro se envie cuando se renderiza por primera vez la página (en la ruta `new`). 

Para esto, podemos simplemente crear un artista vacío, el cual realmente tendrá todos sus atributos vacíos. 

```javascript
const artist = ctx.orm.artist.build();
```

Y este mismo artista lo enviamos al frontend, al igual que en la ruta `create`.

Con acceso al artista, entonces podemos agregar el atributo `value` en los `input` de nuestra vista, lo que hará que los campos tengan de valor inicial lo que el usuario había ingresado anteriormente.

```HTML
<input type="text" name="name" id="name" value="<%= artist.name %>"/>
```

## Referencias 

[Validation & Constraints](https://sequelize.org/master/manual/validations-and-constraints.html)

[ValidationError](https://sequelize.org/master/class/lib/errors/validation-error.js~ValidationError.html)