import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { connect } from 'react-redux';
import { IApplicationState as ApplicationState } from '../store';

interface INavMenuProps {
    isAuthenticated: boolean,
    
}

export class NavMenu extends React.Component<INavMenuProps, {}> {
    
   public render() {
         console.log('isAuthenticate:' + this.props.isAuthenticated);
       return <Navbar fixedTop={true}>
                  <Navbar.Header>
                      <Navbar.Brand>
                   <Link className='navbar-brand' to={'/'}>MockDemo</Link>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
               <Nav pullRight>
                       <LinkContainer to="/">
                           <NavItem eventKey={1}>Home</NavItem>
                       </LinkContainer>
                          <LinkContainer to="/about">
                              <NavItem eventKey={2}>About</NavItem>
                          </LinkContainer>
                          <LinkContainer to="/counter">
                              <NavItem eventKey={3}>Counter</NavItem>
                          </LinkContainer>
                       <LinkContainer to="/fetchdata">
                           <NavItem eventKey={4}>Weather</NavItem>
                       </LinkContainer>
                          <LinkContainer to="/product">
                              <NavItem eventKey={4}>Product</NavItem>
                          </LinkContainer>
                          <NavDropdown eventKey={5} title="Login" id="nav-dropdown">
                              <LinkContainer to="/login">
                                  <MenuItem hidden={this.props.isAuthenticated} eventKey={5.1}>Login</MenuItem>
                              </LinkContainer>
                              <LinkContainer to="/register">
                                  <MenuItem disabled={this.props.isAuthenticated} eventKey={5.2}>Register</MenuItem>
                              </LinkContainer>
                              <LinkContainer to="/user">
                                  <MenuItem eventKey={5.3}>User Profile</MenuItem>
                              </LinkContainer>
                              <MenuItem divider />
                             
                          </NavDropdown>
                      </Nav>
                  </Navbar.Collapse>
              </Navbar>
    }
}

export default connect(
    (state: ApplicationState) => { return { isAuthenticated: state.login.loggedin }; },
    {}
)(NavMenu);
