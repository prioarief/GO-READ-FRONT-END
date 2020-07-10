import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookReducers from './book'
import genreReducers from './genre'
import authorReducers from './author'
import authReducers from './auth'


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['auth', 'book', 'genre']
}

const rootReducers = combineReducers({
    auth: authReducers,
    book : bookReducers,
    genre : genreReducers,
    author : authorReducers,
})

export default persistReducer(persistConfig, rootReducers)
