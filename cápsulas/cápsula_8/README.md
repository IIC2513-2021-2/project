# Tema: Creación de recurso con asociación.

### Versión 1.0

Por **Michel Magna** (mamagna@uc.cl)

### Video
La cápsula contempla un video, en el siguiente [enlace](https://drive.google.com/file/d/1_sIFatmt5mbFsQkcZQwNKQwAo57rRR-2/view?usp=sharing), donde se presentan dos formas de armar la asociacion entre dos recursos.



## ¿Qué veremos? 

En la cápsula se enseñan dos métodos tradicionales para crear recursos asociados. El primero es mediante un select al momento de crear una entidad de álbum. La segunda, es mediante un path acceder a un form que reconoce el identificador del artista por detrás mediante ctx.params.

# Opción 1: Crear recurso con select artistId

### Paso Número 1: Definir variable artists

En primer lugar en el controlador de albums, incluimos en el método new y create la llamada a todos los artistas presentes en nuestra base de datos

```bash
const artistList = await ctx.orm.artist.findAll()
```
### Paso Número 2: Incorporamos el select

Agregamos a la vista new.html de album un select con los nombres de los artistas:

```bash
  <div>
    <label for="artistId">Artist</label>
    <select name="artistId" id="authorId">
        <% artistList.forEach((artist) => { %>
            <option value="<%= artist.id %>">
                <%= artist.name %>
            </option>
        <% }) %>
    </select>
  </div>
```

En el archivo albums.js incorporamos el redirect hacia el show del artista
```bash
ctx.redirect(ctx.router.url('artists.show', {id: album.artistId}));
```

### Paso Número 3: Agregamos albums a artist.show

Ahora el último paso es mostrar los albums asociados al artista. Incorporamos lo siguiente al controlador de artist:
```bash
const albumList = await ctx.orm.album.findAll({where: {artistId: artist.id}})
```

Finalmente agregamos al HTML el siguiente fragmento para mostrar los albums:

```bash
<% albumList.forEach((album) => { %>
    <li>
      <td><%= album.name %></td>
    </li>
    <% }) %>
```



# Opción 2: Asociación mediante nested route.

Asociaciones mediante rutas anidadas es una segunda alternativa para hacer la asociacion. Mediante este método se reconoce el identificador del artista en el path utilizado y se llama mediante ctx.params dentro del controlador.

Para esta opción, crearemos un controlador diferente y un nuevo form en html. Importaremos el controlador en routes.rb y posteriormente manejaremos el identificador llamando ctx.params dentro del nuevo controlador.

### Paso 1: Creamos nuevos archivos

Creamos un archivo llamado new_for_artist.html.ejs para diferenciarlo del actual new.html.ejs y hacer la alternativa de asociación. Es el mismo código que el formulario anterior sin select.

Creamos un archivo llamado albums_for_artist.ejs en la carpeta routes. Copiamos el contenido del controlador original y cambiamos sus nombres.


### Paso 2: Importamos el controlador

Agregamos a routes.ejs la siguiente linea:
```bash
const albumsForArtists = require('./routes/albumsForArtists');
router.use('/albumsForArtists', albumsForArtists.routes());
```
### Paso 3: Armamos el form HTML
Creamos el HTML
```bash
<h2>New album</h2>
<form action="<%= submitAlbumPath %>" method="POST">
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" />
  </div>
  <div>
    <label for="publishedAt">PublishedAt</label>
    <input type="date" name="publishedAt" id="publishedAt" />
  </div>
  <div>
    <label for="cover">Cover</label>
    <input type="text" name="cover" id="cover" />
  </div>
  <input type="submit" value="Add new album" />
</form>
```
### Paso 4: Armamos el controlador

Creamos el contenedor
```bash
const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function getArtist(ctx, next){
  ctx.state.artist = await ctx.orm.artist.findByPk(ctx.params.artistId);
  if(!ctx.state.artist) return ctx.throw(404);
  return next();
}

router.get('albums_for_artists.new', '/new', getArtist, async (ctx) => {
  const {artist} = ctx.state;
  const album = ctx.orm.album.build()
  await ctx.render('albums/new_for_artists', {
    album,
    submitAlbumPath: ctx.router.url('albums_for_artists.create', {artistId: artist.id}),
  });
});

router.post('albums_for_artists.create', '/', getArtist, async (ctx) => {
  const {artist} = ctx.state;
  const album = ctx.orm.album.build(ctx.request.body);
  album.artistId = artist.id;
  console.log(album)
  await album.save({ fields: ['name','artistId', 'publishedAt', 'cover'] });
  ctx.redirect(ctx.router.url('artists.show', {id: artist.id}));
});

module.exports = router;
```
Ahora bien, para crear el álbum asociado con el artista podemos usar un [método especial](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances) dentro de esta clase. Para aquello, definimos en la clase artist el metodo createAlbum y el router deberia quedar asi. Esto será muy importante cuando trabajemos con relaciones n a n y tablas intermedias. 

```bash
router.post('albums_for_artists.create', '/', getArtist, async (ctx) => {
  const {artist} = ctx.state;
  await artist.createAlbum(ctx.request.body)
  ctx.redirect(ctx.router.url('artists.show', {id: artist.id}));
});

module.exports = router;
```


Es muy importante recalcar por donde se maneja el identificador del artista. La función getArtist() procede a llamar los parámetros del path mediante ctx.params.artistId. Esta función es llamada en el router get() y router.post() y permite definir el identificador de este. En base a aquello, podemos definir el identificador del artista aninado al álbum a crear y la asociación queda completa sin necesidad de utilizar un select.

## Consejos
- Definir cuál método es mejor para su proyecto
- No son las únicas formas de armar las asoaciaciones
- Incorporar la validación de recursos y levantamiento de errores en casos necesarios, no mencionado en la cápsula.


## Referencias 

[Manual Sequelize](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances)
