
import React from 'react'
import ClientTableHeader from './clientTableHeader'
import { ClientRow } from './clientRow'

import { Table } from 'reactstrap'

import '../../../styles/table.css'

 export default class ClientTable extends React.Component {
    render() {
        const { clients, filterText  } = this.props
        const rows = []
        clients.forEach((client) => {
            if( client.company_name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return }
            rows.push(<ClientRow key={client.client_id} client={client} />)
        })
        return(
            <div>
                <Table striped responsive>
                    <ClientTableHeader/>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }
}

