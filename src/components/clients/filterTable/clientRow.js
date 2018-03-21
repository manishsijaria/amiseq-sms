
import React from 'react'
import { FormGroup,  Input, Button} from 'reactstrap'
import  { Link } from 'react-router-dom'

import { clientActions } from '../../../_actions'
import { connect } from 'react-redux'

class ClientRow extends React.Component {
    constructor(props) {
        super(props)
        
        const { client, clientArray } = this.props
        this.state = { checked:  (clientArray.indexOf(client.client_id) !== -1) ? true : false }

    }

    handelChange = (event) => {
        try {
            const { clientArray, dispatch } = this.props
            let val = parseInt(event.target.value,10)  //Note: the value of checkbox is returned as string
            if(clientArray.indexOf(val) === -1) {
                dispatch(clientActions.addSelectedClient(val))
                this.setState({ checked: true })
            } else {
                dispatch(clientActions.deleteSelectedClient(val))
                this.setState({ checked: false })
            }
        } catch(error) {
            console.log(error)
        }
    }
 
    render() {
        const { client  } = this.props
        return(
            <tr>
                <td>
                    <FormGroup check>
                        <Input type="checkbox" 
                            value={client.client_id} 
                            onChange={this.handelChange} 
                            checked={this.state.checked}/>
                    </FormGroup>                    
                </td>
                <td>{client.company_name}</td>
                <td>{client.contact_person_name}</td>
                <td>{client.mobile_no}</td>
                <td>{client.email}</td>
                <td>
                    <Link to={`/clients/editclient/${client.client_id}`}> <Button color="primary">Edit</Button>{' '} </Link> 
                </td>
                <td>
                    <Link to={`/clients/viewnsend/${client.client_id}/${client.company_name}`}> <Button color="primary">View Send SMS</Button>{' '} </Link> 
                </td>                
            </tr>
        )
    }
}

function mapStateToProps(state) {
    const  { clientArray } = state.selectedClients
    return { clientArray }
} 

const connectedClientRow = connect(mapStateToProps)(ClientRow)

export { connectedClientRow as ClientRow }