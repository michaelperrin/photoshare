import { SHOW_UPLOADER, HIDE_UPLOADER } from '../actions/uploader';

const defaultState = {
  show: false,
  files: null,
};

const uploader = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_UPLOADER:
      return {
        ...state,
        show: true,
      };

    case HIDE_UPLOADER:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default uploader;
