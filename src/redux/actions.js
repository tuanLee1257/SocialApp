export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = userInfo => dispatch => {
  dispatch({
    type: SET_USER_INFO,
    payload: userInfo,
  });
};
