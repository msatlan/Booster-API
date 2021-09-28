# Booster-API

-   Booster REST API in Node JS and typescript

-   Connects to local MongoDb on url: 'mongodb://localhost:27017/boosterDb'

-   Used npm packages:
    1. bcrypt - password encryption
    2. connect-mongo - used for session persistance in db
    3. cors - allow cros-origin-requests
    4. express - node js framework
    5. express-session - session handler for express
    6. helmet - basic security
    7. jsonwebtoken - user authorization
    8. migrate-mongo - db upgrade package (currently unused)
    9. moment - dateTime lib for js (unused atm)
    10. mongoose - mongoDb orm
    11. winston - logger utility
    12. nodemon - run and debug app in dev environment without manual restarting

-   npm scripts:
    - install dependecies: npm i   
    - start with: npm run start:dev

    -   npm script should be created to import vehicles to it's collection in database

-   project structure (layers)
    - common - shared functionality(helpers, etc)
    - model - database and other models
    - controller - contains endpoints
    - service - handles any logic before/after queries to database are made
    - repository - makes db queries

    -   all classes have their interfaces and in some cases base classes which they extend(in case of shared implementation)

-   implemented features
    - user CRUD
    - user login/logout system
    - user password encryption
    - user authorization middleware - with json web token (with refresh tokens which are saved to db and are used to replace expired token)
        - token is sent in request Authorization header, Bearer *token
        - token returns to client in response body
    - session persistance in db
    - logging - in progress - implemented to base class, logging is divided based on error type and layer (ei. repositoryError, serviceInfo)
