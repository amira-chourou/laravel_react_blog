import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, 
  } from 'reactstrap';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { logout, isLogin } from "../middleware/auth";
  import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
   
    const toggle = () => setIsOpen(!isOpen);
    
    const handleLogout = () => {
      logout();
      setLogin(false);
    };
  //  useEffect(() => setState(isLogin()), [props])
    useEffect(() => {
     if(isLogin()){
       setLogin(true);
     }
    }, [props]);

    return (
      <div>
    
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Blog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
            {login ? 
            (<>
            <span className="navbar-dark navbar-nav nav-link">Hi   {localStorage.getItem('username')}</span>
              <NavItem>

                <Link to="/" className="navbar-dark navbar-nav nav-link"
                onClick={() => handleLogout()}>  <FontAwesomeIcon icon={faSignOutAlt} className="mt-1"/> Logout</Link>
              </NavItem>
            </>) :
            (<>
              <NavItem>
                <Link to="/login" className="navbar-dark navbar-nav nav-link">Login</Link>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
            </>)
            }
              
              
            </Nav>
      
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default Header;