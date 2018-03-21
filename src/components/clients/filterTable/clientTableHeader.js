
import React from 'react'


export default class ClientTableHeader extends React.Component {
    render() {
        return(
            <thead>
                <tr>
                    <th></th>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Mobile #</th>
                    <th>Email </th>
                    <th>Actions </th>
                </tr>
            </thead>
        )
    }
}