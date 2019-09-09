import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import AlbumComponent from '../components/Album';
import { fetchAlbum } from '../actions/album';

const Album = ({ isFetching, album, fetchAlbum }) => {
  useEffect(() => {
    fetchAlbum('5fda2f');
  }, []);

  return (
    <AlbumComponent isFetching={isFetching} album={album} />
  )
};

const mapStateToProps = state => ({
  isFetching: state.album.isFetching,
  album: state.album.data,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbum: hash => dispatch(fetchAlbum(hash)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Album);
