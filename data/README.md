# How to access Tracking Database Dump

## Setup

Simple way to use Docker to run postgres:14 with the tracking 
database dump, and export the CSV files of data for the site.


1. `cd` to this (`/simple-tracking-2024/data/`) directory 
    (`cd data/` if starting at the root of the repository)
1. Make sure `Docker` is installed and running on your system.
    Docker is used to download and run a container using the
    version of posgresql which was used for the original 
    tracking project.
1. Start a postgres container: 
    ```zsh
    sh/start-db.sh
    ```
1. In a new terminal window, restore from the tracking database dump:
    ```sh
    sh/restore-db.sh
    ```
1. Run:
    ```bash
    sh/create-csvs.sh
    ```

### Errors

#### Port 5432 In Use

> *You may get an error saying the port is already in use 
if your system is already running `postgres`, if you 
get that message, shut down your instance of 
`postgres` first*

#### AWS CLI not found, please download database dump manually.

> If you don't have AWS CLI or credentials, download the tracking
database dump file, name it `dump-tracking`, and place it in the
`./dumps/` directory.

### Notes

After restoring the database, `sh/start-db.sh` will re-start
the database with all data from the previous session, so you
will not need to re-run `sh/restore-db.sh`. If you do re-run
`sh/restore-db.sh`, it will reset the database to match the 
tracking database dump. 

If the AWS cli is available and proper credentials are
provided, `sh/restore-db.sh` will download the tracking
database dump from s3 if the file is not already in the
`./dumps/` directory.

The `sh/create-csvs.sh` script will take each query in the 
`./queries/` directory, execute it, and send the output of
the SQL query to a CSV file in the `./csv/` directory.


## Development

### Connect

To connect using a graphical database management tool 
(e.g. dBeaver, pgAdmin):

```
host:      localhost
database:  tracking
username:  postgres
password:  1234
```

### Watch `./queries/` for changes

If you have `fswatch` installed on your system, you can
make the CSV files automatically regenerate each time you
add or edit a query file by running the command: 
```sh
fswatch -o path | xargs -n1 -I{} program
```
