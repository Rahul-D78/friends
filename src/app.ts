import express from 'express';
import { allRoutes } from './controller/allRoutes';
const app = express();

app.use(allRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listening on port 3000`))