# DataPump
DataPump client to simulate sending data at some rate to a server or other consumer

DataPump is a Node/Express application.  Express provides a simple API to start, stop, and monitor the progress of the DataPump.

Set the port to listen on in the .env file.  Default is 4001.

After downloading run: 

npm install
gi
npm audit fix

To run:

npm start

START in Postman or similar with this GET request.

localhost:4001/start/1000

The 1000 means it will send a request every 1000 milliseconds.  Enter whatever value you like.

After starting it will return a response of

{
    "sourceName": "Source A",
    "tartgetURL": "//localhost:4100/add",
    "rate": 1000,
    "count": 0,
    "status": "running"
}

The targetURL is where it is sending requests to.  If there is nothing listening for this then you will receive ECONNREFUSED message

STOP in Postman or similar with this GET request

localhost:4001/stop

These are GET requests so that it is easy to use a browser too.


