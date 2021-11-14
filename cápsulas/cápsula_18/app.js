const albumsContent = document.getElementById('albums-content');
const templateAlbum = document.getElementById('template-album').content;
const wishlistContent = document.getElementById('wishlist-content');
const templateWishlist = document.getElementById('template-wishlist').content;

const fragment = document.createDocumentFragment();

let wishList = {};

document.addEventListener('DOMContentLoaded', () => {
  getAlbums();
})

const getAlbums = async () => {
  try {
    const res = await fetch('albums.json');
    const albums = await res.json();
    albums.forEach(album => {
      const clone = templateAlbum.cloneNode(true);
      const cloneBtnAdd = clone.querySelector('.btn-add');
      clone.querySelector('h3').textContent = album.name;
      clone.querySelector('p').textContent = album.artist;
      cloneBtnAdd.dataset.id = album.id;
      cloneBtnAdd.addEventListener('click', addToWishList);
      fragment.appendChild(clone);
    })
    albumsContent.appendChild(fragment);
  } catch (error) {
    console.log(error);
  }
}

const addToWishList = (event) => {
  setWishlist(event.target.parentElement);
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
    const cloneBtnRemove = clone.querySelector('.btn-remove');
    clone.querySelector('.album-name').textContent = album.name;
    clone.querySelector('.artist-name').textContent = album.artist;
    cloneBtnRemove.dataset.id = album.id;
    cloneBtnRemove.addEventListener('click', removeAlbum);
    fragment.appendChild(clone);
  })
  wishlistContent.appendChild(fragment);
}

const removeAlbum = (event) => {
  delete wishList[event.target.dataset.id];
  refreshWishlist();
}
