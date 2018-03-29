
import React from 'react'
import ClientTableHeader from './clientTableHeader'
import { ClientRow } from './clientRow'

import { Table } from 'reactstrap'

import '../../../styles/table.css'

 export default class ClientTable extends React.Component {
    render() {
        const { clients,clients_msg, filterText  } = this.props
        const rows = []
        clients.forEach((client) => {
            if( client.company_name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) { return }
            if(!clients_msg.length) { //Initialiy the array is empty, for first call.
                rows.push(<ClientRow key={client.client_id} client={client} msg_count={0}/>)
            }
            else {
                clients_msg.forEach((msg) => {
                    if(msg.client_id === client.client_id) {
                        rows.push(<ClientRow key={client.client_id} client={client} msg_count={msg.msg_count}/>)
                    }
                })
            } 
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

