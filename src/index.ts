import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Carolina Aguera",
      email: "carolaguerabr@gmail.com",
      groups: {
        create: {
          title: "Grupo-1"
        }
      }
    }
  })
}
main();