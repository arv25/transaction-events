# Transaction Event Tracker
A collection of lambda functions each in a separately deployable npm project.

Pre-requisites:
 - Get [Node.js](https://nodejs.org/en/)
 - Setup [npm](https://www.npmjs.com/)
 - Setup [Grunt](http://gruntjs.com/)
 - Setup the [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) _(\*you need an Amazon account)_

Setup:
 - Clone this repo via `git clone git@github.com:arv25/transaction-events.git`
 - Run `npm install` to get dependencies.
 - Run `grunt lambda_invoke` to test lambda function execution.
 - Run `grunt deploy` and `grunt deploy_prod` to zip all dependecies and deploy to beta and prod respectively.

---

## Node Events Writer
This lambda function posts a transaction payload to dynamoDB.

An example json payload [here](https://raw.githubusercontent.com/arv25/transaction-events/master/node-events-writer/event.json).

---

## Node Events Reader
This lambda function queries for a count of transactions by store\_id, transaction\_type and last\_status, over a date range.

An example json payload is [here](https://raw.githubusercontent.com/arv25/transaction-events/master/node-events-reader/event.json).
