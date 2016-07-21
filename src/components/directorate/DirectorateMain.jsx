import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DirectorateNavbar } from './index';

class DirectorateMainComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <DirectorateNavbar />
    );
  }

}


const mapStoreToProps = (store) => {
  return {
    Account : store.Account
  };
}

const DirectorateMain = connect(mapStoreToProps)(DirectorateMainComponent);

export default DirectorateMain;
