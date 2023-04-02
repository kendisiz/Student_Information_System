# Student Information System Project

This project is a student information system for universities.

## Tools

[Git](https://git-scm.com/) is used for version management and [GitHub](https://github.com/) is used as online repository. [Docker](https://www.docker.com/) container technology is used for SQL Server and web servers.

## Database

[Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/) is used as database management system.

## Backend

[ExpressJS](https://expressjs.com/) framework is used on [NodeJS](https://nodejs.org/en) environment as backend.

## Frontend

[NextJS](https://nextjs.org/) and [React](https://react.dev/) is used as frontend. Tests are done with [Postman Client](https://www.postman.com/).

## API

RESTful API is used between backend and frontend.

## Database Design

Database design's Crowd's Foot diagram:

![Crowds Foot Diagram](./CrowsFoot.drawio.png)

## How to Start Application

- Create a docker network first: (https://www.tutorialworks.com/container-networking/)

```
docker network create my-network
```

- Start docker container of SQL Server:

```
docker run --rm --name my-mssqlserver -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=yourStrong(!)Password' -p 1434:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

```
docker run --network my-network --name my-mssqlserver --rm -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=yourStrong(!)Password' -e 'MSSQL_PID=Express' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

- Clone this repository and start the web server. Dependencies are git, nodejs and npm.

```
git clone https://github.com/kendisiz/Student_Information_System.git
cd Student_Information_System/backend/ExpressJS
npm start
```

- Or instead of cloning, start docker container of the web server too.

```
docker build . -t myusername/myexpressapp
docker run --rm -it --network my-network --name myexpressapp myusername/myexpressapp
```

- Postman Collection:

(https://api.postman.com/collections/26211311-167174af-68a3-4c2c-914d-2ae3840a169a?access_key=PMAT-01GX1REEPKC09Y832Q25Q65R21)
