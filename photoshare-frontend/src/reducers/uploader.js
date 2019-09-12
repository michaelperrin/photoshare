import { SHOW_UPLOADER, HIDE_UPLOADER, ADD_FILES, START_UPLOAD } from '../actions/uploader';

const defaultState = {
  show: false,
  files: [],
  uploading: false,
  uploadProgress: {},
  successfulUpload: false,
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

    case ADD_FILES:
      return {
        ...state,
        files: action.files,
      };

    case START_UPLOAD:
      return {
        ...state,
        uploadProgress: {},
        uploading: true,
      };

    default:
      return state;
  }
};

export default uploader;
