import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   admin: userReducer
})

export default createStore(rootReducer);


// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import userReducer from './userReducer';
// import postsReducer from './postsReducer';
// import promiseMiddleware from 'redux-promise-middleware';

// const rootReducer = combineReducers({
//    users: userReducer,
//    posts: postsReducer
// })

// export default createStore(rootReducer, applyMiddleware(promiseMiddleware));