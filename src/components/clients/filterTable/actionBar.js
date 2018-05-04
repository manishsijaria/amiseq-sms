
import React from 'react'
import { Button} from 'reactstrap'

import { clientActions } from '../../../_actions'
import { connect } from 'react-redux'

import Workbook from 'react-excel-workbook'

class ActionBar extends React.Component {
    handelClick = (event) => {
        const { dispatch,clientArray } = this.props
        dispatch(clientActions.deleteClients(clientArray))
    }
    render() {
        const { clientArray, clients  } = this.props
        return(
            <div>
                <Button outline color="primary" onClick={this.handelClick} disabled={clientArray.length ? false : true}>Delete</Button>{' '}
                <Workbook filename="Clients-List.xlsx" element={<Button outline color="primary">Export to Excel</Button>}>
                    <Workbook.Sheet data={clients} name="Clients">
                        <Workbook.Column label="ClientID" value="client_id"/>
                        <Workbook.Column label="ClientName" value="company_name"/>
                        <Workbook.Column label="ContactName" value="contact_person_name"/>
                        <Workbook.Column label="MobileNo." value="mobile_no"/>
                        <Workbook.Column label="Phone1" value="phone1"/>
                        <Workbook.Column label="Phone2" value="phone2"/>
                        <Workbook.Column label="Email" value="email"/>
                        <Workbook.Column label="Address1" value="address1"/>
                        <Workbook.Column label="Address2" value="address2"/>
                        <Workbook.Column label="Country" value="country"/>
                        <Workbook.Column label="State" value="state"/>
                        <Workbook.Column label="City" value="city"/>
                        <Workbook.Column label="Zip" value="zip"/>
                    </Workbook.Sheet>
                </Workbook>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { clientArray } = state.selectedClients
    return {  clientArray }
}

const connectedActionBar = connect(mapStateToProps)(ActionBar)

export { connectedActionBar as ActionBar}