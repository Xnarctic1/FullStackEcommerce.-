import { Router } from 'express'; 
import { createOrder, listOrders, getOrder, updateOrder } from './ordersController.js';
import { validateData } from '../..//middlewares/validationMiddleware.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { insertOrdersWithItemsSchema, updateOrderSchema } from '../../db/ordersSchema.js';


const router = Router(); 

router.post('/',
     verifyToken,
      validateData(insertOrdersWithItemsSchema),
      createOrder
    );
router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder)
export default router;     