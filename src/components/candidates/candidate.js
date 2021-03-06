import React from 'react'
import { Form, Label, FormGroup, Input, Col, Button } from 'reactstrap'
import CountryDropdown from '../countryStateCity/countryDropdown'
import StateDropdown from '../countryStateCity/stateDropdown'
import CityDropdown from '../countryStateCity/cityDropdown'

import {connect} from 'react-redux'
import { clientActions, candidateActions } from '../../_actions'

class Candidate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                        candidate: {
                            firstname: '',  lastname: '',               mobile_no: '',  
                            notes:'',       phone:'',
                            email:'',       birthdate: '',              gender: '',     ssn: '',
                            address: '',    country:'United States',    state: '',      city:'',
                            zip: '',        hiredate: '',               client_id: '',
                            fullname:'',    company_name: '',           resume_filename:'' 
                        },  
                        formData: new FormData(),
                        submitted: false   
                    }
    }
    componentWillMount() {
        const { dispatch, clients } = this.props

        //Note: If the user has visited fullClients.js, than the clients array remain populated.
        //      Therefore do not dispatch if it is populated.
        if(!clients.length) { 
            dispatch(clientActions.getClients())
        } 
        //Note: the below alert always return 0 length for clients
        //      However it returns 0 first and then actual length in render()
        //alert('clients.length ' + clients.length)
        const URL = this.props.match.url
        if(URL.indexOf('/candidates/editcandidate') !== -1) {
            const number = parseInt(this.props.match.params.number,10)
            const { candidates } = this.props
            candidates.forEach((candidate) => {
                if(candidate.candidate_id === number) {
                    this.setState({ candidate: { ...candidate }})
                }
            })
        }
    }
    handelCountryChange = (countryValue) => {
        const { candidate } = this.state
        this.setState({ candidate:{ ...candidate, country: countryValue, state:'' }  })
    }
    handelStateChange = (stateValue) => {
        const { candidate } = this.state
        this.setState({ candidate: {...candidate, state: stateValue, city: '' }})
    }
    handelCityChange = (cityValue) => {
        const { candidate } = this.state
        this.setState({ candidate:{ ...candidate, city: cityValue }})
    }

    handelChange = (event) => {
        const { candidate } = this.state
        const { name, value } = event.target
        const { clients } = this.props
        let  client_id = ''
        switch(name) {
            case 'firstname':
                this.setState({ candidate: {...candidate, [name] : value, fullname: value + ' ' + candidate.lastname}})
                break;
            case 'lastname':
                this.setState({ candidate: {...candidate, [name] : value, fullname: candidate.firstname + ' ' + value}})
                break;
            case 'client_id':
                
                let company_name = ''
                clients.forEach((client)=>{
                    //alert(typeof(value))
                    if(client.client_id === parseInt(value,10)) {
                        company_name = client.company_name
                        client_id = client.client_id
                    } else {
                        //do nothing
                    }
                })
                this.setState({  candidate: { ...candidate,  client_id:client_id, company_name: company_name } }) 
                break;
            case 'selectedFile':
                //this.setState({ resume: event.target.files[0]})
                //alert(this.state.resume)
                //let formData = new FormData()
                let formData = this.state.formData
                formData.append('resume', event.target.files[0] )       
                this.setState({ formData: formData })
                
                break;                
            default:
                this.setState({  candidate: { ...candidate, [name] : value } })            
        }
    }

    onDownloadResume = (event) => {
        event.preventDefault()
        const { dispatch } = this.props
        //alert(this.state.candidate.resume_filename)
        dispatch(candidateActions.downloadResume(this.state.candidate.resume_filename))
    }
    onDeleteResume = (event) => {
        event.preventDefault()
        this.setState({candidate: {...this.state.candidate,resume_filename:''}  })
        //alert(this.state.candidate.resume_filename)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true })
        const { dispatch } = this.props
        const { firstname,lastname,mobile_no,hiredate,client_id } =  this.state.candidate
        //alert('hiredate=' + hiredate)

        const URL = this.props.match.url
        if(firstname && lastname && mobile_no) {
            if( (hiredate && client_id) || (!hiredate && !client_id) ) {
                let formData = this.state.formData

                this.setState({  candidate: { ...this.state.candidate } }) 

                if(formData.has('resume')) {
                    this.setState({ candidate: {...this.state.candidate, resume_filename:formData.get('resume').name}  })
                }
                //Note: As we set the state in the above line, the render method is called 
                //      which takes time, therefore in order to get the correct candidate JSON
                //      with resume_filename set we need setTimeout.
                setTimeout(()=>{
                    //if submit is hit multiple times,  candidate key with values get appended many times.
                    if(formData.has('candidate')) { 
                        formData.delete('candidate')
                    }
                    formData.append('candidate', JSON.stringify(this.state.candidate) )
                    //alert(JSON.stringify(this.state.candidate))
                    this.setState({formData: formData})
                    if(URL.indexOf('/candidates/editcandidate') !== -1) {
                        const number = parseInt(this.props.match.params.number,10)
                        dispatch(candidateActions.editCandidate(number, this.state.formData))
                    } else {
                        dispatch(candidateActions.addCandidate(this.state.formData))
                    }
                },500)
            }
        }
    }

    render() {
        const { firstname,lastname,mobile_no,notes, phone, email,birthdate,gender,ssn,address,
                country, state, city,zip,hiredate,client_id  } = this.state.candidate
        const { submitted } = this.state
        const { clients } = this.props
        //alert(clients.length)

        var tagOptions
        if(!clients.length) {
            tagOptions = `<option key={0} value={0}>{' '}</option>`
        } else { 
            tagOptions =  clients.map(client => <option key={client.client_id} value={client.client_id}>
                                                    {client.company_name}
                                                </option>)
        }

        return(
            <div>
                <h4>Enter Candidate Details</h4>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="firstname" sm={3}>Firstname *</Label>
                        <Col sm={9}>
                            <Input type="text" name="firstname" value={firstname} onChange={this.handelChange}/>
                            {submitted && !firstname && <div className="text-danger">Firstname is required</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="lastname" sm={3}>Lastname *</Label>
                        <Col sm={9}>
                            <Input type="text" name="lastname" value={lastname} onChange={this.handelChange}/>
                            {submitted && !lastname && <div className="text-danger">Lastname is required</div>}
                        </Col>
                    </FormGroup>   
                    <FormGroup row>
                        <Label for="mobile_no" sm={3}>Mobile no. *</Label>
                        <Col sm={9}>
                            <Input type="text" name="mobile_no" value={mobile_no} onChange={this.handelChange}/>
                            {submitted && !mobile_no && <div className="text-danger">Mobile no. is required</div>}
                        </Col>
                    </FormGroup>  {/*
                    <FormGroup tag="fieldset" >
                        <Label sm={3}>For</Label>
                        <FormGroup check inline>
                            <Label for="for_client1" >Company 1
                                <Input type="select" name="for_client1" value={for_client1} onChange={this.handelChange}>
                                    <option>{' '}</option>
                                    {tagOptions}
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label for="for_client2">Company 2
                                <Input type="select" name="for_client2" value={for_client2} onChange={this.handelChange}>
                                    <option>{' '}</option>
                                    {tagOptions}
                                </Input>
                                </Label>
                        </FormGroup> 
                        <FormGroup check inline>
                            <Label for="for_client3">Company 3
                                <Input type="select" name="for_client3" value={for_client3} onChange={this.handelChange}>
                                    <option>{' '}</option>
                                    {tagOptions}
                                </Input>
                            </Label>
                        </FormGroup>                        
                    </FormGroup>     
                    */}                
                    <FormGroup row>
                        <Label for="notes" sm={3}>Notes</Label>
                        <Col sm={9}>
                            <Input type="textarea" name="notes" value={notes} onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>                     
                    <FormGroup row>
                        <Label for="hiredate" sm={3}>Hiredate</Label>
                        <Col sm={9}>
                            <Input type="date" name="hiredate" value={hiredate} onChange={this.handelChange}/>
                            {submitted && !hiredate && client_id && <div className="text-danger">Hiredate is required, if Company is not blank</div>}
                        </Col>
                    </FormGroup>  
                    <FormGroup row>
                        <Label for="client_id" sm={3}>Company</Label>
                        <Col sm={9}>
                            <Input type="select" name="client_id" value={client_id} onChange={this.handelChange}>
                                <option>{' '}</option>
                                {tagOptions}
                            </Input>
                            {submitted && !client_id && hiredate && <div className="text-danger">Company is required, if Hiredate is not blank</div>}
                        </Col>
                    </FormGroup>                      
                    <FormGroup row>
                        <Label for="phone" sm={3}>Phone no.</Label>
                        <Col sm={9}>
                            <Input type="text" name="phone" value={phone} onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>   
                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input type="email" name="email" value={email} onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>                                                                 
                    <FormGroup row>
                        <Label for="birthdate" sm={3}>Birthdate</Label>
                        <Col sm={9}>
                            <Input type="date" name="birthdate" value={birthdate} onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>    
                    <FormGroup tag="fieldset" >
                        <Label sm={3}>Gender</Label>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value="M" onChange={this.handelChange} checked={gender === 'M'}/>{' '}
                                Male
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" name="gender" value="F" onChange={this.handelChange} checked={gender === 'F'}/>{' '}
                                Female
                            </Label>
                        </FormGroup> 
                    </FormGroup>                   
                    <FormGroup row>
                        <Label for="ssn" sm={3}>SSN</Label>
                        <Col sm={9}>
                            <Input type="text" name="ssn" value={ssn} onChange={this.handelChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="address" sm={3}>Address</Label>
                        <Col sm={9}>
                            <Input type="textarea" name="address" value={address} onChange={this.handelChange}/>
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
                   {/* File Upload 
                   { resume_filename === '' ?
                        <FormGroup row>
                            <Label for="selectedFile" sm={3}>Upload Resume</Label>
                            <Col sm={9}>               
                                <Input type="file" name="selectedFile" onChange={this.handelChange}/>  
                            </Col>
                        </FormGroup>
                    :
                        <FormGroup row>
                            <Col sm={{ size: 10, offset: 3 }}>
                                <Label sm={3}>Resume File: {resume_filename}</Label>
                                <Button color="primary" onClick={this.onDownloadResume}>Download Resume</Button>{' '}
                                <Button color="primary" onClick={this.onDeleteResume}>Delete Resume</Button>
                            </Col>
                        </FormGroup>
                    }   
                    */ }                                   
                                                                                                                                                                                                         
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
    const { candidates } = state.candidatesGet
    return { clients, candidates }
}

const connectedCandidate = connect(mapStateToProps)(Candidate)

export { connectedCandidate as Candidate}