import { Router } from 'express';
import { helloRouter } from './hello';
import { inputRouter } from './input';
import weevilRouter from './weevils';
const v1Routes = Router();

v1Routes.use('/hello', helloRouter);
v1Routes.use('/input', inputRouter);
v1Routes.use('/weevils', weevilRouter);

export { v1Routes };
