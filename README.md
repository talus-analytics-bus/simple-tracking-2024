<h1 align="center">
    Tracking 2024
</h1>

## 👩‍💻 Local Development Quick start

### Dependencies

**[Install Docker Desktop](https://docs.docker.com/get-docker/).**
Docker desktop must be running for the development commands to work.

### Run project

```sh
docker compose up
```

This command starts the database (at port `5432`) and the website 
(at [http://localhost:8000/](http://localhost:8000/)).

If **[AWS Credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)** 
are not configured, you will need to provide an Airtable token and Mapbox API key:

```sh
GATSBY_MAPBOX_API_KEY='XXXX' AIRTABLE_API_KEY='XXXX' docker compose up
```

You can [create an airtable token](https://airtable.com/create/tokens) in the 
developers settings in airtable.

</br>
</br>

## Ingest Tracking Database

While the database is running:

```sh
sh/restore-db
```

#### AWS CLI not found, please download database dump manually.
> If you don't have AWS CLI or credentials, you will get a message saying
"AWS CLI not found, please download database dump manually." In this case, 
download the tracking database dump file, name it `dump-tracking`, and 
place it in the `./data/dumps/` directory.

#### Port 5432 In Use
> *You may get an error saying the port is already in use 
if your system is already running `postgres`, if you 
get that message, shut down your instance of 
`postgres` first*


### Connect to Tracking DB

To connect using a graphical database management tool 
(e.g. dBeaver, pgAdmin):

```
host:      localhost
database:  tracking
username:  postgres
password:  1234
```

### Graphiql query interface

While containers are running, visit:

[http://localhost:8000/__graphql](http://localhost:8000/__graphql)

