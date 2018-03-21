
import React from 'react'
import { Form, FormGroup, Label,  Input } from 'reactstrap'

export default class SearchBar extends React.Component {

    handelSearchChange = (event) => {
        this.props.onSearchTextChange(event.target.value)
        //alert(event.target.value)
    }
    handelFetchChange = (event) => {
        this.props.onFetchChange(event.target.value)
        //alert('event.target.value=' + event.target.value)
    }
    render() {
        const { fetchText } = this.props
        return(
            <div >
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="IDSearch" className="mr-sm-2">Search</Label>
                        <Input type="text" name="search" id="IDSearch" 
                            placeholder="Search for text in message" 
                            value = {this.props.searchText}
                            onChange={this.handelSearchChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="fetch" className="mr-sm-2" >Fetch messages of</Label>
                            <Input type="select" name="fetch" value={fetchText} onChange={this.handelFetchChange}>
                                <option value={'ALL'}>{'All'}</option>
                                <option value={'1_YEAR'}>{'1 year'}</option>
                                <option value={'6_MONTHS'}>{'6 months'}</option>
                                <option value={'3_MONTHS'}>{'3 months'}</option>
                                <option value={'1_MONTH'}>{'1 month'}</option>
                                <option value={'15_DAYS'}>{'15 days'}</option>
                                <option value={'7_DAYS'}>{'7 days'}</option>
                            </Input>
                    </FormGroup>                    
                </Form>
            </div>
        )
    }
}