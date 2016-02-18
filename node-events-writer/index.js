var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function(event, context) {
  console.log("Request received:\n", JSON.stringify(event));
  console.log("Context received:\n", JSON.stringify(context));    

  var stage_name = event.stage_name;
  var table_name = [stage_name, "_transaction_events"].join("");

  dynamodb.putItem({
    "TableName": table_name, 
    "Item": {
      "transaction_id": {
        "S": event.transaction_id
      }, 
      "store_id": {
        "S": event.store_id
      },
      "transaction_date": {
        "S": event.transaction_date
      },
      "transaction_type": {
        "S": event.transaction_type
      },
      "last_status": {
        "S": event.last_status
      }
    }
  }, function(err, data) {
    if (err) {
      var failure_msg = ['ERROR: transaction-events::', stage_name, '-node-events-writer failed to complete. - ', err].join("");

      console.log(failure_msg);
      context.fail(failure_msg);
    } else {
      var output = JSON.stringify(data);
      var success_msg = ['SUCCESS: transaction-events::', stage_name, '-node-events-writer finished. - ', output].join("");

      console.log(success_msg);
      context.succeed(success_msg);
    } 
 });
}
