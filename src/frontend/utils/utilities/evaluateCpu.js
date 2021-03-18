/**
 * ---navigator.hardwareConcurrency----
 * Identifies the logical processors of a device.
 *
 * A Number indicating the number of logical processors.
 * logical processors = N. of CPU cores * N. of threads per core
 *
 * @returns {String} containing the cpu level, low, mid, high or unknown
 */

const findCpuLevel = (lowCPU) => {
  if (!('hardwareConcurrency' in navigator)) {
    return 'unknown';
  }

  const logicalProcessors = navigator.hardwareConcurrency;

  if (logicalProcessors === lowCPU) {
    return 'mid';
  }

  if (logicalProcessors > lowCPU) {
    return 'high';
  }

  return 'low';
};

export default findCpuLevel;
