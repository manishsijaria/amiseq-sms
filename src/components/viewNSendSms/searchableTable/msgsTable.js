
import React from 'react'

//import { Table } from 'reactstrap'

import '../../../styles/table.css'
import '../../../styles/simpleChat.css'
import  { ServerConstants } from '../../../_constants'

export default class MsgsTable extends React.Component {
   
    render() {
        const { msgs, searchText, name  } = this.props
        const rows = []
        //Header to add
        msgs.forEach((msg) => {
            var indexOfSearchText = msg.sms_text.toLowerCase().indexOf(searchText.toLowerCase())
            if(!searchText.length || (indexOfSearchText === -1)) {
                if(ServerConstants.TWILIO_AMISEQ_NO === msg.msg_from) {
                    rows.push(<li style={{width:'100%'}}>
                                    <div className="msj-rta macro">
                                        <div className="text text-r">
                                            <p>{msg.sms_text}</p>
                                            <p><small>Amiseq : {msg.message_date}</small></p>
                                        </div>
                                    </div>
                                </li>)
                    //rows.push(<tr className='amiseq'> <td>{msg.message_date} </td> <td>{msg.sms_text} </td> </tr>)
                } else {
                        rows.push(<li style={{width:'100%'}}>
                                    <div className="msj macro">
                                        <div className="text text-l">
                                            <p> {msg.sms_text} </p>
                                            <p><small>{name} : {msg.message_date}</small></p>
                                        </div>
                                    </div>
                                </li>)
                    //rows.push(<tr className='others'> <td>{msg.message_date} </td> <td>{msg.sms_text} </td> </tr>)
                }                
            } else {
                var leftText = msg.sms_text.slice(0,indexOfSearchText)
                var rightText = msg.sms_text.slice(indexOfSearchText + searchText.length, msg.sms_text.length)
                var highlightText = msg.sms_text.slice(indexOfSearchText , indexOfSearchText + searchText.length) 
                if(ServerConstants.TWILIO_AMISEQ_NO === msg.msg_from) {
                    rows.push(<li style={{width:'100%'}}>
                                <div className="msj-rta macro">
                                    <div className="text text-r">
                                        <p>{leftText}<span className='highlight'>{highlightText}</span>{rightText}</p>
                                        <p><small>Amiseq : {msg.message_date}</small></p>
                                    </div>
                                </div>
                            </li>)
                } else {
                    rows.push(<li style={{width:'100%'}}>
                                    <div className="msj macro">
                                        <div className="text text-l">
                                            <p> {leftText}<span className='highlight'>{highlightText}</span>{rightText}</p>
                                            <p><small>{name} : {msg.message_date}</small></p>
                                        </div>
                                    </div>
                                </li>)
                }
            }
        })
        return(
            <div className="frame" >
                <ul className="ulclass">
                    {rows}
                </ul>
            </div>
        )
    }
}
