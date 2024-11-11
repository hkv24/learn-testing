import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';
// __mocks__ folder is for deep mocking.

export const prismaClient = mockDeep<PrismaClient>();
// used P not p bcz. we want to mock object of this class PrismaClient