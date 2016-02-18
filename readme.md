# Transaction Event Tracker

## Node Events Writer
This lambda function posts a transaction payload to dynamoDB.

## Node Events Reader
This lambda function queries for a count of transactions by store\_id, transaction\_type and last\_status, over a date range.

