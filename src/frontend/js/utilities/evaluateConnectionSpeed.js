/**
 * Identifies the effective type of a connection.
 *
 * A String containing one of 'slow-2g', '2g', '3g', or '4g'.
 *
 * @returns {String} containing the speed, slow, fast or unknown
 */

const findConnectionSpeed = (slowConnectionTypes) => {
  if (!('connection' in navigator)) {
    return 'unknown';
  }

  return slowConnectionTypes.indexOf(navigator.connection.effectiveType) >= 0 ? 'slow' : 'fast';
};

export default findConnectionSpeed;
