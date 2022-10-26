# headerzilla-server
Header Generator Key

## Introduction
headerzilla is a header KEY retrieval and generation service. With it, it is possible to obtain headers from any website on your server to be consumed by your Scrapping and render-server services.

## Usage

To use the service, just clone this repository on your production server and run the command:

```bash
npm start
```

>- NOTE: This service uses NineJs to run the request from the destination server.

After uploading the server, send a ``post`` to the ``/serverkey`` route with the body parameters:

- ``url``: Url that will be pointed to the request.
- ``expected``: Header parameter expected in the request.


### Dev

Victor Ratts <br>
``@VictorRatts``