import { Request } from 'express';

export type BodyRequest<T> = Request<{ [k: string]: string }, unknown, T>;
export type QueryRequest<T> = Request<unknown, unknown, unknown, T>;
