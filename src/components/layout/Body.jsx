import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Members, DirectorateMain, TradeDeskMain, NewsletterMain } from '../index';

class BodyComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  render(){
    const { Views } = this.props

    switch(Views.main){
      case 'Members':
        return (<Members />);
      case 'Directorate':
        return (<DirectorateMain />);
      case 'TradeDesk':
        return (<TradeDeskMain />);
      case 'Newsletter':
        return (<NewsletterMain />);
      default:
        return (<Members />);
    }
  }
}

const mapStoreToProps = (store) => {
  return {
    Views : store.Views,
  };
}

const Body = connect(mapStoreToProps)(BodyComponent);

export default Body;
