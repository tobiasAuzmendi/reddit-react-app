export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reddit_app_state');
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reddit_app_state', serializedState);
  } catch (err) {
    console.log(err);
  }
}