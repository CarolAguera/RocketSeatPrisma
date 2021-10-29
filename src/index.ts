import { PrismaClient } from ".prisma/client";
import express from 'express'

const prisma = new PrismaClient();

const app = express()

app.get('/user', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/group', async (req, res) => {
  const posts = await prisma.group.findMany()
  res.json(posts)
})

//Quando quer fazer uma consulta específica
// app.get('/groups', async (req, res) => {
//   const posts = await prisma.group.findMany({
//     where: { title: 'Grupo-2' },
//     include: { members: true }
//   })
//   res.json(posts)
// })

app.get(`/group/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.group.findFirst({
    where: { id: Number(id) },
  })
  res.json(post)
})

//Cria um usuário novo

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      name: "Teste01",
      email: "teste01@gmail.com",
      groups: {
        create: {
          title: "Grupo-Teste"
        }
      }
    },
  })
  res.json(result)
})

app.post(`/group`, async (req, res) => {
  const { title } = req.body
  const result = await prisma.group.create({
    data: {
      title
    },
  })
  res.json(result)
})


app.put('/group/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.group.update({
    where: { id: Number(id) },
    data: { title: 'Sei la' },
  })
  res.json(post)
})

app.delete(`/group/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.group.delete({
    where: { id: Number(id) },
  })
  res.json(post)
})

app.listen(4000, () =>
  console.log(`🚀 Executando na porta => http://localhost:4000`),
)