# PostgreSQL setup
**IMPORTANT:** Make sure to run ```npm install``` for the installation of dependencies for Postgres and Sequelize.

Download PostgreSQL [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). Make sure to download version **10.XX**.

## Setup database 
This instructions are based in pgAdmin3 (similar with pgAdmin4).

### Create a new server
Make sure to setup the following properties: 

```
name: whatever you like
host: localhost
port: 5432 (it doesn't matter anyway)
maintenance_db: postgres
username: postgres
```

Click OK to create the new server.

### Create a new login role
In Login Roles create a new role.

Properties:
```
role_name: buggy_user
```

Role privileges, select the options: 
* Can Login
* Can create databases
* Can create roles
* Can initiate streaming replication and backups 

Press OK and continue.

### Create database
In Databases, create a new database named "buggy_db" and set the owner to "buggy_user".

Your all set! Create and drop tables as usual. In the folder `..\src\api\models` run the commands: 
```
# Create tables
$ node dataModels.js create

# Drop all tables
$ node dataModels.js drop
```

# Sequelize ORM
* [documentation](https://sequelize.org/v5/)
* [Getting started with Node, Express and Postgres using Sequelize](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)