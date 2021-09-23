# Tema: Deploy a Heroku

### Versión 1.0

Por **Michel Magna** (mamagna@uc.cl)

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1sOunfKmzyBwNkda45eAWxLy1a2WTxRtC/view?usp=sharing)

## ¿Qué es Heroku?

Heroku es una plataforma en la nube, que entrega un conjunto de herramientas para subir, monitorear y escalar nuestra aplicación.

Sus beneficios son que soporta múltiples lenguajes como NodeJS, Ruby, PHP y Python. 

Además, controla la base de datos, seguridad, orquestación, balanceadores de cargas, caché y los registros. 

### Heroku Postgres 
 
 En Heroku pordemos agregar imagen de Postgres de forma fácil con un Add-on. Al agregar este Add-On inmmediatamente se setea una variable de entorno. 

 ### Opciones de Deploy 

 Hay 3 distintas opciones para hacer el deploy: Container Registry, GitHub y Heroku Git. En el ejemplo de esta cápsula se usará la última opción. De esta forma usaremos [Heroku CLI](https://devcenter.heroku.com/categories/command-line) para acceder al directorio donde tenemos el proyecto al que se le hará Deploy. 

## Manual de _Deploy_

### Paso Número 1: Instalar Heroku CLI

Sigue las indicaciones en la [documentación oficial](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) de heroku para realizar la instalación.

Puedes revisar si ya se instaló con el siguiente comando en la consola: 
```bash
heroku --version
```

### Paso Número 2: Crear aplicación

En esta cápsula, este paso se desarrolla desde la plataforma de Heroku. Sin embargo, también se puede hacer desde la consola (ver [documentación oficial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#prepare-the-app)).

Teniendo una cuenta en Heroku, y habiendo iniciado sesión, se accede al [dashboard](https://dashboard.heroku.com/apps). 

Se debe seleccionar _New_>_Create New App_, y luego completar el formulario de información de nuestra aplicación, a la que llamaremos en esta cápsula       ejemplo-heroku-deploy. 

Una vez creada, accedemos a _Resources_ y en la barra de búsqueda de _Add-ons_ buscamos y seleccionamos _Heroku Postgres_. Esto nos permitirá guardar la información de nuestra base de datos. 

### Paso Número 3: Login 

Estando en la consola, si aún no se hace login, se debe correr el siguiente comando: 
```bash
heroku login
```

### Paso Número 4: Crear un nuevo repositorio de Git 

Desde el directorio del proyecto se debe inicializar un repositorio de git: 

```bash
git init
```

Ahora, como ya creamos la aplicación, añadimos un _remote_ (versión de nuestro repositorio que vive en otros servidores) a nuestro repo local con el siguiente comando:

```bash
heroku git:remote -a ejemplo-heroku-deploy
```
De esta forma, cuando hagamos push, estaremos haciendo deploy de nuestra app en este remoto hosteado por Heroku. 

### Paso Número 5: Configurar Conexión Node 

Por default, se pedirá una verificación SSL. Para evitar esto, y poder hacer deploy, debemos ejecutar el siguiente comando:  

```bash
heroku config:set PGSSLMODE=no-verify
```

### Paso Número 6: Hacer el Deploy

Los siguientes comandos que ejecutaremos serán los mismos que usamos cuando queremos subir un cambio en GitHub: 

```bash
git add .
git commit -am "deploy"
git push heroku main
```

Esto se demorará unos segundos. Una vez finalizado se puede revisar el detalle de la ejecución con:

```bash
heroku logs
```

**¡Ya logramos hacer deploy de nuestra app!**

Puedes abrirla con el siguiente comando: 
```bash
heroku open
```
o accediendo desde la plataforma de Heroku. 

## Consejos

- Para la instalación y manejo de los paquetes ocupar yarn
- Ignorar archivos grandes e innecesarios como los node_modules

## Referencias 

[Documentación de Heroku](https://devcenter.heroku.com/)
