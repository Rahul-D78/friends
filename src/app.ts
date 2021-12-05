import express from 'express';
import { createConnection } from 'typeorm';
import { User } from './models/user';
import { allRoutes } from './controller/allRoutes';
const app = express();

app.use(allRoutes)

const PORT = process.env.PORT || 3000;

async function start() {
    await createConnection({
        type: 'postgres',
        username: 'demo',
        password: 'pass',
        database: 'demo',
        synchronize: true,
        entities: [User],
        logging: true,
        logger: 'advanced-console'
    })
    app.listen(PORT, () => console.log(`server is listening on port 3000`))
}

start()