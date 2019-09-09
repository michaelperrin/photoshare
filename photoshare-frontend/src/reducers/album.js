import { REQUEST_ALBUM, RECEIVE_ALBUM } from '../actions/album';

const defaultState = {
  isFetching: false,
  data: null,
};

const album = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_ALBUM:
      return {
        ...state,
        isFetching: true,
      };

    case RECEIVE_ALBUM:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      };

    default:
      return state;
  }
};

export default album;
