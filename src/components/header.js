import React from 'react'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,
        UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem   } from 'reactstrap'

import  { Link } from 'react-router-dom'  
import { connect } from 'react-redux'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = { toggle: false}
    }

    toggle = () => {
        this.setState({ toggle: !this.state.toggle})
    }

    render() {
        return(
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand href="/">Amiseq Inc.</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.toggle} navbar>
                        {/* ml-auto sets the NavItem's on right top, 
                            navbar aligns the item vertical on small size*/}
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {this.props.loggedIn ? <NavLink tag={Link} to="/clients">Clients</NavLink>
                                                     : <NavLink tag={Link} to="/clients" disabled>Clients</NavLink> }
                            </NavItem>
                            <NavItem>
                                {this.props.loggedIn ? <NavLink tag={Link} to="/candidates">Candidates</NavLink>
                                                     : <NavLink tag={Link} to="/candidates" disabled>Candidates</NavLink> }
                            </NavItem>
                            <NavItem>
                                {this.props.loggedIn ? <NavLink tag={Link} to="/both">Both</NavLink>
                                                     : <NavLink tag={Link} to="/both" disabled>Both</NavLink> }
                            </NavItem>      
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                   {this.props.loggedIn  ? this.props.user.username : 'Get in' }
                                </DropdownToggle>
                                <DropdownMenu >
                                   {!this.props.loggedIn ? <DropdownItem tag={Link} to="/login">Login</DropdownItem> 
                                                         : <DropdownItem tag={Link} to="/logout">Logout</DropdownItem> }


                                    {/* <DropdownItem tag={Link} to="/register">Register</DropdownItem> */}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
} 

function mapStateToProps(state) {
    const { user, loggedIn } = state.authentication
    return { user, loggedIn }
}

const connectedHeader = connect(mapStateToProps)(Header)

export {connectedHeader as Header}