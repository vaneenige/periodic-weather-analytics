/**
 * Load state from localStorage.
 */
export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem('periodic-weather-analytics');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)[state];
  } catch (err) {
    return undefined;
  }
};

/**
 * Save state to localStorage.
 *
 * @param {object} stateValue
 */
export const saveState = (stateValue) => {
  try {
    const serializedState = JSON.stringify(stateValue);
    localStorage.setItem('periodic-weather-analytics', serializedState);
  } catch (err) {
    // Ignore
  }
};
