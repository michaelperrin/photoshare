export const SHOW_UPLOADER = 'SHOW_UPLOADER';
export const HIDE_UPLOADER = 'HIDE_UPLOADER';
export const ADD_FILES = 'ADD_FILES';
export const START_UPLOAD = 'START_UPLOAD';
export const FINISH_UPLOAD = 'FINISH_UPLOAD';
export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';

export function showUploader() {
  return {
    type: SHOW_UPLOADER,
  };
}

export function hideUploader() {
  return {
    type: HIDE_UPLOADER,
  };
}

export function addFiles(files) {
  return {
    type: ADD_FILES,
    files,
  };
}

export function startUpload() {
  return {
    type: START_UPLOAD,
  };
}

export function finishUpload() {
  return {
    type: FINISH_UPLOAD,
  };
}

export function updateUploadProgress(filename, status, percentage) {
  return {
    type: UPDATE_UPLOAD_PROGRESS,
    filename,
    status,
    percentage,
  };
}

function sendRequest(dispatch, file) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        dispatch(updateUploadProgress(
          file.name,
          'pending',
          (event.loaded / event.total) * 100,
        ));
      }
    });

    req.upload.addEventListener('load', () => {
      dispatch(updateUploadProgress(
        file.name,
        'done',
        100,
      ));

      resolve(req.response);
    });

    req.upload.addEventListener('error', () => {
      dispatch(updateUploadProgress(
        file.name,
        'error',
        0,
      ));

      reject(req.response);
    });

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('author', 'Michael');
    formData.append('album_hash', '5fda2f'); // TODO

    req.open('POST', 'http://localhost:8000/photo/upload'); // TODO
    req.send(formData);
  });
}

function doUploadFiles(dispatch, files, uploadProgress) {
  const promises = [];

  files.forEach((file) => {
    promises.push(sendRequest(dispatch, file, uploadProgress));
  });

  // TODO: try catch?

  return Promise.all(promises).then(
    () => { dispatch(finishUpload()); },
  );
}

export function uploadFiles() {
  return (dispatch, getState) => {
    dispatch(startUpload());

    return doUploadFiles(dispatch, getState().uploader.files);
  };
}
