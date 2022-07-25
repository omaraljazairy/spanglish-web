import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import BootstrapTable from 'react-bootstrap-table-next';

class Home extends Component {


  render() {
    const products = [{'id': 1, 'name': 'A', 'price': 1.2}, {'id': 2, 'name': 'B', 'price': 33}];
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];
    
    // console.log("home props received: ", this.props);
      return(
        <>
          <h3>Home</h3>
          <Button variant="contained" color="primary">
          Material
          </Button>
          <BootstrapTable keyField='id' data={ products } columns={ columns } />
        </>
      )
  }
}

export default Home;
