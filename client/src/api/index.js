import { log } from '../lib/ke-utils'

export const rejectErrors = (res) => {
  const {
    status
  } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({
    message: res.statusText
  });
};

export const fetchJson = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())
);

export default {
  users: {
    register(user) {
      log('api.users.register: user', user, 'orange')
      return fetchJson(
        '/users/register',
        {
          method: 'POST',
          body: JSON.stringify({ user })
        }
      ).then((result) => {
        log('api.users.register: result', result, 'orange')
      })
    },
    signin(user) {
      // log('api.users.signin: user', user, 'orange')
      return fetchJson(
        '/users/signin',
        {
          method: 'POST',
          body: JSON.stringify({ user })
        }
      ).then((result) => {
        log('api.users.signin: result', result, 'orange')
      })
    }
  }
}
