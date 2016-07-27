import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TradeDeskNavbar } from './index';

class TradeDeskMainComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <TradeDeskNavbar />
    );
  }

}


const mapStoreToProps = (store) => {
  return {
    Account : store.Account
  };
}

const TradeDeskMain = connect(mapStoreToProps)(TradeDeskMainComponent);

export default TradeDeskMain;
