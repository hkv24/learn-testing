import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';

export const prismaClient = mockDeep<PrismaClient>();
// used P not p bcz. we want to mock object of this class PrismaClient