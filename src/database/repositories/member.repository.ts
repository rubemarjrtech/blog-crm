import { appDataSource } from '../../data-source';
import { Member } from '../models/member.model';

export const memberRepository = appDataSource.getRepository(Member);
