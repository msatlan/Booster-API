import express from 'express';
import helmet from 'helmet';

export const responseHeaderConfig = (app: express.Application) => {
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'", 'https'],
                // whitelist allowed pages in scriptSrc array from which scripts can be used (jQuery i.e.)
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                imgSrc: ["'self'", 'https', 'data:'],
                fontSrc: ["'self'", 'https', 'https://fonts.gstatic.com', 'data:'],
                connectSrc: ["'self'", 'https'],
                reportUri: '/cspviolation',
            },
        })
    );
};
