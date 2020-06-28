import { combineReducers, createStore } from 'redux';
import postList from './reducers/postList';
import postDetail from './reducers/postDetail';
import searchBox from './reducers/searchBox';

const reducer = combineReducers({
    postList,
    postDetail,
    searchBox
});

const store = createStore(reducer);

export default store;