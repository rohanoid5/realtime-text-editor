import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_INITIATED
} from '../util/constants';

export default function(state = {}, action) {
  const { payload, type } = action;
  if (type === LOGIN_USER_INITIATED) {
    return { ...state, initiated: true };
  }
  if (type === LOGIN_USER_SUCCESS) {
    return { ...payload, error: false, loaded: true, initiated: false };
  }
  if (type === LOGIN_USER_FAIL) {
    return { ...payload, error: true, loaded: true, initiated: false };
  }
  return state;
}
