const albumsContent = document.getElementById('albums-content')
const templateAlbum = document.getElementById('template-album').content
const wishlistContent = document.getElementById('wishlist-content')
const templateWishlist = document.getElementById('template-wishlist').content

const fragment = document.createDocumentFragment()

let wishList = {}

albumsContent.addEventListener('click', event => {
  addToWishList(event)
})

wishlistContent.addEventListener('click', event => {
  removeAlbum(event)
})

//Cuando se carga el documento llama a getAlbums
document.addEventListener('DOMContentLoaded', () => {
  getAlbums()
})

const getAlbums = async () => {
  try {
    const res = await fetch('albums.json')
    const albums = await res.json()
    console.log(albums)
    albums.forEach(album => {
      templateAlbum.querySelector('h3').textContent = album.name
      templateAlbum.querySelector('p').textContent = album.artist
      templateAlbum.querySelector('.btn').dataset.id = album.id

      const clone = templateAlbum.cloneNode(true)
      fragment.appendChild(clone)
    })
    albumsContent.appendChild(fragment)
  } catch (error) {
    console.log(error);
  }
}

const addToWishList = (event) => {
  if (event.target.classList.contains('btn')){
    setWishlist(event.target.parentElement)
  }
  event.stopPropagation()
}

const setWishlist = (element) => {
  const album = {
    id: element.querySelector('.btn').dataset.id,
    name: element.querySelector('h3').textContent,
    artist: element.querySelector('p').textContent
  }
  console.log(album)
  wishList[album.id] = {...album}
  console.log(wishList)
  getWishlist()
}

const getWishlist = () => {
  wishlistContent.innerHTML = ''
  Object.values(wishList).forEach((album) => {
    templateWishlist.querySelector('.album-name').textContent = album.name
    templateWishlist.querySelector('.artist-name').textContent = album.artist
    //templateWishlist.querySelectorAll('p')[2].textContent = album.artist
    templateWishlist.querySelector('.btn-remove').dataset.id = album.id
    const clone = templateWishlist.cloneNode(true)
    fragment.appendChild(clone)
  })
  wishlistContent.appendChild(fragment)
}

const removeAlbum = (event) => {
  if (event.target.classList.contains('btn-remove')){
    delete wishList[event.target.dataset.id]
    getWishlist()
  }

  event.stopPropagation()
}