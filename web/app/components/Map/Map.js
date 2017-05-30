import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './map.css';
import loadGoogleMaps from './../../utils/maps';
import styles from './styles';

@connect(reduce, bindActions(actions))
export default class Map extends Component {

  shouldComponentUpdate({ map, network, selected }, { loaded }) {
    return map !== this.props.map
      || network !== this.props.network
      || selected !== this.props.selected
      || loaded !== this.state.loaded;
  }

  componentWillUpdate({ map, network, selected }) {
    const { loading, loaded } = this.state;
    const shouldMarkersUpdate = selected !== this.props.selected;
    if ((loaded && shouldMarkersUpdate) || loading) {
      this.updateMarkers(selected);
    } else if (map && network) {
      loadGoogleMaps(() => { this.loadMap(); });
    }
  }

  updateMarkers(selected) {
    const markers = selected.map((location, i) => {
      const { name, lat, lon, temp, description, icon } = location;
      const options = {
        position: new window.google.maps.LatLng(lat, lon),
        icon: {
          url: `./app/assets/markers/${icon}.png`,
          scaledSize: new window.google.maps.Size(30, 30),
        },
      };
      const infowindow = new window.google.maps.InfoWindow({
        content: `<strong>${name}:</strong> ${temp}℃, ${description}`,
      });
      const marker = new window.google.maps.Marker(options);
      marker.addListener('click', () => {
        infowindow.open(this.googleMap, marker);
      });
      return marker;
    });

    if (typeof this.markerCluster !== 'undefined') this.markerCluster.clearMarkers();
    this.markerCluster = new MarkerClusterer(this.googleMap, markers, {
      styles: [{
        textColor: 'white',
        height: 30,
        width: 30,
        url: './app/assets/icons/cluster.svg',
      }],
    });
  }

  loadMap() {
    this.setState({ loading: true });
    const lat = 50;
    const lng = 4;
    this.googleMap = new window.google.maps.Map(this.node, {
      zoom: 4,
      center: { lat, lng },
      styles,
    });
    window.google.maps.event.addListenerOnce(this.googleMap, 'tilesloaded', () => {
      this.setState({ loading: false, loaded: true });
    });
  }

  render({ map, network, selected }, { loaded }) {
    return (
      <div id="map" className={`${map && network ? 'opened' : ''}`}>
        <div className="map-container" ref={(node) => { this.node = node; }} style={{ opacity: loaded && network ? '1' : '0' }}></div>
        {network === false &&
          <div className="map-placeholder">
            <span>This feature is only available online.</span>
          </div>
        }
        {network &&
          <div class="loader" style={{ opacity: loaded ? '0' : '1' }} >
            <svg class="circular">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
            </svg>
          </div>
        }
      </div>
    );
  }
}
