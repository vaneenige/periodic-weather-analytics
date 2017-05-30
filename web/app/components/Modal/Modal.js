import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './modal.css';

@connect(reduce, bindActions(actions))
export default class Button extends Component {

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.modal) this.toggleModal();
    });
    this.setState({ filter: '' });
  }

  shouldComponentUpdate({ modal }) {
    return modal !== this.props.modal;
  }

  toggleModal = () => {
    if (this.state.filter !== '') {
      this.setState({ filter: '' });
      this.filterLocations();
    }
    if (this.props.modal) {
      history.go(-1);
    } else {
      history.pushState({}, null, './search');
    }
  };

  filterLocations = () => {
    const { filter } = this.state;
    this.props.filterLocations(this.props.locations, filter);
  }

  updateFilter = (e) => {
    this.setState({ filter: e.target.value });
    this.filterLocations();
  };

  render({ modal }, { text }) {
    const style = {
      transform: modal ? 'scale3d(0, 0, 0)' : 'scale3d(1, 1, 1)',
    };

    if (modal) setTimeout(() => { this.input.focus(); }, 200);

    return (
      <div id="modal">
        <button className="modal-toggle" style={style} onClick={this.toggleModal}>
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>

        <div className={`modal-card ${modal ? 'opened' : ''}`}>
          <form onSubmit={e => e.preventDefault()} className="layout-horizontal">
            <input className="modal-input" value={text} onInput={this.updateFilter} ref={(input) => { this.input = input; }} placeholder="Search..." />
            <svg className="modal-close" fill="#EC407A" height="24" viewBox="0 0 24 24" width="24" onClick={this.toggleModal}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </form>
        </div>
      </div>
    );
  }
}
