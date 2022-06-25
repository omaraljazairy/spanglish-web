import { React } from 'react'
import { Container } from 'react-bootstrap'
import '../assets/css/body.css'

const Body = (props) => {
    return (
        <Container className="body">
            {props.children}
        </Container>
    )
};

export default Body;