import React from 'react';
import { connect } from 'react-redux';
import Upload from '../components/upload/Upload';
import { showUploader, hideUploader } from '../actions/uploader';

const Uploader = ({ showUploader, handleShowUploader, handleHideUploader }) => (
  <div>
    <Upload
      showUploader={showUploader}
      handleShowUploader={handleShowUploader}
      handleHideUploader={handleHideUploader}
    />
  </div>
);

const mapStateToProps = (state) => ({
  showUploader: state.uploader.show,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowUploader: () => dispatch(showUploader()),
  handleHideUploader: () => dispatch(hideUploader()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Uploader);
