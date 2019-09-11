import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album/index';
import { fetchAlbum } from '../actions/album';
import Upload from '../components/upload/Upload';

const AlbumPage = ({ isFetching, album, fetchAlbum }) => {
  useEffect(() => {
    fetchAlbum('5fda2f');
  }, []);

  return (
    <div>
      {/* <Upload /> */}
      <Album isFetching={isFetching} album={album} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.album.isFetching,
  album: state.album.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbum: (hash) => dispatch(fetchAlbum(hash)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumPage);
