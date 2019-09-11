import { combineReducers } from 'redux';
import album from './album';
import uploader from './uploader';

export default combineReducers({
  album,
  uploader,
});
