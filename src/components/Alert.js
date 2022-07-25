import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertDismissibleExample = (props) => {
  const [show, setShow] = useState(props.show);

  if (show) {
    return (
      <Alert variant={props.status} onClick={() => setShow(false)}>
        {
            typeof(props.msg) !== 'string' ?
            (props.msg.map((msg, index) => <p key={index}>{msg}</p>)) : <p>{props.msg}</p>
        }
      </Alert>
    );
  }
//   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

// render(<AlertDismissibleExample />);
export default AlertDismissibleExample;