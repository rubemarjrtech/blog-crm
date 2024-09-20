import { appDataSource } from '../../data-source';
import { Session } from '../models/session.model';

export class SessionRepository {
   constructor(private sessionModel = appDataSource.getRepository(Session)) {} // eslint-disable-line

   public async create(
      sessionOwnerId: number,
      username: string,
   ): Promise<Session> {
      const session = this.sessionModel.create({ sessionOwnerId, username });
      const newSession = await this.sessionModel.save(session);
      return newSession;
   }

   public async findOne(sessionId: string): Promise<Session | null> {
      const session = await this.sessionModel.findOneBy({ id: sessionId });
      return session;
   }

   public async delete(
      sessionOwnerId: number,
      username: string,
   ): Promise<void> {
      await this.sessionModel
         .createQueryBuilder('session')
         .delete()
         .where('sessionOwnerId = :sessionOwnerId', { sessionOwnerId })
         .andWhere('username = :username', { username })
         .execute();
   }
}
