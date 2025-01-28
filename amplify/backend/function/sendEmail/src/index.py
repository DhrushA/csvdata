import boto3
import os
import json
from chalice import BadRequestError,Chalice
import datetime
import decimal
from gql import Client
from gql.transport.requests import RequestsHTTPTransport
from requests_aws4auth import AWS4Auth
from gql import gql
import traceback

app = Chalice(app_name="fetchData")
sesClient = boto3.client('ses',region_name='us-east-2')

def default_serializer(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    if isinstance(o, decimal.Decimal):
        return str(o)


@app.middleware('all')
def my_middleware(event, get_response):
    if '{proxy+}' in event.path:
        event.context['resourcePath'] = event.path.replace(
            '{proxy+}', event.uri_params['proxy'])
        event.path = event.path.replace('{proxy+}', event.uri_params['proxy'])
    response = get_response(event)
    response.body = json.loads(json.dumps(response.body, default=default_serializer))
    print(f"Response.body:- {response.body}")
    return response

@app.route('/sendemail', methods=['POST'], cors=True, content_types=['application/json'])
def send_email():
    request = app.current_request
    # Get the recipient Email ID from the request body
    data = request.json_body
    recipient = data.get('recipient')
    
    try:
        # Send the email
        response = sesClient.send_email(
            Source="dhrusha55prajapati@gmail.com",
            Destination={
                "ToAddresses": [recipient]
            },
            Message={
                "Subject": {
                    "Data": "Test Email"
                },
                "Body": {
                    "Text": {
                        "Data": "This email is for testing purpose"
                    }
                }
            }
        )

        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Email sent successfully!", "Response": response}),
        }
    
    except Exception as e:
        # Handle other errors
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Unexpected error occurred", "error": str(e)}),
        }