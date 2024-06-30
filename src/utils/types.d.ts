import * as http from 'http';
import { DecodedAdmin, DecodedUser } from '../services/auth.service';

declare module 'express-serve-static-core' {
   interface Request extends http.IncomingMessage, Express.Request {
      decodedUser?: DecodedUser;
      decodedAdmin?: DecodedAdmin;
   }
}
