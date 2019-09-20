import {
  SHOW_UPLOADER,
  HIDE_UPLOADER,
  ADD_FILES,
  START_UPLOAD,
  FINISH_UPLOAD,
  UPDATE_UPLOAD_PROGRESS,
} from '../actions/uploader';

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

    case FINISH_UPLOAD:
      return {
        ...state,
        uploading: false,
        successfulUpload: true,
      };

    case UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.filename]: {
            status: action.status,
            percentage: action.percentage,
          },
        },
      };

    default:
      return state;
  }
};

export default uploader;
