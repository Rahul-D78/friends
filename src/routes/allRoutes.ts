import { Router } from 'express';
import { userRoute } from './user';

const route = Router();

route.use('/friends', userRoute);

export const allRoutes = route;