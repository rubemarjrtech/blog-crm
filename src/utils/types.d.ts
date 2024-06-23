import * as http from 'http';
import { DecodedUser } from '../services/auth.service';

declare module 'express-serve-static-core' {
   interface Request extends http.IncomingMessage, Express.Request {
      decoded?: DecodedUser;
   }
}
