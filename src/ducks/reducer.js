const initialState = {
   collections: [],
   albums: [],
   photos: []
}

const GET_COLLECTIONS = 'GET_COLLECTIONS',
      GET_ALBUMS = 'GET_ALBUMS',
      GET_PHOTOS = 'GET_PHOTOS';

const UPDATE_COLLECTIONS = 'UPDATE_COLLECTIONS',
      UPDATE_ALBUMS = 'UPDATE_ALBUMS',
      UPDATE_PHOTOS = 'UPDATE_PHOTOS';
   
export function getCollections() {
   return {
      type: GET_COLLECTIONS,
      payload: collections
   }
}

export function getAlbum() {
   return {
      type: GET_ALBUMS,
      payload: albums
   }
}

export function getPhotos() {
   return {
      type: GET_PHOTOS,
      payload: photos
   }
}

export function updateCollections(collection) {
   return {
      type: UPDATE_COLLECTIONS,
      payload: collection
   }
}

export function updateAlbums(album){
   return {
      type: UPDATE_ALBUMS,
      payload: album
   }
}

export function updatePhotos(photo){
   return {
      type: UPDATE_PHOTOS,
      payload: photo
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case GET_COLLECTIONS:
         return {...state.collections, payload}
      case GET_ALBUMS:
         return {...state.albums, payload}
      case GET_PHOTOS:
         return {...state.photos, payload}
      default:
         return state;
   }
}