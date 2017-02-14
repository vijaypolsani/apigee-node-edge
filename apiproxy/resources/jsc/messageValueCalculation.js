//Autodesk
//Jacob Goren
//09/10/15
//Apigee Javascript code to generate OAUth message values and round-trip time
//v1 - Regenerate the transaction ID

try{
    var systemTimestampIsoDate = new Date(context.getVariable("system.timestamp")).toISOString();
    context.setVariable("systemTimestampIsoDate", systemTimestampIsoDate);
    var error_content = context.getVariable("error.content");
    context.setVariable("errorMessage", error_content);
    transactionid = context.getVariable("transaction_id")

    if (!transactionid){
    time_stamp = context.getVariable("system.timestamp")

    client_id = context.getVariable("apigee.client_id")

    if (!client_id){
    client_id = "UNKNOWN"
    }


    new_transactionid ="AUT" + client_id + time_stamp
    context.setVariable("transaction_id", new_transactionid);
    }

    }
catch(err) {
    context.setVariable("systemTimestampIsoDate", 'no_timestamp');
    context.setVariable("transaction_id", 'no_transaction_id');
}