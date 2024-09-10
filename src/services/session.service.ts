import { Session } from '../database/models/session.model';
import { SessionRepository } from '../database/repositories/session.repository';

export class SessionService {
   constructor(private sessionRepository: SessionRepository) {} // eslint-disable-line

   public async create(userId: number, username: string): Promise<Session> {
      const newSession = await this.sessionRepository.create(userId, username);
      return newSession;
   }

   public async findOne(sessionId: string): Promise<Session | null> {
      const session = await this.sessionRepository.findOne(sessionId);
      return session;
   }

   public async delete(userId: number) {
      const sessionsDeleted = await this.sessionRepository.delete(userId);
      return sessionsDeleted;
   }
}
