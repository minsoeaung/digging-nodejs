import {Router} from "express";
import controllers from './item.controllers.js'

const router = Router();

// /api/item
router
    .route('/')
    .get(controllers.getOne)
    .post(controllers.createOne)

// /api/item/:id
router
    .route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

export default router
