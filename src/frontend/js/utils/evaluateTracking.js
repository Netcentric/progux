/**
 * Identifies the tracking preferences of a user.
 *
 * navigator.doNotTrack === 1 indicates the user should not be tracked
 *
 * @returns {Boolean}
 */

const evaluateTracking = () => {
  const hasAttribute = 'doNotTrack' in navigator;
  const doNotTrackActive = navigator.doNotTrack === '1';

  return hasAttribute && doNotTrackActive;
};

export default evaluateTracking;
