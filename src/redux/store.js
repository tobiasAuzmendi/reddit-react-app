import { combineReducers, createStore } from 'redux';
import postList from './reducers/postList';
import postDetail from './reducers/postDetail';
import searchBox from './reducers/searchBox';
import { loadState, saveState } from '../services/LocalStorageService';

const persistedState = loadState();
const reducer = combineReducers({
    postList,
    postDetail,
    searchBox
});

const store = createStore(
    reducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;