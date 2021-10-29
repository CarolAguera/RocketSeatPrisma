import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const newUser = await prisma.user.create({
  //   data: {
  //     name: "Carolina Aguera",
  //     email: "carolaguerabr@gmail.com",
  //     groups: {
  //       create: {
  //         title: "Grupo-1"
  //       }
  //     }
  //   }
  // })
  // console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany({
    include: { groups: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}
main().catch((e) => console.error(e));