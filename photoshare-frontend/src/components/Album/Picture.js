import React from 'react';
import PropTypes from 'prop-types';
import './Picture.css';

const Picture = ({ filename }) => (
  <div className="picture">
    <img src={`https://photoshare.s3.fr-par.scw.cloud/photo/${filename}`} alt="" />
  </div>
);

Picture.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default Picture;
