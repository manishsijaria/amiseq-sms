
import React from 'react'

import { Table } from 'reactstrap'

import '../../../styles/table.css'
import  { twilioKeyConstants } from '../../../_constants'

 export default class MsgsTable extends React.Component {
   
    render() {
        const { msgs, searchText  } = this.props
        const rows = []
        rows.push(<thead> 
                        <tr><th className="date">Date</th><th className="msg">Message</th> </tr>
                    </thead>)
        msgs.forEach((msg) => {
            var indexOfSearchText = msg.sms_text.toLowerCase().indexOf(searchText.toLowerCase())
            if(!searchText.length || (indexOfSearchText === -1)) {
                if(twilioKeyConstants.amiseq_no === msg.msg_from) {
                    rows.push(<tr className='amiseq'> <td>{msg.message_date} </td> <td>{msg.sms_text} </td> </tr>)
                } else {
                    rows.push(<tr className='others'> <td>{msg.message_date} </td> <td>{msg.sms_text} </td> </tr>)
                }                
            } else {
                var leftText = msg.sms_text.slice(0,indexOfSearchText)
                var rightText = msg.sms_text.slice(indexOfSearchText + searchText.length, msg.sms_text.length)
                var highlightText = msg.sms_text.slice(indexOfSearchText , indexOfSearchText + searchText.length) 
                if(twilioKeyConstants.amiseq_no === msg.msg_from) {
                    rows.push(<tr className='amiseq'> 
                                <td>{msg.message_date} </td> 
                                <td>{leftText}<span className='highlight'>{highlightText}</span>{rightText} </td> 
                              </tr>)
                } else {
                    rows.push(<tr className='others'> 
                                <td>{msg.message_date} </td> 
                                <td>{leftText}<span className='highlight'>{highlightText}</span>{rightText}  </td> 
                              </tr>)
                }
            }
        })
        return(
            <div  style={{height: '80%'}}>
                <Table responsive className="table-fixed">
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }
}

