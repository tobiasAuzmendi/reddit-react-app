import { combineReducers, createStore } from 'redux';
import postList from './reducers/postList';
import postDetail from './reducers/postDetail';
import searchBox from './reducers/searchBox';
import pictureGallery from './reducers/pictureGallery';
import { loadState, saveState } from '../services/LocalStorageService';

const persistedState = loadState();
const reducer = combineReducers({
    postList,
    postDetail,
    searchBox,
    pictureGallery
});

const store = createStore(
    reducer,
    persistedState,
    // uncomment next line to enable redux devtools extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;