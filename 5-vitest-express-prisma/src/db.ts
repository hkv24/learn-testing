import { PrismaClient } from "@prisma/client";
export const prismaClient = new PrismaClient();
// this (named exports) worked bcz. In vitest, mocking works more seamlessly with named exports
// export default prismaClient;


// Don't export this


// Export something like this for tests
// export const prismaClient2 = {
//     sum: {
//         create: () => {

//         }
//     }
// }