# csvdata
This basic application which read the data from CSV file and upload it to S3

Once the file is uploaded to s3 lambda will be trigger automatically and that row by row that data is converted to JSON and store into DynamoDB.

Once the data is available into DynamoDB the application provide fetchData API from which you can see all the records of uploaded student from that you can select any of the email address of student and you can send email to them from sendEmail API
