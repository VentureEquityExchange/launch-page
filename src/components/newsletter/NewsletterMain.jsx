import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NewsletterNavbar } from './index';

class NewsletterMainComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <NewsletterNavbar />
    );
  }

}


const mapStoreToProps = (store) => {
  return {
    Account : store.Account
  };
}

const NewsletterMain = connect(mapStoreToProps)(NewsletterMainComponent);

export default NewsletterMain;
