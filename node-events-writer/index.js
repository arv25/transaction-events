var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var Promise = require('bluebird');
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));


function construcEventParams(event) {
  var table_name = [event.stage_name, "_transaction_events"].join("");

  var params = {
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
  }

  if (event.error_message && event.error_message != '') {
    params["Item"]["error_message"] = {
      "S": event.error_message
    }
  }

  return params;
};


function persistEvent(event, context) {
  var params = construcEventParams(event);

  dynamodb.putItemAsync(params).then(function(data) {
    var success_msg = ['SUCCESS: transaction-events::', event.stage_name, '-node-events-writer finished.'].join("");
    console.log(success_msg);
    context.succeed(success_msg);

  }).catch(function(err) {
    var failure_msg = ['ERROR: transaction-events::', event.stage_name, '-node-events-writer failed to complete. - ', err].join("");
    console.log(failure_msg);
    context.fail(failure_msg);
  });
};


exports.handler = function(event, context) {
  console.log("Request received:\n", JSON.stringify(event));
  console.log("Context received:\n", JSON.stringify(context));

  persistEvent(event, context);

};
