import {
  LOGIN_USER_SUCCESS,
  // REGISTER_USER,
  LOGIN_USER_FAIL
} from '../util/constants';

export default function(state = {}, action) {
  const { payload, type } = action;
  if (type === LOGIN_USER_SUCCESS) {
    return { ...payload, error: false, loaded: true };
  }
  if (type === LOGIN_USER_FAIL) {
    return { ...payload, error: true, loaded: true };
  }
  return state;
}
