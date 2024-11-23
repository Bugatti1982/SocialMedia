import { Router } from 'express';
import UserRouter from './UserRoutes.js';
import ThoughtRouter from './ThoughtRoutes.js';
const router = Router();
router.use('/users', UserRouter);
router.use('/thoughts', ThoughtRouter);
export default router;
