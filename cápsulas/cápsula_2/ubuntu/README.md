# Tema: PostgreSQL

### Versión 1.0

Por **Moisés Retamal** (meretamal@uc.cl)

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1XYLzMbhYtv_fahRV1OkFBewVUgDiwypO/view?usp=sharing)

## Manual de _setup_

### Paso Número 1: Instalación de PostgreSQL

Ahora instala PostgreSQL en tu máquina. Para eso, ejecuta el siguiente comando:

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### Paso Número 2: Creación de un usuario

Ahora debemos crear un nuevo rol de PostgreSQL. Para esto primero debemos iniciar un servicio de PostgreSQL, ejecutando el siguiente comando:

```bash
sudo service postgresql start
```

Ahora ingresamos a la consola de PostgreSQL:

```bash
sudo -u postgres psql
```

Luego creamos un nuevo usuario llamado **myuser** con contraseña **mypassword** (pon el nombre y la contraseña que tu quieras):

```bash
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
```

Ojo con que la contraseña esté entre comillas simples.

Para verificar que se creó correctamente, puedes ejecutar `\du`.

### Paso Número 3: Creación de una base de datos

Ahora solo falta crear una base de datos asociada al usuario que acabamos de crear. Para esto ejecuta

```bash
CREATE DATABASE mydatabase OWNER myuser;
```

Para verificar que se creó correctamente, puedes ejecutar `\list`.

Por último, para salir de la consola de postgres, ejecuta `\q`.

**¡Ya tenemos tenemos listo el _setup_ de nuestra base de datos!**
