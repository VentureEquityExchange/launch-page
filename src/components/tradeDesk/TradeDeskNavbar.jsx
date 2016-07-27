import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';
import * as Actions from '../../actions/index';


class TradeDeskNavbarComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { dispatch, Account } = this.props;
  }

  updateView(view) {
    const { dispatch } = this.props;
    dispatch(Actions.Views.action('MAIN_VIEW', view));
  }

  render(){
    return (
      <Navbar style={{marginTop : '-24px'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">VΞX | <strong>TRADΞ DΞSK</strong></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} onClick={this.updateView.bind(this, 'Directorate')}>Directorate</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }

}

const mapStoreToProps = (store) => {
  return {
    Account : store.Account,
    Views : store.Views,
  };
}

const TradeDeskNavbar = connect(mapStoreToProps)(TradeDeskNavbarComponent);

export default TradeDeskNavbar;
