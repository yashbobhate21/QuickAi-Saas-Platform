import express from 'express';
import { auth } from '../middleware/auth.js';
import { getUserCreations} from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations',auth,getUserCreations);

export default userRouter;