import axios from 'axios';
const BASE_URL = 'http://www.reddit.com/r';
const TOP_PATH = 'top';
export const PAGE_SIZE = 10;

export const getPosts = async (searchWord, page, prevPageId, nextPageId) => {
  const postesResponseJson = await axios.get(
    `${BASE_URL}/${searchWord || 'home'}/${TOP_PATH}/.json?count=${(page - 1) * PAGE_SIZE}&limit=${PAGE_SIZE}&before=${prevPageId}&after=${nextPageId}&sort=new&show=all`
  );

  return postesResponseJson.data.data;
}