import { React } from 'react'
import '../assets/css/header.css'
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Header = () => {
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
      });

      return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/home' style={style}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to='/language' style={style}>Language</Nav.Link>
                        <Nav.Link as={NavLink} to='/category' style={style}>Category</Nav.Link>
                        <Nav.Link as={NavLink} to='/vocabulary' style={style}>Vocabulary</Nav.Link>
                        <Nav.Link as={NavLink} to='/quiz' style={style}>Quiz</Nav.Link>
                        <Nav.Link as={NavLink} to='/result' style={style}>QuizResults</Nav.Link>
                    </Nav>
                    <Nav className="me-2">
                        <Nav.Link as={NavLink} to='/account' style={style}>Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      )
};

export default Header;