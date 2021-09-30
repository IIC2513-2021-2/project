# Tema: Queries en asociaciones
### Version 1.0

Por Pedro Herrera (pedro.herrera@uc.cl)

### Video

La cápsula contempla un video, en el siguiente [enlace](https://drive.google.com/file/d/1eyy3YxgdPYrcFcdNgh47cUD8euBJyvOl/view?usp=sharing) en donde se presenta como realizar queries en asociaciones mediante lazy y eager loading.
## ¿Qué veremos?

En la cápsula partimos hablando sobre la asociación entre `albums` y `artists` y de cómo realizar un lazy loading cuando el modelo es de tipo `has_many` como también cuando es del tipo `belongs_to`. Luego se habla sobre eager loading, y un ejemplo de este de como puede mejorar la perfomance de una aplicación que tenga el caso de n + 1 queries. 

### Lazy loading

Caso Has_many
```shell
  const { artist } = ctx.state
  const albums = await artist.getAlbums()
```

Caso belongs_to

```shell
  const { album } = ctx.state;
  const artist = await album.getArtist();
```

### Eager loading
Caso n + 1 queries

```shell
const artists = await ctx.orm.artist.findAll();
const albums = await Promise.all(artists.map((artist) => artist.getAlbums()));
```
Se realiza 1 querie para obtener a todos los artistas, y se realiza n queries (n cantidad de artistas) para obtener los álbumes de cada artista. Es en total n + 1 queries, que trae un gran problema de perfomance para la aplicación. La siguiente línea soluciona este problema.

Eager loading para simplemente hacer 1 querie

```shell
const artists = await ctx.orm.artist.findAll({ include: ctx.orm.album });
```

Cómo acceder en el front al primer albúm de un artista a través de eager loading
```shell
<td><%= artist.albums[0].name%></td>
```

## Referencias

[Sequelize Association](https://sequelize.org/master/manual/assocs.html)
