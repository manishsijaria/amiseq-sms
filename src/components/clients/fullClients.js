import React from 'react'
import { Button, Input, FormGroup, Label } from 'reactstrap'
import  { Link } from 'react-router-dom' 

import { clientActions } from '../../_actions'
import { connect } from 'react-redux'

import FilterableClientTable from './filterTable/filterableClientTable'

class FullClients extends React.Component {
    constructor(props) {
        super(props)
        this.state = { with_or_without_candidates: 'WITHOUT_ASSOC_CANDIDATES' }
    }
    setWithorWithoutCandidates = (event) => {
        //alert(event.target.value) 
        this.setState ({
            with_or_without_candidates: event.target.value
        })
    }  

    componentWillMount() {
        const { dispatch,clients } = this.props
        if(!clients.length) { //NOTE: optimization on client, get the cached clients from redux store.
            dispatch(clientActions.getClients())
        }
    }

    render() {
        const { clients, clientArray } = this.props
        const { with_or_without_candidates } = this.state
        return(
          <div>
            {/* Buttons with Link */}
            <Link to="/clients/addclient">
                <Button outline color="primary">Add Client</Button>
            </Link>
            <br/><br/>
            
            {/* TODO: Back button removes the param, how to retain it*/}
            <Link to={`/clients/smsall/${this.state.with_or_without_candidates}`}>
                <Button outline color="primary">SMS All</Button>{' '}
            </Link>

            <Link to={`/clients/smschecked/${this.state.with_or_without_candidates}`}>
                <Button outline color="primary" disabled={clientArray.length ? false : true}>SMS Checked Clients</Button> <br/>
            </Link>
         
            <FormGroup check inline>
                <Label check>
                    <Input type="radio" name="radio" onChange={this.setWithorWithoutCandidates} 
                           value="WITHOUT_ASSOC_CANDIDATES" 
                           checked={with_or_without_candidates === 'WITHOUT_ASSOC_CANDIDATES'}/>{' '}            
                    Without Candidates
                </Label>
            </FormGroup>
            <FormGroup check inline>
                <Label check>
                    <Input type="radio" name="radio" onChange={this.setWithorWithoutCandidates} 
                           value="WITH_ASSOC_CANDIDATES" 
                           checked={with_or_without_candidates === 'WITH_ASSOC_CANDIDATES'} />{' '}
                    With Candidates
                </Label>            
            </FormGroup>                    
            <br/>
            <h4>Clients List </h4>
            <FilterableClientTable clients={clients}/>       
          </div>  
        )      
    }
}

function mapStateToProps(state) {
    const { clients } = state.clientsGet
    const { clientArray } = state.selectedClients
    return { clients, clientArray }
}

const connectedFullClients = connect(mapStateToProps)(FullClients)

export { connectedFullClients as FullClients}