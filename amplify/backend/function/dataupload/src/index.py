import boto3
import os
from gql import Client
from gql.transport.requests import RequestsHTTPTransport
from requests_aws4auth import AWS4Auth
from gql import gql
import traceback
import csv
import uuid

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

def handler(event, context):
    # S3 details from event
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    object_key = event['Records'][0]['s3']['object']['key']
    gqlClient = create_graphql_client()
    # S3 client
    s3_client = boto3.client('s3')
    print('API key = ', os.environ['API_CSVDATA_GRAPHQLAPIENDPOINTOUTPUT'])
    print("gqlClient = ", gqlClient, "bucket_name = ", bucket_name, "object_key = ", object_key )
    try:
        # Read CSV from S3
        csv_object = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        csv_content = csv_object['Body'].read().decode('utf-8')

        # Parse CSV
        csv_reader = csv.DictReader(csv_content.splitlines())

        for row in csv_reader:
            query = gql(
            """
            mutation MyMutation($id: ID!,$date_of_birth: AWSDate, $email: String, $first_name: String, $gender: String, $last_name: String , $phone: String) {
            createStudentData(
                input: {date_of_birth: $date_of_birth, email: $email, first_name: $first_name, gender: $gender, id: $id, last_name: $last_name, phone: $phone}
            ) {
                date_of_birth
                email
                first_name
                gender
                id
                last_name
                phone
            }
            }
            """
            )

            params = {
                "id": str(uuid.uuid4()),
                "first_name": row["First Name"],
                "last_name": row["Last Name"],
                "date_of_birth": row["Date of birth"],
                "gender": row["Sex"],
                "email": row["Email"],
                "phone": row["Phone"]           
            }
            
            response = gqlClient.execute(query, variable_values=params)
            print("createStudentData :: ",response)


        return {
            "statusCode": 200,
            "body": "CSV processed and data added to GraphQL table."
        }

    except Exception as e:
        print(f"Error processing file: {traceback.format_exc()}")
        return {
            "statusCode": 500,
            "body": print(traceback.format_exc())
        }
