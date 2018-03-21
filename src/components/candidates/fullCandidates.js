import React from 'react'
import { Button } from 'reactstrap'
import  { Link } from 'react-router-dom' 

import { candidateActions } from '../../_actions'
import { connect } from 'react-redux'

import FilterableCandidateTable from './filterTable/filterableCandidateTable'

class FullCandidates extends React.Component {
    componentWillMount() {
        const { dispatch, candidates } = this.props
        if(!candidates.length) {
            dispatch(candidateActions.getCandidates())
        }
    }
    render() {
        const { candidates, candidateArray } = this.props
        return(
            <div>
                {/* Buttons with Link */}
                <Link to="/candidates/addcandidate">
                    <Button outline color="primary">Add Candidate</Button>
                </Link>
                <br/><br/>

                {/* TODO: Back button removes the param, how to retain it*/}
                <Link to={`/candidates/smsall`}>
                    <Button outline color="primary">SMS All</Button>{' '}
                </Link>

                {/* TODO: Back button removes the param, how to retain it*/}
                <Link to={`/candidates/smsall/HIRED_IN_AMISEQ`}>
                    <Button outline color="primary">SMS All with Amiseq Inc.</Button>{' '}
                </Link>

                {/* TODO: How to send the checked clients list to this route, also the route need to be defined */}
                <Link to={`/candidates/smschecked`} >
                    <Button outline color="primary" disabled={candidateArray.length ? false : true} >SMS Checked Candidates</Button> <br/>
                </Link>
                <h4>Candidates List </h4>
                <FilterableCandidateTable candidates={candidates}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { candidates } = state.candidatesGet
    const { candidateArray } = state.selectedCandidates
    return { candidates, candidateArray }
}

const connectedFullCandidates = connect(mapStateToProps)(FullCandidates)

export { connectedFullCandidates as FullCandidates}