
import React from 'react'


export default class CandidateTableHeader extends React.Component {
    render() {
        return(
            <thead>
                <tr>
                    <th></th>
                    <th>Full name</th>
                    <th>Mobile #</th>
                    <th>Email </th>
                    <th>Hiredate</th>
                    <th>Company</th>
                    <th>Actions </th>
                </tr>
            </thead>
        )
    }
}