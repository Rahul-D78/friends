import { Router } from 'express';
const route = Router();

route.get('/', (req, res) => {
    res.send('HI Home')
})

route.get('/demo', (req, res) => {
    res.send('HI demo')
})

export const userRoute = route;