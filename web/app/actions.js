export const setNetwork = networkState => ({
  type: 'SET_NETWORK',
  networkState,
});

export const setNotificationCount = notificationCountState => ({
  type: 'SET_NOTIFICATION_COUNT',
  notificationCountState,
});

export const setLocations = newLocations => ({
  type: 'SET_LOCATIONS',
  newLocations,
});

export const filterLocations = (locations, filter) => ({
  type: 'FILTER_LOCATIONS',
  locations,
  filter,
});

export const setModal = modalState => ({
  type: 'SET_MODAL',
  modalState,
});

export const setMap = mapState => ({
  type: 'SET_MAP',
  mapState,
});

export const setToast = toastState => ({
  type: 'SET_TOAST',
  toastState,
});

export const setSynced = syncedState => ({
  type: 'SET_SYNCED',
  syncedState,
});
