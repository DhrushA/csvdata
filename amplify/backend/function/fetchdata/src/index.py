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
import csv
import uuid

app = Chalice(app_name="fetchData")

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
    print("response-------: ", response)
    return response

def create_graphql_client():
    # Common headers
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    # Set up AWS IAM-based authorization
    credentials = boto3.Session().get_credentials()
    service = "appsync"
    region = os.environ['REGION']
    awsauth = AWS4Auth(
        credentials.access_key,
        credentials.secret_key,
        region,
        service,
        session_token=credentials.token
    )

    # Create transport with IAM authorization
    transport = RequestsHTTPTransport(
        url=os.environ['API_CSVDATA_GRAPHQLAPIENDPOINTOUTPUT'],
        headers=headers,
        auth=awsauth
    )

    # Create and return GraphQL client
    client = Client(transport=transport, fetch_schema_from_transport=False)
    return client

@app.route('/fetchdata/studentdata', methods=['GET'], cors=True, content_types=['application/json'])
def generate_presigned_url():
    request = app.current_request
    gqlClient = create_graphql_client()
    # Get the filename and filetype from the request body
    try:

        # get group details from dynamoDB by passing userId 
        query = gql(
        """
            query MyQuery {
            listStudentData {
                items {
                first_name
                last_name
                email
                gender
                date_of_birth
                phone
                }
            }
            }
        """
        )

        params = {}
        
        studentDetails = gqlClient.execute(query, variable_values=params)
        print("accountRequestDetails :: ",studentDetails)
        return studentDetails
    
    except:
        traceback.print_exc()
        return {"mesaage":"failed" }