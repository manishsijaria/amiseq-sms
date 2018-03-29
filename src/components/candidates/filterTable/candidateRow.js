
import React from 'react'
import { FormGroup,  Input, Button,Badge} from 'reactstrap'
import  { Link } from 'react-router-dom'

import { candidateActions } from '../../../_actions'
import { connect } from 'react-redux'

class CandidateRow extends React.Component {
    constructor(props) {
        super(props)
        
        const { candidate, candidateArray } = this.props
        this.state = { checked:  (candidateArray.indexOf(candidate.candidate_id) !== -1) ? true : false }

    }

    handelChange = (event) => {
        try {
            const { candidateArray, dispatch } = this.props
            let val = parseInt(event.target.value,10)  //Note: the value of checkbox is returned as string
            if(candidateArray.indexOf(val) === -1) {
                dispatch(candidateActions.addSelectedCandidate(val))
                this.setState({ checked: true })
            } else {
                dispatch(candidateActions.deleteSelectedCandidate(val))
                this.setState({ checked: false })
            }
        } catch(error) {
            console.log(error)
        }
    }

 
    render() {
        const { candidate ,msg_count } = this.props
        return(
            <tr>
                <td>
                    <FormGroup check>
                        <Input type="checkbox" 
                            value={candidate.candidate_id} 
                            onChange={this.handelChange} 
                            checked={this.state.checked}/>
                    </FormGroup>                    
                </td>
                <td>{candidate.fullname}</td>
                <td>{candidate.mobile_no}</td>
                <td>{candidate.email}</td>
                <td>{candidate.hiredate }</td>
                <td>{candidate.company_name}</td>
                {(parseInt(msg_count,10) === 0) ? <td><Badge color="secondary">{msg_count}</Badge></td> 
                            : <td className='others'><Badge color="secondary">{msg_count}</Badge></td>}
                <td>
                    <Link to={`/candidates/editcandidate/${candidate.candidate_id}`}> 
                        <Button color="primary">Edit</Button>{' '} 
                    </Link> 
                </td>
                <td>
                    <Link to={`/candidates/viewnsend/${candidate.candidate_id}/${candidate.fullname}`}> <Button color="primary">View Send SMS</Button>{' '} </Link> 
                </td>                 
            </tr>
        )
    }
}

function mapStateToProps(state) {
    const  { candidateArray } = state.selectedCandidates
    return { candidateArray }
} 

const connectedCandidateRow = connect(mapStateToProps)(CandidateRow)

export { connectedCandidateRow as CandidateRow }