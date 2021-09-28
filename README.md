# Booster-API

-   Booster REST API in Node JS and typescript

-   Connects to local MongoDb on url: 'mongodb://localhost:27017/boosterDb'

-   Used npm packages:
    bcrypt - user password encryption
    connect-mongo - used for session persistance in db
    cors - allow cros-origin-requests
    express - node js framework
    express-session - session handler for express
    helmet - basic security
    jsonwebtoken - user authorization
    migrate-mongo - db upgrade package (currently unused)
    moment - dateTime lib for js (unused atm)
    mongoose - mongoDb orm
    winston - logger utility
    nodemon - run and debug app in dev environment without manual restarting

-   npm scripts:
    start with: npm run start:dev

    -   npm script should be created to import vehicles to it's collection in database

-   project structure (layers)
    common - shared functionality(helpers, etc)
    model - database and other models
    controller - contains endpoints
    service - handles any logic before/after queries to database are made
    repository - makes db queries

    -   all classes have their interfaces and in some cases base classes which they extend(in case of shared implementation)

-   implemented features
    user CRUD
    user login/logout system
    user password encryption
    user authorization middleware with json web token (with refresh tokens which are saved to db and are used to replace expired token)
    session persistance in db
    logging - in progress - implemented to base class, logging is divided based on error type and layer (ei. repositoryError, serviceInfo)
