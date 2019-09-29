import { signIn } from '../APICaller';
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../util/constants';

export const loginUser = (username, password) => {
  return dispatch => {
    signIn(username, password)
      .then(data => {
        if (data && data.success) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
          });
        } else {
          dispatch({
            type: LOGIN_USER_FAIL,
            payload: data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: err
        });
      });
  };
};
