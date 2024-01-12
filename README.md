<h1 align="center">
    Tracking 2024
</h1>

## 👩‍💻 Local Development Quick start

### Dependencies

1. *[Install Docker Desktop](https://docs.docker.com/get-docker/).* 
    Docker desktop must be running for the development commands to work.
1. *[Configure AWS Credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)* 
    to access data and retreive secrets.

### Run project

```sh
docker compose up
```

The command `docker compose up` will start both the database (at port `5432`) and the website 
(at port `8000`).


### Ingest Tracking Database

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


## Run website only

```sh
docker compose up website
```

## Run database only

```sh
docker compose up database
```


# Sample Project Readme Template

<h1 align="center">
  Project Name
</h1>

## 📈 Analytics

- [Plausible Dashboard](#)
- [Google Search Console](#)
- [Google Analytics](#)

## 🚀 Deployment Status

| Branch  | CI/CD Status                      | Url                                         |
| ------- | --------------------------------- | ------------------------------------------- |
| Prod    | [Create CI/CD Badges in CircleCI] | [prod-projectname.talusanalytics.com](#)    |
| Staging | [Create CI/CD Badges in CircleCI] | [staging-projectname.talusanalytics.com](#) |
| Review  | [Create CI/CD Badges in CircleCI] | [review-projectname.talusanalytics.com](#)  |
| Dev     | [Create CI/CD Badges in CircleCI] | [dev-projectname.talusanalytics.com](#)     |

Automated deployment schedule: all data are ingested to `Staging` weekly.

## 📄 Ingest Latest Data from Airtable

1. Click the "CI/CD Status" badge above next to the site where you want to update data
2. Click "Trigger Pipeline" button on the top right section of that page.

## 👩‍💻 Local Development Quick start

1. [Install](https://bit.dev/docs/getting-started/installing-bit/installing-bit) & [log in](https://bit.dev/reference/reference/cli-reference/#login) to Bit

2. Install dependencies

```
yarn
```

3. Start development server

```
yarn start
```

## 🖥 Deployment Infrastructure

All Biosecurity Central Infrastructure is managed using the CloudFormation template within
the `/CloudFormation/` directory. All changes to hosting, domain names, alternate domain
names, and access control must be made in the template and deployed using the update script.

Infrastructure updates must be made with care as they can cause site downtime.

Remember to update site passwords before running deployment command, and do not commit site passwords to git.
