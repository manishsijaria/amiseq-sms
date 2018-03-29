
import React from 'react'
import CandidateTableHeader from './candidateTableHeader'
import { CandidateRow } from './candidateRow'

import { Table } from 'reactstrap'

import '../../../styles/table.css'

 export default class CandidateTable extends React.Component {
    row_push = (candidate,rows) => {
        const { candidates_msg } = this.props
        if(!candidates_msg.length) {
            rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate} msg_count={0}/>)
        }
        else {
            candidates_msg.forEach((msg)=> {
                if(msg.candidate_id === candidate.candidate_id) {
                    rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate} msg_count={msg.msg_count}/>)
                }
            })
        }
    }
    render() {
        const { candidates, filterText, option } = this.props
        const rows = []
        candidates.forEach((candidate) => {
            if( candidate.fullname.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return }
            switch (option) {
                case 'WithAmiseq':
                    if(candidate.client_id) {
                        //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)
                        this.row_push(candidate,rows)
                     }
                     break;
                case 'NotWithAmiseq':
                    if(!candidate.client_id) {
                        //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
                        this.row_push(candidate,rows)
                    }
                    break;
                default: //All
                    //rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
                    this.row_push(candidate,rows)
            }         
        })
        return(
            <div>
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

