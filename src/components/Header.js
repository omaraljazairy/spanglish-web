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
                        <Nav.Link><NavLink to='/home' style={style}>Home</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/language' style={style}>Language</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/category' style={style}>Category</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/word' style={style}>Words</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/quiz' style={style}>Quiz</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/result' style={style}>QuizResults</NavLink></Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search word"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="light">Search</Button>
                    </Form>
                        <Nav.Link><NavLink to='/account' style={style}>Account</NavLink></Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      )
};

export default Header;