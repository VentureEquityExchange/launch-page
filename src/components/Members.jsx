import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { FormGroup, FormControl, ControlLabel, InputGroup, Button, HelpBlock } from 'react-bootstrap';

class MembersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethereumAddress : this.props.Account.account,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.Account.getAccount());

  }

  componentDidUpdate() {
    const { dispatch, Members, Account } = this.props;

    if(Members.isMember == undefined){
      dispatch(Actions.Members.getMember(Account.account));
    }

  }

  isMember() {
    const { dispatch, Members, Account } = this.props;

    if(!Members.isMember){
      return 'warning';
    } else {
      return 'success';
    };
  }

  handleChange(e) {
    const { dispatch } = this.props;
    dispatch(Actions.Members.getMember(e.target.value));
  }

  updateView(view){
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(Actions.Views.action('MAIN_VIEW', view));
    }, 2000);
  }

  lookUpAddress() {
    let { Members, Account } = this.props;
    let { account } = Account;

    return (
      <form >
        <FormGroup
          controlId="ethereumAddress"
          validationState={this.isMember()}
        >
          <FormControl
            type="text"
            value={account || ''}
            placeholder="Enter Your Ethereum Address"
            onChange={this.handleChange.bind(this)}
            disabled
          />
        <FormControl.Feedback />
        { Members.isMember ?
          <HelpBlock style={{fontSize : '18px'}}>Thank you for supporting the development of VΞX {this.updateView('Directorate')}</HelpBlock> :
          <HelpBlock style={{fontSize : '18px'}}><a href="#" onClick={this.becomeMember.bind(this)}>Become an alpha member</a> to gain early access.</HelpBlock>
        }

        </FormGroup>
      </form>
    );
  }

  becomeMember() {
    const { dispatch, Members, Account } = this.props;
    let value = 1e18; // 1 eth in wei;
    dispatch(Actions.Members.becomeMember(Account.account, value));
  }

  confirmMembership() {
    const { dispatch, Members, Account } = this.props;
    const { txHash, isMember } = Members;
    if(txHash && !isMember){
      dispatch(Actions.Members.getMember(Account.account));
    }
  }

  render () {

    const { txHash, isMember } = this.props.Members;

    return (
      <div style={{
        fontSize : '48px',
        fontWeight : 100,
        textAlign : 'center',
        width : '470px',
        margin : 'auto'
      }}>
        <p style={{marginBottom : '-10px', marginTop : '144px'}}>VΞX | DIRECTORATE</p>
        { txHash && !isMember ?
          <div style={{fontSize : '18px', fontWeight : 100}}>
            <p>Confirming membership... {this.confirmMembership()}</p>
          </div> :
          <div style={{width:'440px', margin : 'auto'}}>{this.lookUpAddress()}</div>
        }
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    Members : store.Members,
    Account : store.Account,
  };
}

const Members = connect(mapStoreToProps)(MembersComponent);

export default Members;
