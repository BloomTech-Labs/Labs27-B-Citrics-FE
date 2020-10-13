export const openDrawer = () => {
  return dispatch => {
    dispatch({ type: 'OPEN_DRAWER' });
  };
};

export const closeDrawer = () => {
  return dispatch => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };
};
