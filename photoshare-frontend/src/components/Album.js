import React from 'react';
import PropTypes from 'prop-types';

const Album = ({ album, isFetching }) => {
  if (isFetching || !album) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      {album.hash}

      <div>
        {album.pictures.map((picture) => (
          <div key={picture.id}>{picture.id}</div>
        ))}
      </div>
    </div>
  );
};

Album.propTypes = {
  album: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Album;
