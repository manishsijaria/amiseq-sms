
import React from 'react'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'

export default class SearchBar extends React.Component {

    handelChange = (event) => {
        this.props.onFilterTextChange(event.target.value)
        //alert(event.target.value)
    }

    render() {
        return(
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="IDclientName" sm={2}>Company</Label>
                        <Col sm={10}>
                            <Input type="text" name="clientName" id="IDclientName" 
                               placeholder="Search for Company" 
                               value = {this.props.filterText}
                               onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}