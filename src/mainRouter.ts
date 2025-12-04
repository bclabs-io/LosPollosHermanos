import express from 'express';
import lRouter from './location.ts'
import eRouter from './employee.ts'
const mainRouter = express.Router();
mainRouter.use('/location',lRouter);
mainRouter.use('/employee', eRouter);
export default mainRouter;