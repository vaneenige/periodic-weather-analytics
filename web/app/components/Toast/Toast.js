import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './toast.css';

@connect(reduce, bindActions(actions))
export default class Toast extends Component {

  shouldComponentUpdate({ toast }) {
    return toast !== this.props.toast;
  }

  render({ toast }) {
    if (toast !== '') setTimeout(() => { this.props.setToast(''); }, 6000);
    this.lastToast = (toast !== '') ? toast : this.lastToast;
    return (
      <div id="toast" className={toast !== '' ? 'opened' : ''} dangerouslySetInnerHTML={{ __html: (toast !== '') ? toast : this.lastToast }} />
    );
  }
}
