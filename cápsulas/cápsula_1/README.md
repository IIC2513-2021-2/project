# Tema: Intro a Node y manejo de dependencias

### Versión: 1.0

Por **Moisés Retamal**

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1DwAJ-9YSvp2DmE7ztKEHt0i5xhrF4BO2/view?usp=sharing)

## Node

Node JS es un _runtime_ o entorno de ejecucion de JavaScript que nos permite ejecutar código de JS desde el lado del servidor, en lugar de hacerlo en el _browser_.

### NVM

Al momento de instalar Node en nuestro computador, podemos optar por instalarlo directamente o mediante un manejador de versiones. Si eligiéramos instalarlo directamente solo tendríamos una versión única del *framework*, lo cual se puede volver complejo a medida que comenzamos a trabajar con diferentes proyectos.

La solución a esto es utilizar un manejador de versiones: **NVM** *(Node Version Manager)*. Este manejador se encargará de controlar las diferentes versiones de node dentro de nuestro computador, permitiendo que podamos cambiar fácilmente entre ellas a medida que lo necesitamos.

Para instalar NVM deben correr:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Para comprobar su instalación pueden ejecutar:

```bash
nvm --version
```

En el caso de que les diga que no reconoce el comando, intenten reinciar su terminal y volver a ejecutarlo. Si es que siguen con el mismo problema abran **~/.zshrc** o **~/.bashrc** (dependiendo de qué usen) y agreguen las siguiente línea:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Reiniciando una vez más su terminal ya debería estar todo listo para utilizar NVM.

### Instalando Node

Ahora que ya tienen NVM funcionando, es hora de instalar Node.

Para esto ejecuten `nvm install` seguido de la versión que quieran instalar, por ejemplo:

```bash
nvm install 12 # que es la versión que usa el template del curso
```

Si quieren asegurarse de usar esa versión o quieren cambiarla más adelante, corran:

```bash
nvm use 12
```

Para comprobar que efectivamente están usando esa versión pueden correr:

```bash
node --version
```

### Creando un proyecto de Node

### `package.json`
Dentro de un proyecto con NodeJS encontrarán un archivo llamado `package.json`. Este archivo describe cómo debe comportarse el proyecto, es decir, indica la versión de Node a utilizar, junto a todas las librerías que necesitan instalar.
Un ejemplo de un archivo básico sería el siguiente:
```json
{
    "name": "ejemplo-package", //Nombre del proyecto
    "version": "0.0.1", //Versión del proyecto
    "description": "Comparison of Node.js template languages.", //Descripción del proyecto
    "author": "Paul Armstrong <paul@paularmstrongdesigns.com>", //Autor del proyecto
    "dependencies": { //Librerías requeridas <<==============
        "nopt": ">=1.0.8", //nombre_librería: versión_requerida
        "bench": ">=0.3.2",
        "nodelint": "0.5.2",
        "underscore": ">=1.1.7",
        "coffeekup": "0.3.0",
        "ejs": "0.4.2",
    }
}
```
> Fuente: [https://github.com/paularmstrong/node-templates/blob/master/package.json](https://github.com/paularmstrong/node-templates/blob/master/package.json)

#### `node_modules/`

Cada vez que se instale una librería para utilizar en Node, su información será almacenada en el directorio `node_modules/`. Es importante no alterar su información directamente, ya que Node no espera que eso suceda y no comprueba esos cambios.

### Manejador de dependencias NPM y Yarn
Al momento de trabajar con las librerías antes mencionadas, debe haber una forma de instalarlas, actualizarlas o eliminarlas.
Aquí entran nuestros manejadores de dependencias:
* **Node Package Manager (NPM):** Esta es la herramienta que tiene Node por defecto para el manejo de dependencias. Se instala por defecto junto a Node.
* **Yarn:** Es un manejador que creó Facebook en contraparte a Node debido a algunos problemas que solía tener NPM. Se instala externamente. Se aconseja no usar la instalación por defecto en algunas distribuciones de Ubuntu como `cmdtest`. Se aconseja remover `cmdtest` y luego seguir la [guía de instalación oficial](https://classic.yarnpkg.com/en/docs/install#windows-stable).

Ambos manejadores trabajan en base a `package.json` para el manejo de dependencias, pero cada uno tiene sus cualidades y veremos cuales son las principales.
#### ¿NPM o Yarn?
Antes de NPM 5, NPM solía ser bastante lento, no instalaba de forma determinista los paquetes y no configuraba directamente `package.json` al instalar una nueva librería.

Debido a esto nació Yarn, el cual si permitía hacer todo lo anterior, fuera de ser 2-3 veces más rápido en la instalación de dependencias.
Hoy en día, Yarn y NPM 5 se encuentran bastante a la par, pero Yarn sigue siendo el preferido, ya que entre otras cosas sigue superando en rapidez.

#### Instalar dependencias
Ahora, visto todo lo anterior, podemos agregar dependencias a nuestro proyecto. Para esto tenemos dos opciones, agregar la nueva librería de forma manual al `package.json` o agregarla a través del manejador.
* **Instalación directa en `package.json`:** Para esto solo debemos modificar el archivo `package.json` agregando la nueva librería en el diccionario `"dependencies"` según el formato `nombre_librería: versión_librería`.
Por ejemplo agreguemos `jQuery`:
    ```json
    //package.json
    {
        ...,
        "dependencies": {
            ...,
            "jquery": "3.5.1"   
        }
    }
    ```
    Ahora solo hemos modificado el archivo, por lo tanto, falta realizar la instalación.
    Para eso ejecutamos lo siguiente desde la terminal dependiendo de nuestro manejador de dependencias:
    ```bash
    npm install # si es que usan npm
    ```
    ```bash
    yarn install # si es que usan yarn
    ```
    Eso instalará todo (o lo que falte) desde `package.json` en `node_modules/`.

* **Instalación mediante manejador NPM o Yarn:** Con el manejador esto puede resultar un poco más sencillo, ya que solo basta con ejecutar un comando para que el manejador **actualice `package.json` e instale la librería.**
Ejemplo con `jQuery`:
    * **En caso de utilizar NPM:**
        ```bash
        npm install jquery
        ```
        Lo anterior instalará la última versión estable de la librería, pero se puede especificar una versión mediante el uso de `@`.
        ```bash
        npm install jquery@3.5.1
        ```
    * **En caso de utilizar Yarn:**
        ```bash
        yarn add jquery
        ```
        Lo anterior instalará la última versión estable de la librería, pero se puede especificar una versión mediante el uso de `@`.
        ```bash
        yarn add jquery@3.5.1
        ```
    Para ambos mecanismos, es válida la información oficial de los las librerías encontrada en el [sitio web de NPM](https://www.npmjs.com).
    
#### Lockfiles y `node_modules/`
Tanto Yarn como NPM (desde la versión 5) utilizan LockFiles para determinar el orden y versiones de instalación para las librerías.
Estos archivos permiten que las dependencias de un proyecto se mantengan constantes independientemente del entorno de ejecución, es decir, para todos los desarrolladores del proyecto tendrán los mismos módulos instalados y por lo tanto, sus directorios `node_modules/` serán idénticos.

Para Yarn se tiene el archivo `yarn.lock` y npm tiene `package-lock.json`. Cada uno tiene su formato de escritura y es válido únicamente en el manejador respectivo. Por lo mismo, es recomendable atenerse a uno solo de ambos manejadores, ya que yarn no actualiza el `package-lock.json` y npm no actualiza el `yarn.lock`.