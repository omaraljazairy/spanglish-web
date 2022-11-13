import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import AlertDismissibleExample from '../components/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { apiUri } from '../services/constants';
import { error_response_output } from '../services/errorresponse';
import '../assets/css/tableheader.css'


class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories: [],
            responseMsg: '',
            fetchStatuscode: null,
            categoryName: null,
            showAlert: false,
            submitStatus: false
        }
    }

    componentDidMount() {
        this.handleGetCategories();
    }

    handleAddCategory = async () => {
        this.setState({showAlert: false})
        var url = apiUri + 'category/'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    name: this.state.categoryName
                }
            )
        };
        try {
            const res = await fetch(url, requestOptions);

            // check if the response type is json
            // const isJson = res.headers.get('content-type')?.includes('application/json');
            // const data = isJson && await res.json();
            const data = await res.json();

            // if the response is not ok, return a reject promise and set the responseMsg.
            if (!res.ok) {
                var errMsg = error_response_output(data, res.status)
                // const error = (data && data.message) || res.status;
                // const statusCode = res.status

                this.setState(
                    {
                        responseMsg: errMsg, 
                        fetchStatuscode: res.status,
                        showAlert: true,
                        submitStatus: false
                    }
                )
                console.log(errMsg)
                console.log(data)
                return

            }

            // concat existing array
            var categoriesTemp = this.state.categories
            var newCategories = [...categoriesTemp, data]

            this.setState(
                {
                    categories: newCategories,
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Category added successfully"]
                })
        } catch (err) {
            console.error("post error: ", err)
            this.setState({responseMsg: err});
        }
    }

    handleGetCategories = async () => {
        var url = apiUri + 'category/all/'
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {}
            })
            let body = await res.json()
            console.log("data received => ", body)
            // set the body to Category if status is 200, otherwise give an empty array
            if (res.status === 200) {
                this.setState({categories: body})
            } else {
                this.setState({categories: []})    
            }
        } catch (err) {
            console.error("error fetching categories: ", err);
            this.setState({categories: []})
        }
    }

    handleDeleteCategory = async (categoryId) => {
        console.log("categoryId ", categoryId)
        this.setState({showAlert: false})
        var url = apiUri + 'category/delete/id/' + categoryId
        const requestOptions = {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' },
        };
        try {
            const res = await fetch(url, requestOptions);
            console.log("data => ", res)

            // if the response is not ok, return a reject promise and set the responseMsg.
            if (!res.ok) {
                var errMsg = error_response_output(res, res.status)
                // const error = (data && data.message) || res.status;
                // const statusCode = res.status

                this.setState(
                    {
                        responseMsg: errMsg, 
                        fetchStatuscode: res.status,
                        showAlert: true,
                        submitStatus: false
                    }
                )
                console.log(errMsg)
                console.log(res)
                return
            }

            // concat existing array
            var newCategories = this.state.categories.filter(category => category.id !== categoryId)
            // var newLan = [...lanTemp, data]

            this.setState(
                {
                    categories: newCategories,
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Category deleted successfully"]
                })
        } catch (err) {
            console.error("delete error: ", err)
            this.setState({responseMsg: err});
        }
    }        

    handleEditCategory = async (categoryId, row) => {
        console.log("row => ", row)
        this.setState({showAlert: false})
        var data = { 
            name: row.name
        }


        console.log("data for update => ", data)
        var url = apiUri + 'category/update/id/' + categoryId + '/'
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        };
        try {
            const res = await fetch(url, requestOptions);
            console.log("data => ", res)

            // if the response is not ok, return a reject promise and set the responseMsg.
            if (!res.ok) {
                var errMsg = error_response_output(res, res.status)

                this.setState(
                    {
                        responseMsg: errMsg, 
                        fetchStatuscode: res.status,
                        showAlert: true,
                        submitStatus: false
                    }
                )
                console.log(errMsg)
                console.log(res)
                return
            }

            // update the value changed.

            this.setState(
                {
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Category update successfully"]
                })
        } catch (err) {
            console.error("update error: ", err)
            this.setState({responseMsg: err});
        }
    }

    validateName = (newValue) => {
        console.log("Validate newValue => ", newValue)
        if ( newValue.length < 3 ) {
            return false
        } else {
            return true
        }        
    }

    dateFormatter = (dateField) => {
        console.log('dataformatter: ' + dateField)
        return dateField.replace('T', ' ')
    }

    render() {
        const alert = this.state.showAlert
        const errMsg = this.state.responseMsg
        const alertStatus = this.state.submitStatus ? "success" : "danger"
        const categoryList = this.state.categories
        const deleteAction = (cell, row, rowIndex, formatExtraData) => {
            return (
              <Button variant="contained" color="secondary"
                onClick={() => {
                    this.handleDeleteCategory(row.id)
                }}
              >
                Delete
              </Button>
            );
          };

          const cellEdit = cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => this.handleEditCategory(row.id, row)
          });
          
        const columns = [{
            dataField: 'id',
            text: 'ID',
            editable: false
          }, {
            dataField: 'name',
            text: 'Name',
            validator: (newValue, row, column) => {
              if (this.validateName(newValue)) {
                  return true
              } else {
                  return {
                      valid: false,
                      message: "ERROR: Name should be > 3 characters"
                  }
              }
            }
          }, 
          {
            dataField: 'created',
            text: 'Created',
            editable: false,
            formatter: (cell, row, rowIndex, formatExtraData) => this.dateFormatter(cell)
          },
          {
            dataField: "action",
            text: "Action",
            formatter: deleteAction
            // sort: true
          }
        ];
        return (
            <Container>
                {alert ? <AlertDismissibleExample show={alert} msg={errMsg} status={alertStatus} /> : null}
                <Row>
                    <Col>
                        <Button variant="contained" color="primary" onClick={this.handleAddCategory}>Add</Button>
                    </Col>
                    <Col>
                        <TextField 
                        id="standard-basic" 
                        label="Name"
                        onChange={(event) => this.setState({categoryName: event.target.value})}
                        />
                    </Col>
                </Row>
                <BootstrapTable 
                    keyField='id' 
                    data={ categoryList } 
                    columns={ columns } 
                    cellEdit={ cellEdit }
                    headerClasses='headerStyle' 
                    border
                    hover
                    condensed
                    striped
                    bootstrap4
                    loading
                />
            </Container>
            
        )
    }
}

export default Category;