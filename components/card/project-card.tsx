import Image from "next/image";
import { motion } from "framer-motion";
import { ModelWithImages } from "@/prisma/prisma-utils";
import { Project } from "@prisma/client";
import { cn } from "@/lib/utils";

const cardVariants = {
  initial: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
    }
  },
  animate: {
    scale: 1.1,
    rotate: 2,
  },
};

export const ProjectCard = ({ item, className }: { item: ModelWithImages<Project>, className?: string }) => {


  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="animate"
      whileTap={{
        scale: 0.99
      }}
      className={cn("grid md:grid-cols-2 border-t justify-center relative overflow-hidden rounded-lg bg-white-200/50 hover:bg-white-50 transition-colors  dark:bg-gray-800",
        className
      )}>
      <div className="p-6">
        <div>
          <h4 className="font-semibold  line-clamp-2">{item?.title}</h4>
        </div>
        <p className="text-gray-500 dark:text-gray-400 line-clamp-4">
          {item.description}
        </p>
      </div>
      {item?.images ?
        <motion.div className="relative rounded-t-3xl w-full h-full"
          variants={cardVariants} >

          <Image
            alt={`project${item.title}`}
            fill
            src={item?.images[0]?.url}
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
          />
        </motion.div>
        : null}

    </motion.div>
  )
}
