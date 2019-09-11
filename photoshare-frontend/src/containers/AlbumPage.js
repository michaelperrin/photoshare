import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album/index';
import { fetchAlbum } from '../actions/album';
import Uploader from './Uploader';

const AlbumPage = ({ isFetching, album, fetchAlbum }) => {
  useEffect(() => {
    fetchAlbum('5fda2f');
  }, [fetchAlbum]);

  return (
    <div>
      <Uploader />
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
