import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodRawShape } from 'zod';
import { AppError } from '../errors/validation.error';

export enum QueryType {
   BODY = 'body',
   QUERY = 'query',
}

export interface ValidationTypes {
   schema: ZodRawShape;
   type: QueryType;
}

export function validator(params: ValidationTypes) {
   return (req: Request, res: Response, next: NextFunction) => {
      const result = z.object(params.schema).safeParse(req[params.type]);

      if (!result.success) {
         const formattedErrorMessage = result.error.issues
            .map((error) => {
               return `Error on field ${error.path}: ${error.message}`;
            })
            .join('. ');

         const appError = new AppError(
            formattedErrorMessage,
            StatusCodes.UNPROCESSABLE_ENTITY,
         );

         return res.status(appError.code).json(appError.message);
      }

      req[params.type] = result.data;

      next();
   };
}
