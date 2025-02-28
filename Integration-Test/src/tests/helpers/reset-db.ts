
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteDB = async () => {
    await prisma.request.deleteMany()
}
