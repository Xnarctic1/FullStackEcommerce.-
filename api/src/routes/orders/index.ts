import { Router } from 'express'; 
import { createOrder } from './ordersController.js';
import { validateData } from '../..//middlewares/validationMiddleware.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { insertOrdersWithItemsSchema } from '../../db/ordersSchema.js';


const router = Router(); 

router.post('/', verifyToken, validateData(insertOrdersWithItemsSchema),createOrder);

export default router;     