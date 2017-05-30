import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './app.css';

import Toolbar from './../Toolbar/Toolbar';
import List from './../List/List';
import Map from './../Map/Map';
import Toast from './../Toast/Toast';

import getAnalytics from './../../utils/analytics';
import { seconds, relative } from './../../utils/time';

@connect(reduce, bindActions(actions))
export default class App extends Component {

  componentDidMount() {
    window.addEventListener('online', this.notifyNetworkStatus);
    window.addEventListener('offline', this.notifyNetworkStatus);
    window.addEventListener('resize', this.updateWidthStates);
    this.updateWidthStates();
    if (this.props.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', this.notifyServiceWorkerStatus);
    }
    this.sync();
    this.notifyHistoryState();
  }

  notifyNetworkStatus = () => {
    this.props.setNetwork(navigator.onLine);
    if ((window.innerWidth > 767) && navigator.onLine) this.props.setMap(true);
    if (!navigator.onLine) this.notifyNetworkOffline();
  }

  notifyServiceWorkerStatus = (event) => {
    this.props.setToast(event.data);
  }

  notifyNetworkOffline = () => {
    this.props.setToast(`You are offline. The data was last synced ${relative(performance.timing.navigationStart + performance.now(), this.props.synced)}.`);
  }

  updateWidthStates = () => {
    const breakpoint = 768;
    if (window.innerWidth < breakpoint) {
      this.props.setMap(false);
      return;
    }
    if (this.props.network) this.props.setMap(true);
  }

  sync = () => {
    const shouldSync = this.props.synced === null || seconds(performance.timing.navigationStart + performance.now(), this.props.synced) > 60;
    if (this.props.network && shouldSync) {
      getAnalytics((analytics) => {
        this.props.setLocations(analytics.locations);
        this.props.setNotificationCount(analytics.notificationCount);
        this.props.setSynced(performance.timing.navigationStart + performance.now());
      });
    }

    if (!this.props.network) this.notifyNetworkOffline();
  }

  notifyHistoryState = () => {
    history.replaceState({}, null, './');
    window.addEventListener('popstate', () => {
      this.syncHistoryAndStore(window.location.pathname);
    });
    const pushState = history.pushState;
    history.pushState = (...args) => {
      this.syncHistoryAndStore(args[2]);
      return pushState.apply(history, args);
    };
  }

  syncHistoryAndStore = (route) => {
    const search = route.match(/(search)/) !== null;
    if (this.props.modal !== search) this.props.setModal(search);

    const map = route.match(/(map)/) !== null;
    if (this.props.map !== map) this.props.setMap(map);

    if (this.props.selected.length !== this.props.locations.length) {
      this.props.filterLocations(this.props.locations, '');
    }
  }

  render = () => (
    <div id="app">
      <Toolbar />
      <List />
      <Map />
      <Toast />
    </div>
  )
}
