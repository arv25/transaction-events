var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = function (event, context) {
  console.log("Request received:\n", JSON.stringify(event));
  console.log("Context received:\n", JSON.stringify(context));    

  var stage_name = event.stage_name;
  var table_name = [stage_name, "_transaction_events"].join("");

  dynamodb.query({
    "TableName": table_name,
    "Select": "COUNT",
    "IndexName": "store_id-index",
    "KeyConditionExpression": "store_id = :v1",
    "ExpressionAttributeValues": {
      ":v1": { "S": event.store_id },
      ":v2": { "S": event.last_status },
      ":v3": { "S": event.start_date },
      ":v4": { "S": event.end_date }
    },
    "FilterExpression": "last_status = :v2 AND transaction_date BETWEEN :v3 and :v4",
    "ReturnConsumedCapacity": "TOTAL"
  }, function(err, data) {
    if (err) {
      var failure_msg = ['ERROR: transaction-events::', stage_name, '-node-events-reader failed to complete. - ', err].join("");

      console.log(failure_msg);
      context.fail(failure_msg);
    } else {
      var count = JSON.stringify(data["Count"]);
      var success_msg = ['SUCCESS: transaction-events::', stage_name, '-node-events-reader finished. - Count: ', count].join("");

      console.log(success_msg);
      context.succeed(success_msg);
    }
  });

};
