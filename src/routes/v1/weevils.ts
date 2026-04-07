import { Router } from 'express';
import { getWeevil, searchWeevils, addWeevil } from "../../controllers//weevils";

const weevilRouter = Router();

weevilRouter.get('/search', searchWeevils);
weevilRouter.get('/:name', getWeevil);
weevilRouter.post('/', addWeevil);

export default weevilRouter;