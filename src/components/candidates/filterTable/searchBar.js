
import React from 'react'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'

export default class SearchBar extends React.Component {

    handelFilterChange = (event) => {
        this.props.onFilterTextChange(event.target.value)
    }

    setRadioOptions = (event) => {
        this.props.onSelectRadio(event.target.value)
    }
    render() {
        const { option } = this.props
        return(
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="IDcandidateName" sm={2}>Full name</Label>
                        <Col sm={10}>
                            <Input type="text" name="candidateName" id="IDcandidateName" 
                               placeholder="Search for full name" 
                               value = {this.props.filterText}
                               onChange={this.handelFilterChange}/>
                        </Col>
                        
                        <Label for="radio" sm={2}>Filter</Label>
                        <Col sm={10}>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="radio" onChange={this.setRadioOptions} 
                                        value="All" 
                                        checked={option === 'All'}/>{' '}            
                                    All
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="radio" onChange={this.setRadioOptions} 
                                        value="WithAmiseq" 
                                        checked={option === 'WithAmiseq'} />{' '}
                                    With Amiseq Inc.
                                </Label>            
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" name="radio" onChange={this.setRadioOptions} 
                                        value="NotWithAmiseq" 
                                        checked={option === 'NotWithAmiseq'} />{' '}
                                    Not with Amiseq Inc.
                                </Label>            
                            </FormGroup> 
                        </Col>                       
                    </FormGroup>
                </Form>
            </div>
        )
    }
}