# Tema: ESLint.

### Versión 1.0

Por **Gonzalo Concha** (gonzalo.concha@uc.cl)

### Video
La cápsula incluye un video, en el siguiente [enlace](https://drive.google.com/file/d/1G1-e0AsO5X7Pe-3srihPniFNE-18oVIp/view).


## ¿Qué veremos? 

En la cápsula se verá que es ESLint, cómo instalar ESLint en proyecto y cómo usarlo.

## ¿Qué es ESLint?

Se conoce a Lint a las herramientas de código estático que nos permite encontrar errores y aplicar estilos en los proyectos.

No existe un único estilo para Javascript por lo que se tiene que definir uno con anterioridad, en nuestro caso usaremso el estilo usado por Airbnb.

ESLint es la herramient lint para Javascript.

## Instalación
**Algunos comandos pueden tomar mucho tiempo**

Para poder instalar el motor de ESLint hay que ejecutar el siguiente comando:
```bash
yarn add eslint --dev
```
Ahora hay que configurar las reglas de ESLint con las de Airbnb:
```bash
yarn run eslint --init
```
Las opciones de la configuración que se tienen que seleccionar son:
- CommonJS
- None of these
- No a Typescript
- Node
- Use popular style
- Airbnb
- Guardar en JSON
- No instalar plugins con npm (Se va a usar yarn)

Ahora hay que instalar los plugin que faltaron con los dos siguientes comandos de yarn:
```bash
yarn add eslint-config-airbnb-base --dev
```
```bash
yarn add eslint-plugin-import --dev
```

## Uso de ESLint

Se puede verificar usando el comando:
```bash
yarn run eslint .
```
Este otro comando es equivalente al comando anterior para este template:
```bash
yarn lint
```
Si se agrega --fix al final del comando se solucionarán algunos errores más simples de solucionar:
```bash
yarn lint --fix
```
Para los errores que no se pueden solucionar automáticamente tendremos que arreglarlos uno a uno.

## Consideraciones

- Para mergear branches a **main**, tendremos que asegurarnos que no hayan errores del linter. De lo contrario no podremos realizar los cambios.

- Se crea un archivo **eslintrc.json** al instalar ESLint, nuestro template ya tiene un archivo que tiene la configuracion del Linter. Se recomienda borrar el archivo **eslintrc.json**.

## Consejos
- Verificar que el código cumpla con las normas antes de mergear.
- Buscar los errores en internet, seguramente a alguien ya le pasó.
- Ejecutar periodicamente el linter, es más fácil corregir un par de errores hoy que todos los errores el día de la entrega.


## Referencias 

- [Getting started with ESLint](https://eslint.org/docs/user-guide/getting-started)
- [Guia Airbnb](https://github.com/airbnb/javascript?utm_content=buffer53877&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer)