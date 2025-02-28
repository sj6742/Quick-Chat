import express from 'express';
import multer from "multer";
import {protectRoute} from '../Middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../Controllers/message.controllers.js';


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/user', protectRoute, getUsersForSidebar); 
router.get('/:id', protectRoute, getMessages);

router.post('/send/:id', protectRoute, sendMessage);
export  default router;     

