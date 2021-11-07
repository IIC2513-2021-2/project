# Tema: PostgreSQL

### Versión 1.0

Por **Moisés Retamal** (meretamal@uc.cl)

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1flEsuwZi4KEplvODpZNMwcF0tpVbfOwL/view?usp=sharing)

## Manual de _setup_

### Paso Número 1: Instalar Homebrew

Primero verifica si tienes _Homebrew_ instalado ejecutando:

```bash
brew -v
```

Si es que no lo tienes instalado, ejecuta:

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/master/install.sh
```

### Paso Número 2: Instalación de PostgreSQL

Ahora instala PostgreSQL en tu máquina. Para eso, ejecuta el siguiente comando:

```bash
brew install postgresql
```

### Paso Número 3: Creación de un usuario

Ahora debemos crear un nuevo rol de PostgreSQL. Para esto primero debemos iniciar un servicio de PostgreSQL, ejecutando el siguiente comando:

```bash
brew services start postgresql
```

Ahora ingresamos a la consola de PostgreSQL:

```bash
psql postgres
```

Luego creamos un nuevo usuario llamado **myuser** con contraseña **mypassword** (pon el nombre y la contarseña que tu quieras):

```bash
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
```

Ojo con que la contraseña esté entre comillas simples.

Para verificar que se creó correctamente, puedes ejecutar `\du`.

### Paso Número 4: Creación de una base de datos

Ahora solo falta crear una base de datos asociada al usuario que acabamos de crear. Para esto ejecuta

```bash
CREATE DATABASE mydatabase OWNER myuser;
```

Para verificar que se creó correctamente, puedes ejecutar `\list`.

Por último, para salir de la consola de postgres, ejecuta `\q`.

**¡Ya tenemos tenemos listo el _setup_ de nuestra base de datos!**
