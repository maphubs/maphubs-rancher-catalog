# MapHubs Web Application

## Requirements

* Auth0 Account (free tier)
* ElasticSearch 5 cluster (configured seperately)
* Sentry Account (optional)
* MailGun Account 
* Mapzen API key (free tier)
* Bing API key (if using Bing basemap layer)

## Configuration

### Environment Variables

Provide all required values.

Many require generating new passwords/secret keys.

### Volumes

In this config, volumes are mounted to a folder on the host, the root path must be specified in the config options.

## Starting the Stack

The stack will be stopped by default.

1. Start the database service (db) and wait for it to complete the init process (see logs)
2. Start the web service and wait for it to complete the init process (see logs)
3. Start the tile and manet services