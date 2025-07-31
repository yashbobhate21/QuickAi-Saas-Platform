import express from 'express';
import { auth } from '../middleware/auth.js';
import { getUserCreations, toggleLikeCreation } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations',auth,getUserCreations);
userRouter.post('/toggle-like-creation',auth,toggleLikeCreation);

export default userRouter;