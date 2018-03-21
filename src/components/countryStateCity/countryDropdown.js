import React from 'react';
import {  Label,  Input, Col, FormGroup } from 'reactstrap'

var country_list = Object()

country_list = '|United States|India|'

export default class CountryDropdown extends React.Component {


    handelChange = (event) => {
        this.props.onCountryChange(event.target.value)
    }

    render() {
        const { country } = this.props
        var tagOptions
        if(!country) {
            tagOptions = `<option>{' '}</option>`
        } else { 
            var countries = country_list.split('|')
            tagOptions = countries.map(item => <option key={item}>{item}</option>)
        }
        
        return(
            <FormGroup row>
                <Label for="exampleSelect"  sm={3}>Country</Label>
                <Col sm={9}>
                    <Input type="select" name="select" id="exampleSelect"  value={country} onChange={this.handelChange}>
                        {tagOptions}
                    </Input>
                </Col>
            </FormGroup>            
        )
    }
}