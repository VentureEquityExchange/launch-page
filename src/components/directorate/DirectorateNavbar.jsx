import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';

class DirectorateNavbarComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { dispatch, Account } = this.props;

    console.log(Account.account);

  }

  render(){
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">VΞX | DIRECTORATE</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
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
    Account : store.Account
  };
}

const DirectorateNavbar = connect(mapStoreToProps)(DirectorateNavbarComponent);

export default DirectorateNavbar;
