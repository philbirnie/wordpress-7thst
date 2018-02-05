# Wordpress Site

This repository contains the codebase for the website

## Author(s)

* **Phil Birnie** phil[at]7thstreeteweb.com
* **Sean Sefcik** sean[at]7thstreeteweb.com

## Setup

### First time
* Seeder database files can be placed in the /mysql directory before starting docker and these will automatically be imported into your database.

### Docker Integration
1.  After installing docker, you can run `docker-compose up` to re-constitute the site.
2.  Connect to the MySQL server directly from your host machine using:
    * Host: 127.0.0.1
    * User: root
    * Password: root


### Accessing Components

1. After starting docker, the Wordpress installation will be available at localhost:8000 (current version of WP wll be automatically installed into `cms`)


### Auto Deployments

All development shall be done on the dev branch.  Commits pushed to master will automatically deploy!


### Site Development

1. Site construction utilizes fabricator.  To build, run `gulp` within the fabricator folder. Here are a few options:
    `--dev`: Development with watching, browsersync, etc.
    `--nowp`: Don't launch the wordpress browserstack instance (helpful if you are just doing FE work or don't have docker running)
