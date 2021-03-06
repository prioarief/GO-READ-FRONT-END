import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import bookReducers from './book'
import genreReducers from './genre'
import authorReducers from './author'
import authReducers from './auth'
import historyReducers from './transaction'


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['auth']
}

const rootReducers = combineReducers({
    auth: authReducers,
    book : bookReducers,
    genre : genreReducers,
    author : authorReducers,
    history : historyReducers,
})

export default persistReducer(persistConfig, rootReducers)
