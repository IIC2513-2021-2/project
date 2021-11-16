# Tema: Introducción a REACT
### Versión 1.0

Por **Maite Madalosso** (maite.madalosso@uc.cl)

### Video
La cápsula contempla un video con explicaciones y ejemplos, disponible en [este enlace](https://drive.google.com/file/d/1jXKTG0Eg2pirZTXsNxjmFeAqVLmS7TDZ/view?usp=sharing).

### ¿Qué Veremos?
Aprenderemos sobre el entorno de desarrollo frontend y herramientas que pueden facilitarlo. Introduciremos React como librería para construir interfaces de usuario y crearemos una app con la herramienta create-react-app

# Herramientas para el Desarrollo de Frontend
En la presentación ubicada en esta carpeta pueden encontrar a detalle algunas de herramientas que utilizaremos.

# create-react-app
Es una herramienta que nos permite crear una SPA con React y con configuraciones de Webpack incluidas. Para crear la app existen varios comandos, entre ellos:
```
yarn create react-app <nombre-app>
```
```
npx create-react-app <nombre-app>
```
```
npm init react-app <nombre-app>
```
Como durante el semestre hemos usado `yarn`, para mantener la consistencia, sugerimos utilizar este comando para utilizar esta herramienta.
  
## Correr la App
Para correr la app en local, debes ubicarte en la carpeta que acabamos de crear y correr:
```
yarn start
```
Esto corre la app en modo desarrollador en http://localhost:3000 por default.

## Añadir Estilos SASS
Para poder utilizar este preprocesador de CSS en nuestra app, debemos añadir el siguietne módulo:
```
yarn add node-sass@4.14.1
```

## Breve Explicación de la App Base
#### App.js
```
src > App.js
```
Aquí encontraremos un **componente** llamado App, que contiene el html principal de la app default.
```bash
  import logo from './logo.svg';
  import './App.css';
  
  function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
  
  export default App;

```
Este componente se renderiza en `index.js`
#### index.js
```
src > index.js
```
Aquí podemos encontrar el Render de DOM y cómo este rederiza nuestra componente App en el elemento con id `root`.
```bash
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  
  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  reportWebVitals();

```
#### index.hmtl
```
public > index.html
```
Este es el html principal de la app, aquí podemos encontrar el elemento html con el ID `root` (un div), en donde se renderizará el archivo `src > index.js` que contiene nuestra componente `App` con el contenido principal.

```bash
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <!--
        manifest.json provides metadata used when your web app is installed on a
        users mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
      -->
      <title>React App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <!--
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
      -->
    </body>
  </html>
```

## Referencias 

- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/docs/getting-started/#yarn)
- [Webpack](https://webpack.js.org/)
