# Test singree


Test fot singree

## Installation

```bash
$ git clone https://github.com/dgladovich/singree_test.git
$ sudo apt-get install posgresql redis-server
$ sudo -u postgres createuser blog_user
$ sudo -u postgres createdb blog
$ sudo -u postgres psql
  psql=# alter user blog_user with password 'lovesaveworld';
  psql=# grant all privileges on database blog to blog_user ;
$ sudo npm install -g sequelize-cli
$ npm install
$ sequelize db:migrate
$ npm start
```

# Authorization

Create user in table users with attributes "last_name" - %username%, "password" - %password%. 

To authorize, use in Postman request POST to http://localhost:3000/login with body {"username": %username%, "password": %password%}