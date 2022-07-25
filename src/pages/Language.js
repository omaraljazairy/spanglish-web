import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import AlertDismissibleExample from '../components/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { apiUri } from '../services/constants';
import { error_response_output } from '../services/errorresponse';


class Language extends Component {
    constructor(props){
        super(props)
        this.state = {
            lan: [],
            responseMsg: '',
            fetchStatuscode: null,
            lanCode: null,
            lanName: null,
            showAlert: false,
            submitStatus: false
        }
    }

    componentDidMount() {
        this.handleGetLanguages();
    }

    handleAddLanguage = async () => {
        this.setState({showAlert: false})
        var url = apiUri + 'language/'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    name: this.state.lanName, 
                    code: this.state.lanCode 
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
            var lanTemp = this.state.lan
            var newLan = [...lanTemp, data]

            this.setState(
                {
                    lan: newLan,
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Language added successfully"]
                })
        } catch (err) {
            console.error("post error: ", err)
            this.setState({responseMsg: err});
        }
    }

    handleGetLanguages = async () => {
        var url = apiUri + 'language/all/'
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {}
            })
            let body = await res.json()
            console.log("data received => ", body)
            // set the body to language if status is 200, otherwise give an empty array
            if (res.status === 200) {
                this.setState({lan: body})
            } else {
                this.setState({lan: []})    
            }
        } catch (err) {
            console.error("error fetching languages: ", err);
            this.setState({lan: []})
        }
    }

    handleDeleteLanguage = async (languageId) => {
        console.log("languageId ", languageId)
        this.setState({showAlert: false})
        var url = apiUri + 'language/delete/id/' + languageId
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
            var newLan = this.state.lan.filter(lan => lan.id !== languageId)
            // var newLan = [...lanTemp, data]

            this.setState(
                {
                    lan: newLan,
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Language deleted successfully"]
                })
        } catch (err) {
            console.error("delete error: ", err)
            this.setState({responseMsg: err});
        }
    }        

    handleEditLanguage = async (languageId, row) => {
        console.log("row => ", row)
        this.setState({showAlert: false})
        var data = { 
            code: row.code,
            name: row.name
        }


        console.log("data for update => ", data)
        var url = apiUri + 'language/update/id/' + languageId + '/'
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

            // update the value changed.

            this.setState(
                {
                    showAlert: true,
                    submitStatus: true,
                    responseMsg: ["Language update successfully"]
                })
        } catch (err) {
            console.error("update error: ", err)
            this.setState({responseMsg: err});
        }
    }

    validateName = (newValue) => {
        console.log("Validate newValue => ", newValue)
        if ( newValue.length < 4 ) {
            return false
        } else {
            return true
        }        
    }

    validateCode = (newValue) => {
        console.log("Validate codeValue => ", newValue)
        if ( newValue.length !== 2 ) {
            return false
        } else {
            return true
        }        
    }
    render() {
        const alert = this.state.showAlert
        const errMsg = this.state.responseMsg
        const alertStatus = this.state.submitStatus ? "success" : "danger"
        const products = this.state.lan
        const deleteAction = (cell, row, rowIndex, formatExtraData) => {
            return (
              <Button variant="contained" color="secondary"
                onClick={() => {
                    this.handleDeleteLanguage(row.id)
                }}
              >
                Delete
              </Button>
            );
          };

          const cellEdit = cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => this.handleEditLanguage(row.id, row)
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
                      message: "ERROR: Name should be > 4 characters"
                  }
              }
            }
          }, 
          {
            dataField: 'code',
            text: 'Code',
            validator: (newValue, row, column) => {
                if (this.validateCode(newValue)) {
                    return true
                } else {
                    return {
                        valid: false,
                        message: "ERROR: Code should be 2 characters"
                    }
                }
              }
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
                        <Button variant="contained" color="primary" onClick={this.handleAddLanguage}>Add</Button>
                    </Col>
                    <Col>
                        <TextField 
                        id="standard-basic" 
                        label="Code"
                        onChange={(event) => this.setState({lanCode: event.target.value})}
                        />
                    </Col>
                    <Col>
                        <TextField 
                        id="standard-basic" 
                        label="Name"
                        onChange={(event) => this.setState({lanName: event.target.value})}
                        />
                    </Col>
                </Row>
                <BootstrapTable keyField='id' data={ products } columns={ columns } cellEdit={ cellEdit }/>
                {/* <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control 
                                required
                                type="text" 
                                placeholder="Code"
                                onChange={(event) => this.setState({lanCode: event.target.value})}
                                />
                            </td>
                            <td>
                                <Form.Control
                                 type="text" 
                                 placeholder="Name"
                                 onChange={(event) => this.setState({lanName: event.target.value})}
                                 />
                            </td>
                            <td>
                                <Button variant="primary" type="submit" onClick={this.handleAddLanguage}>
                                    Add
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lan ? this.state.lan.map(languages => (
                            <tr key={languages.id}>
                                <td>
                                    <Button variant="danger" type="submit" onClick={() => this.handleDeleteLanguage(languages.id)}>Delete</Button>
                                    <CustomModal isShow={this.state.isEdit} name={languages.name} edit={this.handleEditLanguage} handleEdit={this.handleEdit}/>
                                </td>
                                 <td>
                                    {languages.name}
                                    </td>
                                 <td onClick={() => console.log('click')}>{languages.code}</td>
                            </tr>
                            ) 
                        ) : null
                    }
                    </tbody>
                </Table>
                <BootstrapTable keyField='id' data={this.state.lan} columns={columns}/> */}
            </Container>
            
        )
    }
}

export default Language;