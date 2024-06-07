import { Request } from 'express';

export type BodyRequest<T> = Request<unknown, unknown, T>;
