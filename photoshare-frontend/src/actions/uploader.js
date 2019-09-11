export const SHOW_UPLOADER = 'SHOW_UPLOADER';
export const HIDE_UPLOADER = 'HIDE_UPLOADER';

export function showUploader() {
  return {
    type: SHOW_UPLOADER,
  };
}

export function hideUploader() {
  return {
    type: HIDE_UPLOADER,
  };
}
