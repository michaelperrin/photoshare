import fetch from 'cross-fetch';

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

export function requestAlbum() {
  return {
    type: REQUEST_ALBUM,
  };
};

export function receiveAlbum(data) {
  return {
    type: RECEIVE_ALBUM,
    data,
    receivedAt: Date.now(),
  };
};

export function fetchAlbum(hash) {
  return (dispatch) => {
    dispatch(requestAlbum());

    return fetch(`http://localhost:8000/api/album/${hash}`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveAlbum(json))
      )
    ;
  };
};
