import { Router } from 'express';
import packageJson from '../../package.json';

export const baseRoute = Router();

baseRoute.get('/', (_, res) => {
   const { author, description, name } = packageJson;

   return res.status(200).json({
      author,
      name,
      description,
   });
});
