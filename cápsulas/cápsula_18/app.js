const albumsContent = document.getElementById('albums-content');
const templateAlbum = document.getElementById('template-album').content;
const wishlistContent = document.getElementById('wishlist-content');
const templateWishlist = document.getElementById('template-wishlist').content;

const fragment = document.createDocumentFragment();

let wishList = {};

albumsContent.addEventListener('click', event => {
  addToWishList(event);
})

wishlistContent.addEventListener('click', event => {
  removeAlbum(event);
});

document.addEventListener('DOMContentLoaded', () => {
  getAlbums();
})

/*
const albumCardButtons = document.getElementsByClassName("btn-add")
for(var i=0; i< albumCardButtons.length; i++) {
  var currentButton = albumCardButtons[i]
  currentButton.addEventListener('click', event => {
    addToWishList(event);
  })
})
*/

const getAlbums = async () => {
  try {
    const res = await fetch('albums.json');
    const albums = await res.json();
    albums.forEach(album => {
      const clone = templateAlbum.cloneNode(true);
      clone.querySelector('h3').textContent = album.name;
      clone.querySelector('p').textContent = album.artist;
      clone.querySelector('.btn-add').dataset.id = album.id;
      fragment.appendChild(clone);
    })
    albumsContent.appendChild(fragment);
  } catch (error) {
    console.log(error);
  }
}

const addToWishList = (event) => {
  if (event.target.classList.contains('btn-add')){
    setWishlist(event.target.parentElement);
  }
  event.stopPropagation();
}

const setWishlist = (element) => {
  const album = {
    id: element.querySelector('.btn-add').dataset.id,
    name: element.querySelector('h3').textContent,
    artist: element.querySelector('p').textContent
  }
  wishList[album.id] = {...album};
  refreshWishlist();
}

const refreshWishlist = () => {
  wishlistContent.innerHTML = ''
  Object.values(wishList).forEach((album) => {
    const clone = templateWishlist.cloneNode(true);
    clone.querySelector('.album-name').textContent = album.name;
    clone.querySelector('.artist-name').textContent = album.artist;
    clone.querySelector('.btn-remove').dataset.id = album.id;
    fragment.appendChild(clone);
  })
  wishlistContent.appendChild(fragment);
}

const removeAlbum = (event) => {
  if (event.target.classList.contains('btn-remove')){
    delete wishList[event.target.dataset.id];
    refreshWishlist();
  }

  event.stopPropagation();
}
