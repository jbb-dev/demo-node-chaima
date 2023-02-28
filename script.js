const  { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function main() {
//     const user = await prisma.user.create({
//         data: {
//           name: 'Alice',
//           email: 'alice@prisma.io',
//         },
//       })
      
//       console.log(user)

//       const user2 = await prisma.user.create({
//         data: {
//           name: 'Bob',
//           email: 'bob@prisma.io',
//         },
//       })
//       console.log(user2)
// }

async function main() {
    const users = await prisma.user.findMany({
        include: {
          posts: true,
        },
        // where: {
        //     id: 3
        // }
      })
    console.log(users)
}

const get_users = async (req, res) => {

  await prisma.user
  .findMany()
  .then(users => res.status(200).send(users))
  .catch(err => res.status(403).send({message: err.message}))

};

const create_user = async (req, res) => {

  const { name, email } = req.body;

  console.log('name => ', name, 'email => ', email)

  if (name == null || email == null)
  {
    return res.status(400).send('Des données sont manquantes');
  };

  await prisma.user
  .create({
      data: {
        name: name,
        email: email,
      },
  })
  .then(newUser => res.status(200).send(newUser))
  .catch(error => res.status(403).send({message: error.message}))

};



// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })


  module.exports = { get_users, create_user }