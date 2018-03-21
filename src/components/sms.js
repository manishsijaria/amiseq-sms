
import React  from 'react'
import { Form, Label, FormGroup, Input, Button, Alert } from 'reactstrap'
import { connect } from 'react-redux'

import { clientActions, candidateActions } from '../_actions'
import { alertActions } from '../_actions'

class Sms extends React.Component {
    constructor(props) {
        super(props)
        this.state = { smsText: '', msg:'', submitted: false  }
    }

    handelChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true })
        
        if(this.state.smsText === '') { return  }
        this.sendSms()
    }

    componentWillMount() {
        const URL = this.props.match.url
        if(URL.indexOf('/clients/smsall') !== -1) {
            switch (this.props.match.params.param) {
                case 'WITHOUT_ASSOC_CANDIDATES':
                    this.setState({msg: 'SMS all clients, without candidates'})
                    break;
                case 'WITH_ASSOC_CANDIDATES':
                    this.setState({msg: 'SMS all clients, with associated candidates'})
                    break;
                default:
            }
        }
        else if(URL.indexOf('/clients/smschecked') !== -1) {
            switch (this.props.match.params.param) {
                case 'WITHOUT_ASSOC_CANDIDATES':
                    this.setState({msg: 'SMS checked clients, without candidates'})
                    break;
                case 'WITH_ASSOC_CANDIDATES':
                    this.setState({msg: 'SMS checked clients, with associated candidates'})
                    break;
                default:
            }            
        }
        else if(URL.indexOf('/candidates/smsall') !== -1) {
            if(typeof(this.props.match.params.param) === 'undefined') {
                this.setState({msg: 'SMS all candidates'})
            } else {
                this.setState({msg: 'SMS all candidates with Amiseq Inc.'})
            }
        }
        else if(URL.indexOf('/candidates/smschecked') !== -1) {
            this.setState({msg: 'SMS checked candidates'})
        }
        else if(URL.indexOf('/both/smsall') !== -1) {
            this.setState({msg: 'SMS all clients and all candidates'})
        }
    }

    sendSms = () => {
        //Get the match.url.
        const URL = this.props.match.url
        const { dispatch, clientArray, candidateArray } = this.props
        const { smsText } = this.state
        //================= Clients =================
        //Check the location is /clients/smsall
        if(URL.indexOf('/clients/smsall') !== -1) {
            //If so dispatch the action with match params value, and for all clients.
            dispatch(clientActions.smsAll(this.props.match.params.param, smsText))
        }
        else if(URL.indexOf('/clients/smschecked') !== -1) {
            //If so dispatch the action with clientArray and match params value.
            dispatch(clientActions.smsChecked(this.props.match.params.param, smsText, clientArray) )
        }
        else if(URL.indexOf('/candidates/smsall') !== -1) {  
            //if this.props.match.params.param === 'undefined' it is handeled inside
            //if this.props.match.params.param === 'HIRED_IN_AMISEQ' it is handeled inside
            dispatch(candidateActions.smsAll(this.props.match.params.param, smsText))
        }   
        else if(URL.indexOf('/candidates/smschecked') !== -1) {
            //If so dispatch the action with candidateArray and match params value.
            dispatch(candidateActions.smsChecked(smsText, candidateArray ))
        }
        else if(URL.indexOf('/both/smsall') !== -1) { // ---  /both/smsall
            //alert('/both/smsall')
            dispatch(clientActions.smsAll('WITHOUT_ASSOC_CANDIDATES', smsText))
            dispatch(candidateActions.smsAll('undefined', smsText))
            setTimeout(function(){
                dispatch(alertActions.success('SMS send to all clients and all candidates'))
            },3000)
        }
        else if(URL.indexOf('/clients/viewnsend') !== -1) { //
            const number = parseInt(this.props.match.params.number,10)
            let Arr = [number]
            dispatch(clientActions.smsChecked('WITHOUT_ASSOC_CANDIDATES', smsText, Arr,false) )

            //setTimeout(function() {
                //Needed to refresh the messages in viewnsend screen.
            //    dispatch(clientActions.getClientMsgs(number))
            //},1000)
            this.setState({smsText: '', submitted: false})
        } 
        else { // '/candidates/viewnsend
            const number = parseInt(this.props.match.params.number,10)
            let Arr = [number]
            dispatch(candidateActions.smsChecked(smsText, Arr, false) )

            //setTimeout(function() {
                //Needed to refresh the messages in viewnsend screen.
            //    dispatch(candidateActions.getCandidateMsgs(number))
            //},1000)
            this.setState({smsText: '', submitted: false})
        }
    }
    
    render() {
        const { smsText, msg, submitted } = this.state
        return(
            <div style={{height: '20%'}}>
                <div>      
                    {msg && <Alert color="info">{msg}</Alert> }
                </div>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="smsText">Message</Label>
                        <Input type="textarea" name="smsText" value={smsText} onChange={this.handelChange}/>
                        {submitted && smsText === '' && <div>Please enter the Message to Send</div>}
                    </FormGroup>
                    <Button color="primary">Send SMS</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const  { clientArray } = state.selectedClients
    const { candidateArray } = state.selectedCandidates
    return { clientArray, candidateArray }
} 

const connectedSms = connect(mapStateToProps)(Sms)

export { connectedSms as Sms }