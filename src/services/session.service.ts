import { SessionRepository } from '../database/repositories/session.repository';

export class SessionService {
   constructor(private sessionRepository: SessionRepository) {} // eslint-disable-line

   public async create(userId: number, username: string) {
      const newSession = await this.sessionRepository.create(userId, username);
      return newSession;
   }

   public async findOne(sessionId: string) {
      const session = await this.sessionRepository.findOne(sessionId);
      return session;
   }
}
