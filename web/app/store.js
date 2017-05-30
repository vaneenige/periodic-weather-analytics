import { createStore } from 'redux';
import { loadState, saveState } from './local';

const ACTIONS = {
  SET_NETWORK: ({ network, ...state }, { networkState }) => ({
    network: networkState,
    ...state,
  }),
  SET_NOTIFICATION_COUNT: ({ notificationCount, ...state }, { notificationCountState }) => ({
    notificationCount: notificationCountState,
    ...state,
  }),
  SET_LOCATIONS: ({ locations, selected, ...state }, { newLocations }) => ({
    locations: newLocations,
    selected: newLocations,
    ...state,
  }),
  FILTER_LOCATIONS: ({ selected, ...state }, { locations, filter }) => ({
    selected: locations.filter(i => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1),
    ...state,
  }),
  SET_MODAL: ({ modal, ...state }, { modalState }) => ({
    modal: modalState,
    ...state,
  }),
  SET_MAP: ({ map, ...state }, { mapState }) => ({
    map: mapState,
    ...state,
  }),
  SET_TOAST: ({ toast, ...state }, { toastState }) => ({
    toast: toastState,
    ...state,
  }),
  SET_SYNCED: ({ synced, ...state }, { syncedState }) => ({
    synced: syncedState,
    ...state,
  }),
};

const INITIAL = {
  network: navigator.onLine,
  serviceWorker: ('serviceWorker' in navigator),
  notificationCount: loadState('notificationCount') || 0,
  locations: loadState('locations') || [],
  selected: loadState('locations') || [],
  modal: false,
  map: false,
  toast: '',
  synced: loadState('synced') || null,
};

const store = createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());

store.subscribe(() => {
  saveState({
    notificationCount: store.getState().notificationCount,
    locations: store.getState().locations,
    synced: store.getState().synced,
  });
});

export default store;
