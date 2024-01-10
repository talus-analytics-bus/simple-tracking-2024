# How to access Tracking Database Dump

Simple way to use Docker to run postgres:14 with the tracking 
database dump, and export the CSV files of data for the site.

_This is intended to be read-only, changes will not be 
persisted when the container restarts._


1. `cd` to this (`/simple-tracking-2024/data/`) directory 
    (`cd data/` if starting at the root of the repository)
1. Make sure `Docker` is installed and running on your system.
    Docker is used to download and run a container using the
    correct (previous) version of posgresql.
1. Start a postgres container: 
    ```zsh
    sh/start-db.sh
    ```
1. Place the tracking database dump in the `/dumps/` directory,
    and name it `dump-tracking`
1. Restore from the tracking database dump:
    ```sh
    sh/restore-db.sh
    ```
1. Run:
    ```bash
    sh/create-csvs.sh
    ```

The `sh/create-csvs.sh` script will take each query in the 
`./queries/` directory, execute it, and send the output of
the SQL query to a CSV file in the `./csv/` directory.

*You may get an error saying the port is already in use 
if your system is already running `postgres`, if you 
get that message, shut down your instance of 
`postgres` first*
