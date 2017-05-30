import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import VirtualList from 'preact-virtual-list';

import { bindActions } from './../../util';
import reduce from './../../reducers';
import * as actions from './../../actions';

import './list.css';

import Item from './../Item/Item';
import Modal from './../Modal/Modal';

@connect(reduce, bindActions(actions))
export default class List extends Component {

  shouldComponentUpdate({ selected }) {
    return selected !== this.props.selected && selected.length !== 0;
  }

  rowHeight = 72;
  renderRow = item => <Item key={item.id} item={item} />

  render({ selected }) {
    return (
      <div id="list">
        <VirtualList
          class="list-container"
          data={selected}
          renderRow={this.renderRow}
          rowHeight={this.rowHeight}
        />
        <Modal />
      </div>
    );
  }
}
