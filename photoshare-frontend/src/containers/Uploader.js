import React from 'react';
import { connect } from 'react-redux';
import Upload from '../components/upload/Upload';
import {
  showUploader,
  hideUploader,
  addFiles,
  uploadFiles,
} from '../actions/uploader';

const Uploader = ({
  files,
  showUploader,
  uploading,
  successfulUpload,
  uploadProgress,
  handleShowUploader,
  handleHideUploader,
  handleAddFiles,
  handleUploadFiles,
}) => (
  <div>
    <Upload
      files={files}
      showUploader={showUploader}
      uploadProgress={uploadProgress}
      uploading={uploading}
      successfulUpload={successfulUpload}
      handleShowUploader={handleShowUploader}
      handleHideUploader={handleHideUploader}
      onFilesAdded={handleAddFiles}
      onUpload={handleUploadFiles}
    />
  </div>
);

const mapStateToProps = (state) => ({
  showUploader: state.uploader.show,
  files: state.uploader.files,
  uploadProgress: state.uploader.uploadProgress,
  uploading: state.uploader.uploading,
  successfulUpload: state.uploader.successfulUpload,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowUploader: () => dispatch(showUploader()),
  handleHideUploader: () => dispatch(hideUploader()),
  handleAddFiles: (files) => dispatch(addFiles(files)),
  handleUploadFiles: () => dispatch(uploadFiles()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Uploader);
