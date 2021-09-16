# Tema: Manejo de variables de entorno

### Versión 1.0

Por **Moisés Retamal** (meretamal@uc.cl)

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1_0A99H8FML68gLKSRhMPyLRiUb0iUDBm/view?usp=sharing)

## ¿Qué son?

Una variable de entorno es una variable cuyo valor se establece fuera del programa, generalmente a través de una funcionalidad integrada en el sistema operativo. Una variable de entorno está formada por un par nombre/valor, para luego estar disponible para ser utilizada.

Generalmente vamos a utilizar variables de entorno cuando queramos almacenar información sensible fuera de nuestra aplicación, como las credenciales de nuestra base de datos, llaves de una API o cualquier otro tipo de información que deba mantenerse en secreto.

## ¿Cómo configurarlas?

Existen distintas herramientas que nos permiten utilizar variables de entorno dentro de nuestros proyectos. Para efectos del curso, les recomendamos dos: _dotenv_ y _direnv_

### Dotenv

_Dotenv_ es un paquete de _node_ que nos permite leer variables de entorno almacenadas en un archivo **.env** en la raíz de nuestra aplicación.

A modo de ejemplo, crearemos un proyecto de _node_ donde utilizaramos variables de entorno y las leeremos usando _dotenv_.

Para esto primero ejecuta:

```bash
mkdir dotenv-example
cd dotenv-example
npm init -y
```

Así crearemos una carpeta llamada **dotenv-example** e iniciaremos un proyecto de _node_ en esta.

Ahora agrega _dotenv_ a las dependecias de tu aplicación. Esto lo puedes hacer usando _npm_ o _yarn_.

Usando _npm_:
```bash
npm install dotenv
```

Usando yarn:
```bash
yarn add dotenv
```

Luego crea un archivo llamado **.env** en la raíz de tu proyecto y agrega el siguiente contenido dentro de él:

```env
MY_ENV_VARIABLE_NAME=my_env_variable_value
```

De esta manera crearemos una variable llamada `MY_ENV_VARIABLE_NAME` que tendrá un valor igual a "my_env_variable_value".

Por último crea un archivo llamado index.js y escribe:

```js
require("dotenv").config();
console.log(process.env.MY_ENV_VARIABLE_NAME);
```

La primera línea importará _dotenv_ y llamará a su método `config`, el cual se encarga de buscar un archivo **.env** en la raíz de tu aplicación y cargar las variables de entorno definidas dentro de él.

Para verificar que todo funcione correctamente, ejecuta `node index.js` y se debería imprimr "my_env_variable_value" en tu consola.

### Direnv

_Direnv_ es una extensión para tu consola. Aumenta los shells existentes con una nueva función que puede cargar y descargar variables de entorno según el directorio actual.

Para utilizarla, primero instala _direnv_:

OSX:
```bash
brew install direnv
```

Ubuntu:
```bash
sudo apt-get update
sudo apt-get install direnv
```

Luego tenemos que agregar _direnv_ a nuestro PATH.

Si usas _bash_, ejecuta:

```bash
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

Si usas _zsh_, ejecuta:

```zsh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

**Luego reinicia tu terminal**

Ahora veremos cómo usar direnv para cargar nuestras variables de entorno

A modo de ejemplo, crearemos un proyecto de _node_ donde utilizaramos variables de entorno y las leeremos usando _direnv_.

Para esto primero ejecuta:

```bash
mkdir direnv-example
cd direnv-example
npm init -y
```

Luego crea un archivo llamado **.envrc** en la raíz de tu proyecto y agrega el siguiente contenido dentro de él:

```env
export MY_ENV_VARIABLE_NAME=my_env_variable_value
```

De esta manera crearemos una variable llamada `MY_ENV_VARIABLE_NAME` que tendrá un valor igual a "my_env_variable_value".

Ahora ejecuta el siguiente comando para permitir que _direnv_ acceda a esta variable:

```bash
direnv allow .
```

Por último crea un archivo llamado index.js y escribe:

```js
console.log(process.env.MY_ENV_VARIABLE_NAME);
```

Para verificar que todo funcione correctamente, ejecuta `node index.js` y se debería imprimr "my_env_variable_value" en tu consola.
