
import { pgTable,
         integer,
         timestamp,
         varchar, 
         doublePrecision} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { createInsertSchema } from "drizzle-zod";
import { productsTable } from "./productsSchema";
import {z} from "zod";



 export const ordersTable = pgTable('orders', {
    id: integer().primaryKey(),
    createdAt: timestamp().notNull().defaultNow(),
    status: varchar({length: 50}).notNull().default('New'),
    userId: integer().references(() => usersTable.id).notNull()
 });

 export const orderItemsTable =  pgTable('order_items', {
    id: integer().primaryKey(),
    orderId: integer().references(()=>ordersTable.id).notNull(),
    productId: integer().references(()=>productsTable.id).notNull(),
    quantity: integer().notNull(),
    price: doublePrecision().notNull()
 });
 
 export const insertOrderSchema = createInsertSchema(ordersTable).omit({
   id: true,
    userId:true,
    status: true,
    createdAt: true, 
 });

export const insertOrdersItemsSchema =  createInsertSchema(orderItemsTable).omit({
   orderId:true
});

 export const insertOrdersWithItemsSchema = z.object({
   order: insertOrderSchema,
   items: z.array(insertOrdersItemsSchema),

 });

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
   status: true,
})
  