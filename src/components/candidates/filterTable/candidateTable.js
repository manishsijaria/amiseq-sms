
import React from 'react'
import CandidateTableHeader from './candidateTableHeader'
import { CandidateRow } from './candidateRow'

import { Table } from 'reactstrap'

import '../../../styles/table.css'

 export default class CandidateTable extends React.Component {
    render() {
        const { candidates, filterText, option } = this.props
        const rows = []
        candidates.forEach((candidate) => {
            if( candidate.fullname.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return }
            switch (option) {
                case 'WithAmiseq':
                    if(candidate.client_id) {
                        rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)
                     }
                     break;
                case 'NotWithAmiseq':
                    if(!candidate.client_id) {
                        rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
                    }
                    break;
                default: //All
                    rows.push(<CandidateRow key={candidate.candidate_id} candidate={candidate}/>)  
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

