import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropzone from '../dropzone/Dropzone';
import './Upload.css';
import Progress from '../progress/Progress';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfulUpload: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfulUpload: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfulUpload: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener('load', (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener('error', (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('author', 'Michael');
      formData.append('album_hash', '5fda2f');

      req.open('POST', 'http://localhost:8000/photo/upload');
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfulUpload) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfulUpload) {
      return (
        <button
          onClick={() => this.setState({ files: [], successfulUpload: false })}
        >
          Clear
        </button>
      );
    }
    return (
      <button
        disabled={this.state.files.length < 0 || this.state.uploading}
        onClick={this.uploadFiles}
      >
          Upload
      </button>
    );
  }

  render() {
    return (
      <div className="Upload">
        <button onClick={this.props.handleShowUploader}>Ajouter des photos à l'album</button>

        <Modal
          isOpen={this.props.showUploader}
          contentLabel="onRequestClose Example"
          onRequestClose={this.props.handleHideUploader}
          shouldCloseOnOverlayClick
        >
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading || this.state.successfulUpload}
              />
            </div>
            <div className="Files">
              {this.state.files.map((file) => (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              ))}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>

          <button onClick={this.props.handleHideUploader}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}

export default Upload;