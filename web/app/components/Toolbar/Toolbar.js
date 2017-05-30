import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './toolbar.css';

@connect(reduce, bindActions(actions))
export default class Toolbar extends Component {

  shouldComponentUpdate({ network, notificationCount }) {
    return network !== this.props.network
      || notificationCount !== this.props.notificationCount;
  }

  toggleMap = () => {
    if (this.props.map) {
      history.go(-1);
    } else {
      history.pushState({}, null, './map');
    }
  }

  toggleNotificationCount = () => {
    if (this.props.toast === '') {
      const toastMessage = `Users have received a total of ${this.props.notificationCount} web push notifications with weather information provided by <a href="https://openweathermap.org/">OpenWeatherMap</a>.`;
      this.props.setToast(toastMessage);
    }
  };

  render({ network, notificationCount }) {
    const toggleMapStyle = {
      display: network ? 'block' : 'none',
    };
    return (
      <div id="toolbar">
        <span className="optional">Periodic</span><span> Weather Analytics</span>
        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" onClick={this.toggleMap} style={toggleMapStyle}>
          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
        </svg>
        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" onClick={this.toggleNotificationCount}>
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
        <div className="poweredBy"><a href="https://openweathermap.org/">Powered by OpenWeatherMap</a></div>
        <div className="notificationCount"><strong>{notificationCount}</strong> notifications received</div>
      </div>
    );
  }
}
