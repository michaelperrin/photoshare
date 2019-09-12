export const SHOW_UPLOADER = 'SHOW_UPLOADER';
export const HIDE_UPLOADER = 'HIDE_UPLOADER';
export const ADD_FILES = 'ADD_FILES';
export const START_UPLOAD = 'START_UPLOAD';

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

export function sendRequest(file) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const copy = { ...getState().uploader.uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };

          // TODO: dispatch
          // this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener('load', (event) => {
        const copy = { ...getState().uploader.uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };

        // TODO: dispatch
        // this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener('error', (event) => {
        const copy = { ...getState().uploader.uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };

        // TODO: dispatch
        // this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('author', 'Michael');
      formData.append('album_hash', '5fda2f');

      req.open('POST', 'http://localhost:8000/photo/upload');
      req.send(formData);
    });
  };
}

export function uploadFiles() {
  return (dispatch, getState) => {
    console.log(getState());

    dispatch(startUpload());

    const { files } = getState().uploader;

    const promises = [];
    files.forEach((file) => {
      promises.push(dispatch(sendRequest(file)));
    });

    try {
      return Promise.all(promises).then(
        () => { console.log('fini !'); },
      );

      // this.setState({ successfulUpload: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      // this.setState({ successfulUpload: true, uploading: false });
    }


    // return fetch(`http://localhost:8000/api/album/${hash}`)
    //   .then(
    //     (response) => response.json(),
    //     (error) => console.log('An error occurred.', error),
    //   )
    //   .then((json) => dispatch(receiveAlbum(json)));
  };
}
