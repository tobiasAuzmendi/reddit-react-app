import axios from 'axios';
const BASE_URL = 'http://www.reddit.com/r';
const TOP_PATH = 'top';
const PAGE_SIZE = 50;
const LIMIT = 10;

export const getPosts = async (searchWord) => {
  const postesResponseJson = await axios.get(
    `${BASE_URL}/${searchWord || 'home'}/${TOP_PATH}/.json?count=${PAGE_SIZE}&limit=${LIMIT}`
  );

  return postesResponseJson.data.data.children;
}