
import React from 'react'
import CandidateTableHeader from './candidateTableHeader'
import { CandidateRow } from './candidateRow'

import { Table,Button } from 'reactstrap'
import '../../../styles/table.css'

import { candidateActions } from '../../../_actions'
import { connect } from 'react-redux'
import Workbook from 'react-excel-workbook'

class CandidateTable extends React.Component {
    
    handelClick = (event) => {
        const { dispatch,candidateArray } = this.props
        dispatch(candidateActions.deleteCandidates(candidateArray))
    }    
    row_push = (candidate,rows,filtered_candidates) => {
        const { candidates_msg } = this.props
        if(!candidates_msg.length) { //Without the event the msg_count should be 0 initially.
            rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate} msg_count={0}/>)
            filtered_candidates.push(candidate)
        }
        else {
            candidates_msg.forEach((msg)=> {
                if(msg.candidate_id === candidate.candidate_id) {
                    rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate} msg_count={msg.msg_count}/>)
                    filtered_candidates.push(candidate)
                }
            })
        }
    }
    render() {
        const { candidates, filterText, option, candidateArray } = this.props
        const rows = [], filtered_candidates = [] //Needed for Excel Export.
        candidates.forEach((candidate) => {
            if( candidate.fullname.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return }
            switch (option) {
                case 'WithAmiseq':
                    if(candidate.client_id) {
                        //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)
                        this.row_push(candidate,rows, filtered_candidates)
                     }
                     break;
                case 'NotWithAmiseq':
                    if(!candidate.client_id) {
                        //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
                        this.row_push(candidate,rows, filtered_candidates)
                    }
                    break;
                default: //All
                    //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
                    this.row_push(candidate,rows, filtered_candidates)
            }         
        })
        return(
            <div>
                <Button outline color="primary" onClick={this.handelClick} disabled={candidateArray.length ? false : true}>Delete</Button>{' '}
                <Workbook filename="Candidates-List.xlsx" element={<Button outline color="primary">Export to Excel</Button>}>
                    <Workbook.Sheet data={filtered_candidates} name="Candidates">
                        <Workbook.Column label="CandidateID" value="candidate_id"/>
                        <Workbook.Column label="Fullname" value="fullname"/>
                        <Workbook.Column label="MobileNo." value="mobile_no"/>
                        <Workbook.Column label="Company" value="company_name"/>
                        <Workbook.Column label="Hiredate" value="hiredate"/>
                        <Workbook.Column label="Birthdate" value="birthdate"/>
                        <Workbook.Column label="Email" value="email"/>
                        <Workbook.Column label="Gender" value="gender"/>
                        <Workbook.Column label="SSN" value="ssn"/>
                        <Workbook.Column label="Address" value="address"/>
                        <Workbook.Column label="Country" value="country"/>
                        <Workbook.Column label="State" value="state"/>
                        <Workbook.Column label="City" value="city"/>
                        <Workbook.Column label="Zip" value="zip"/>
                    </Workbook.Sheet>
                </Workbook>
                <Table striped responsive>
                    <CandidateTableHeader/>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { candidateArray } = state.selectedCandidates
    return {  candidateArray }
}

const connectedCandidateTable = connect(mapStateToProps)(CandidateTable)

export { connectedCandidateTable as CandidateTable}