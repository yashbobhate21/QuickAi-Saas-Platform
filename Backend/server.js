import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())
app.get('/',(req,res) => res.send('server is running'))
app.use(requireAuth())

app.use('/api/ai',aiRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log('server is running on port', PORT)
})