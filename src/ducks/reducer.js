const initialState = {
   collections: [],
   albums: [],
   photos: []
}

const GET_COLLECTIONS = 'GET_COLLECTIONS',
      GET_ALBUMS = 'GET_ALBUMS',
      GET_PHOTOS = 'GET_PHOTOS';
   
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