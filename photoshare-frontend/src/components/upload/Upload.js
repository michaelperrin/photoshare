import React, { Component } from 'react';
import Modal from 'react-modal';
import Dropzone from '../dropzone/Dropzone';
import './Upload.css';
import Progress from '../progress/Progress';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.renderActions = this.renderActions.bind(this);
  }

  renderProgress(file) {
    const uploadProgress = this.props.uploadProgress[file.name];

    if (this.props.uploading || this.props.successfulUpload) {
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
    if (this.props.successfulUpload) {
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
        disabled={this.props.files.length < 0 || this.props.uploading}
        onClick={this.props.onUpload}
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
                onFilesAdded={this.props.onFilesAdded}
                disabled={this.props.uploading || this.props.successfulUpload}
              />
            </div>
            <div className="Files">
              {this.props.files.map((file) => (
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
