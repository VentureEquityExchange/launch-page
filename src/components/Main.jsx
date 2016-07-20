import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.Members.getMembers());
  }

  render () {
    console.log(this.props);
    return (
      <p>main component</p>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    Members : store.Members,
  };
}

const Main = connect(mapStoreToProps)(MainComponent);

export default Main;
