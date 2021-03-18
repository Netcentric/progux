/**
 * ---navigator.deviceMemory----
 * Identifies the RAM memory of a device.
 *
 * A floating point number, one of 0.25, 0.5, 1, 2, 4, 8.
 *
 * @returns {String} containing the memory level, low, mid, high or unknown
 */

const findMemoryLevel = (lowRAM) => {
  if (!('deviceMemory' in navigator)) {
    return 'unknown';
  }

  const memory = navigator.deviceMemory;

  if (memory === lowRAM) {
    return 'mid';
  }

  if (memory > lowRAM) {
    return 'high';
  }

  return 'low';
};

export default findMemoryLevel;
