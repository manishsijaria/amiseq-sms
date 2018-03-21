
import React from 'react'
import { Form, Label, FormGroup, Input, Col, Button } from 'reactstrap'
import CountryDropdown from '../countryStateCity/countryDropdown'
import StateDropdown from '../countryStateCity/stateDropdown'
import CityDropdown from '../countryStateCity/cityDropdown'
import { connect } from 'react-redux'
import { clientActions } from '../../_actions'

class Client extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
                        client: {
                            company_name: '',   contact_person_name: '',    mobile_no:'',
                            phone1:'',          phone2:'',                  email:'',
                            address1:'',        address2:'',                country:'United States',
                            state:'',           city:'',                    zip:''
                        },
                        submitted: false   
                    }
    }

    handelCountryChange = (countryValue) => {
        const { client } = this.state
        this.setState({ client: {...client, country: countryValue, state:'' } })
    }
    handelStateChange = (stateValue) => {
        const { client } = this.state
        this.setState({ client: { ...client,  state: stateValue, city: ''} })
    }
    handelCityChange = (cityValue) => {
        const { client } = this.state
        this.setState({ client: {...client, city: cityValue }})
    }

    handelChange = (event) => {
        const { client } = this.state
        const { name, value } = event.target
        this.setState({
            client: { ...client,   [name] : value }
        })
    }

    //Used for populating the data from /clients/editclient
    componentWillMount() {
        const URL = this.props.match.url
        if(URL.indexOf('/clients/editclient') !== -1) {
            const number = parseInt(this.props.match.params.number,10)
            const { clients } = this.props
            clients.forEach((client) => {
                if(client.client_id === number) {
                    this.setState({ client: {  ...client  } })
                }
            })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true })

        const URL = this.props.match.url
        const { dispatch } = this.props
        const { company_name,contact_person_name,mobile_no } = this.state.client
        if(!(company_name && contact_person_name && mobile_no)) {
            return
        }
        if(URL.indexOf('/clients/editclient') !== -1) {
            const number = parseInt(this.props.match.params.number,10)
            dispatch(clientActions.editClient(number, this.state.client))
        } else { //addclient
            dispatch(clientActions.addClient(this.state.client))
        }
    }
    render() {
        const { company_name,contact_person_name,mobile_no,phone1,
        phone2,email,address1,address2,country,state, city,zip } = this.state.client
        const { submitted } = this.state
        return(
                <div>
                    <h4>Enter Client Details</h4>
                    <Form name="form" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="company_name" sm={3}>Company *</Label>
                            <Col sm={9}>
                                <Input type="text" name="company_name" value={company_name} onChange={this.handelChange}/>
                                {submitted && !company_name && <div className="text-danger">Company name is required</div>}
                            </Col>
                        </FormGroup>        
                        <FormGroup row>
                            <Label for="contact_person_name" sm={3}>Contact name *</Label>
                            <Col sm={9}>
                                <Input type="text" name="contact_person_name" value={contact_person_name} onChange={this.handelChange}/>
                                {submitted && !contact_person_name && <div className="text-danger">Contact name is required</div>}
                            </Col>
                        </FormGroup>    
                        <FormGroup row>
                            <Label for="mobile_no" sm={3}>Mobile no. *</Label>
                            <Col sm={9}>
                                <Input type="text" name="mobile_no" value={mobile_no} onChange={this.handelChange} placeholder="+1xxxxxxxxxx"/>
                                {submitted && !mobile_no && <div className="text-danger">Mobile no. is required</div>}
                            </Col>
                        </FormGroup>       
                        <FormGroup row>
                            <Label for="phone1" sm={3}>Phone no. 1</Label>
                            <Col sm={9}>
                                <Input type="text" name="phone1" value={phone1} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>   
                        <FormGroup row>
                            <Label for="phone2" sm={3}>Phone no. 2</Label>
                            <Col sm={9}>
                                <Input type="text" name="phone2" value={phone2} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>        
                        <FormGroup row>
                            <Label for="email" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" value={email} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>   
                        <FormGroup row>
                            <Label for="address1" sm={3}>Address 1</Label>
                            <Col sm={9}>
                                <Input type="textarea" name="address1" value={address1} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>   
                        <FormGroup row>
                            <Label for="address2" sm={3}>Address 2</Label>
                            <Col sm={9}>
                                <Input type="textarea" name="address2" value={address2} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>   
                        <CountryDropdown country={country} onCountryChange={this.handelCountryChange}/>
                        <StateDropdown country={country} state={state} onStateChange={this.handelStateChange}/>
                        <CityDropdown state={state} city={city} onCityChange={this.handelCityChange}/>
                        <FormGroup row>
                            <Label for="zip" sm={3}>Zip</Label>
                            <Col sm={9}>
                                <Input type="text" name="zip" value={zip} onChange={this.handelChange}/>
                            </Col>
                        </FormGroup>                                                                                                                                                                                                                     
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 5 }}>
                                <Button color="primary">Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
        )
    }
}

function mapStateToProps(state) {
    const { clients } = state.clientsGet
    return { clients }
}

const connectedClient = connect(mapStateToProps)(Client)

export { connectedClient as Client }