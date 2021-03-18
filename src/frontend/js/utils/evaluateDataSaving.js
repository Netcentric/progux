/**
 * Identifies the save-data preference from a client.
 *
 * A boolean true or false
 *
 * @returns {boolean}
 */

const evaluateDataSaving = () => {
  const hasAttribute = 'connection' in navigator;
  return hasAttribute ? navigator.connection.saveData : false;
};

export default evaluateDataSaving;
