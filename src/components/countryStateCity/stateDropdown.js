import React from 'react';
import {  Label,  Input, Col, FormGroup } from 'reactstrap'

const country_state = Object()
country_state['United States'] = '|Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|'
country_state['India'] = '|Madhya Pradesh|Maharashtra|'

export default class StateDropdown extends React.Component {

    handelChange = (event) => {
        this.props.onStateChange(event.target.value)
    }
    
    render() {
        const { country, state } = this.props
        var tagOptions
        if(!country) {
            tagOptions = `<option>{' '}</option>`
        } else {   
            var states = country_state[country].split('|')
            tagOptions = states.map(item => <option key={item}>{item}</option>)
        }
        
        return(
            <FormGroup row>
                <Label for="exampleSelect"  sm={3}>State</Label>
                <Col sm={9}>
                    <Input type="select" name="select" id="exampleSelect"  value={state} onChange={this.handelChange}>
                        {tagOptions}
                    </Input>
                </Col>
            </FormGroup>
        )
    }
}