import React from 'react';
import PropTypes from 'prop-types';
import Picture from './Picture';

const Album = ({ album, isFetching }) => {
  if (isFetching || !album) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      {album.hash}

      <div className="row">
        {album.pictures.map((picture) => (
          <div key={picture.id} className="col-md-3">
            <Picture filename={picture.filename} />
          </div>
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
