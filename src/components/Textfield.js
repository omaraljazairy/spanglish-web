// import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Textfield = (props) => {
//   const [show, setShow] = useState(props.show);

  if (props.show) {
    return (
        <Form.Control 
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
  }
}

export default Textfield;