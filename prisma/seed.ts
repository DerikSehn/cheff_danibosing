//seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  if (projects.length === 0) {
    await prisma.project.createMany({
      data: [  ],
    });
  }


  const testimonials = await prisma.testimonial.findMany();
  if (testimonials.length === 0) {
    const images = await prisma.image.createManyAndReturn({
      data: [ ],
    });

    await prisma.testimonial.createMany({
      data: [],
    });
  }

  const users = await prisma.user.findMany();
  if (users.length === 0) {
    await prisma.user.createMany({
      data: [
        {
          name: "João",
          email: "joao@culturaverde.com.br",
          password: await hash("joao" + "test", 12),
          emailVerified: new Date(),
        },
        {
          name: "Maria",
          email: "maria@culturaverde.com.br",
          password: await hash("maria" + "test", 12),
          emailVerified: new Date(),
        },
      ],
    });
  }
  const comments = await prisma.comment.findMany();
  if (comments.length === 0) {
    try {
      await prisma.comment.createMany({
        skipDuplicates: true,
        data: [],
      });
      const sections = await prisma.section.findMany();
      if (sections.length === 0) {
        await prisma.section.createMany({
          data: [  ],
        });
      }
    } catch (e) {}
  }
}

/* run  with prisma db seed */

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
