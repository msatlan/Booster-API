// TODO: security - strings should come from server's env variables
export const PORT = 9001;

export const MONGO = {
    url: 'mongodb://localhost:27017/boosterDb',
    configuration: {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
};
