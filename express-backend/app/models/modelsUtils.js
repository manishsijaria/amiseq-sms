var twilioKeys = require('../../config/twilioKeys')
var twilio = require('twilio')

const sql_queries = {
    INSERT_CLIENT: `INSERT INTO client_msg(msg_from,msg_to,sms_text,client_id) VALUES(?,?,?,?)`,
    INSERT_CANDIDATE: `INSERT INTO candidate_msg(msg_from,msg_to,sms_text,candidate_id) VALUES(?,?,?,?)`
}


/*
params:
clientList : array containg mobile_no and client_id
*/
module.exports.sendMsgToClients = (smsText, clientList, connection) => {
    //var insert_client_msg = `INSERT INTO client_msg(sms_text,client_id) VALUES(?,?)`
    var twilioClient = new twilio(twilioKeys.sid, twilioKeys.token)                            
    //for each client 
    let arrayLength = clientList.length
    for(let i=0; i < arrayLength; i++) {
        //get the mobile no, and send message, smsText
        twilioClient.messages.create({to: clientList[i].mobile_no,
                            from: twilioKeys.amiseq_no,
                            body: smsText},
        (err, messageData) => {
            if(err) {
                //log err msg in client_msg table.
                this.insertToClientMsg(connection, twilioKeys.amiseq_no, clientList[i].mobile_no, err.message,clientList[i].client_id )
                console.log(err)
            } else {
                this.insertToClientMsg(connection,twilioKeys.amiseq_no, clientList[i].mobile_no, smsText,clientList[i].client_id )
                //log smsText in client_msg table.

                // print SID of the message you just sent
                console.log(messageData.sid);
            }
        })  
    }
}

module.exports.insertToClientMsg = (connection, from, to, text, client_id) => {
    connection.query(sql_queries.INSERT_CLIENT,
        [from, to, text ,client_id ],
        function(err,result) {
                if(err) {  console.log(err)  }
        })   
}

/*
params:
clientAndCandidateList: array of objects containing 
                        client_id, mobile_no, candidate_mob_no, candidate_id
*/
module.exports.sendMsgToClientsAndCandidates = (smsText, clientAndCandidateList,connection) => {
    var twilioClient = new twilio(twilioKeys.sid, twilioKeys.token) 
    let clientAndCandidateListCount = clientAndCandidateList.length
    console.log('clientAndCandidateListCount=' +clientAndCandidateListCount)
    
    //NOTE: left join have duplicate of clients id's, if candidate is multiple for a client.
    let duplicate_clients = []  
    for(let i=0; i < clientAndCandidateListCount; i++) {
        //with client_id send the message to client.
        if(duplicate_clients.indexOf(clientAndCandidateList[i].client_id) === -1) {
            twilioClient.messages.create({to: clientAndCandidateList[i].mobile_no,
                from: twilioKeys.amiseq_no,
                body: smsText},
                (err, messageData) => {
                    if(err) {
                        //log err msg in client_msg table.
                        this.insertToClientMsg(connection,twilioKeys.amiseq_no,clientAndCandidateList[i].mobile_no, err.message,clientAndCandidateList[i].client_id )

                        console.log(err)
                    } else {
                        //log smsText in client_msg table.
                        this.insertToClientMsg(connection, twilioKeys.amiseq_no,clientAndCandidateList[i].mobile_no, smsText,clientAndCandidateList[i].client_id )

                        // print SID of the message you just sent
                        console.log(messageData.sid);
                    }
            })            
            duplicate_clients.push(clientAndCandidateList[i].client_id)
        }
        
        //if candidate_id is not null send the message to candidate.
        if(clientAndCandidateList[i].candidate_id) {
            this.sendMsgToCandidate(twilioClient,connection, smsText,
                                    clientAndCandidateList[i].candidate_id,
                                    clientAndCandidateList[i].candidate_mob_no)
        }                         
    }
}

//Private to this module, do not use from outside.
module.exports.sendMsgToCandidate = (twilioClient, connection, smsText, 
                                     candidate_id, candidate_mob_no) => {
    twilioClient.messages.create({to: candidate_mob_no,
        from: twilioKeys.amiseq_no,
        body: smsText},
        (err, messageData) => {
            if(err) {
                //log err msg in client_msg table.
                this.insertToCandidateMsg(connection,twilioKeys.amiseq_no,candidate_mob_no, err.message, candidate_id)

                console.log(err)
            } else {
                //log smsText in client_msg table.
                this.insertToCandidateMsg(connection,twilioKeys.amiseq_no,candidate_mob_no, smsText, candidate_id)

                // print SID of the message you just sent
                console.log(messageData.dateCreated);
            }
        }
    )
}

module.exports.insertToCandidateMsg = (connection,from, to, text, candidate_id) => {
    connection.query(sql_queries.INSERT_CANDIDATE,
        [from, to, text , candidate_id ],
        function(err,result) {
            if(err) { console.log(err)  }
        })  
}

module.exports.sendMsgToCandidates = (smsText, candidateList, connection, bWithAmiseq) => {
    var twilioClient = new twilio(twilioKeys.sid, twilioKeys.token) 
    let arrayLength = candidateList.length
    for(let i=0; i < arrayLength; i++) {
        if(bWithAmiseq) { //only with Amiseq Inc.
            if(candidateList[i].client_id) {
                this.sendMsgToCandidate(twilioClient, connection, 
                    smsText,candidateList[i].candidate_id,
                    candidateList[i].mobile_no)
            }
        } else { //smsAll
            this.sendMsgToCandidate(twilioClient, connection, 
                                    smsText,candidateList[i].candidate_id,
                                    candidateList[i].mobile_no)
        }
    }
}

module.exports.handelNullField = (field) => {
    if(field === '' || field === '0000-00-00') {
        return null
    }
    else {
        return field
    }
}