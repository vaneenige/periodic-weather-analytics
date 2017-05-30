import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './item.css';

@connect(reduce, bindActions(actions))
export default class Item extends Component {

  shouldComponentUpdate({ item, network, serviceWorker }) {
    return item !== this.props.item
      || network !== this.props.network
      || serviceWorker !== this.props.serviceWorker;
  }

  render = ({ item, network, serviceWorker }) => (
    <li className="item">
      <div className="item-avatar">
        <img src={`./app/assets/icons/${item.icon}.svg`} alt="" />
      </div>
      <div className="item-content">
        <div className="item-title">{item.name}</div>
        <div className="item-subtitle">{item.temp}℃, {item.description}</div>
      </div>
    </li>
  )
}
