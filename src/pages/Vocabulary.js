import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import AlertDismissibleExample from '../components/Alert';
import { apiUri } from '../services/constants';
import { error_response_output } from '../services/errorresponse';
import '../assets/css/tableheader.css'

class Vocabulary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vocabularies:[],
            responseMsg: '',
            fetchStatuscode: null,
            showAlert: false,
            submitStatus: false            
        }
    }

    componentDidMount() {
        // fetch all the vocabo=ularies.
        this.handleGetVocabularies()
    }

    handleGetVocabularies = async () => {
        var url_all = apiUri + 'word/all/';
        
        try {
            const res = await fetch(url_all, {
                method: 'GET',
                headers: {}
            })
            let body = await res.json()
            console.log("data received => ", body)
            // set the body to language if status is 200, otherwise give an empty array
            if (res.status === 200) {
                this.setState({vocabularies: body})
            } else {
                this.setState({vocabularies: []}) 
            }
        } catch (err) {
            console.error("error fetching vocabularies: ", err);
            this.setState({vocabularies: []})
        }
    }


    translationFormatter = (cell, row, rowIndex, formatExtraData) => {
        if (cell) {
            console.log('cell => ', cell);
            console.log('row => ', row);
            console.log('rowIndex => ', rowIndex);
            console.log('formatExtraData => ', formatExtraData);
            return cell[0].translation    
        } else {
            return 'No Translation Available'
        }
    }

    render() {
        const vocabularies = this.state.vocabularies;
        // const data = [
        //     { id: 1, name: 'George', animal: 'Monkey' },
        //     { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
        //     { id: 3, name: 'Alice', animal: 'Giraffe' },
        //     { id: 4, name: 'Alice', animal: 'Tiger' }
        //   ]

        console.log('vocabularies => ', vocabularies);

        const columns = [
          {
            dataField: 'id',
            text: 'ID',
            editable: false,
            sort: true
          }, {
            dataField: 'text',
            text: 'Text',
            sort: true,
            filter: textFilter()
          }, 
          {
            dataField: 'category_name',
            // dataField: 'animal',
            text: 'Category',
            sort: true,
            filter: textFilter({
                placeholder: 'category',
                comparator: Comparator.LIKE
            })
          },
          {
            dataField: 'translations',
            text: 'Translation',
            filter: textFilter({
                placeholder: 'translation',
                comparator: Comparator.LIKE
            }),
            formatter: (cell, row, rowIndex, formatExtraData) => this.translationFormatter(cell, row, rowIndex, formatExtraData)
          },
        ];

        return (
            <Container>
                <BootstrapTable 
                    keyField='id' 
                    data={ vocabularies } 
                    columns={ columns } 
                    // headerClasses='headerStyle' 
                    // border
                    // hover
                    // condensed
                    // striped
                    // bootstrap4
                    filter={ filterFactory() }
                    // loading
                />
            </Container>
        )
    }
}

export default Vocabulary;