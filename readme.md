# Transaction Event Tracker
A collection of lambda functions each in a separately deployable npm project.

---

## Node Events Writer
This lambda function posts a transaction payload to dynamoDB.

An example json payload [here](https://raw.githubusercontent.com/arv25/transaction-events/master/node-events-writer/event.json).

---

## Node Events Reader
This lambda function queries for a count of transactions by store\_id, transaction\_type and last\_status, over a date range.

An example json payload is [here](https://raw.githubusercontent.com/arv25/transaction-events/master/node-events-reader/event.json).
