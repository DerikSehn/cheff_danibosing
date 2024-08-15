import { motion, Variants } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";


const liVariants = {
}

const itemVariants = {
    initial: { width: 0, opacity: 0, paddingLeft: 0 },
    animate: { width: '100%', opacity: 1, paddingLeft: 16 },
}

const iconVariants = {
    initial: { scale: 1.4 },
    animate: { scale: 1 },
}

interface SidebarLink {
    title: string;
    items: SidebarItem[];
}

interface SidebarItem {
    href: string;
    name: string;
    icon?: React.ReactNode;
}

const getLink = async (href: string) => {

    if (href === 'logout') {
        await signOut({ callbackUrl: "/api/auth/logout", });

    }
}

const SidebarLinks = ({ links, variants = { liVariants, itemVariants, iconVariants } }: { links: SidebarLink[], variants?: { liVariants: Variants, itemVariants: Variants, iconVariants: Variants } }) => {
    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="animate"
            className="h-full w-full flex flex-col space-y-6 p-2"
            transition={{ type: 'inertia', duration: 0.2 }}
        >
            {links.map(({ title, items }, index) => (
                <ul key={`${title}-${index}`} className='p-2 flex flex-col space-y-px bg-white-600  border-white-200 text-neutral-500 rounded-xl '>
                    <small
                        className="opacity-0 group-hover/sidebar:opacity-80 duration-200 transition-opacity text-nowrap whitespace-nowrap text-md font-medium"
                    >
                        {title}
                    </small>
                    <motion.li
                        variants={variants.liVariants}
                        className=' flex flex-col'
                    >
                        {items.map(({ href, name, icon }, index) => (
                            <Link key={index} href={href !== 'logout' ? href : '/'} onClick={() => getLink(href)} className='flex justify-center w-full items-center content-center hover:bg-white-800 p-2'>
                                <motion.div
                                    variants={variants.iconVariants}
                                    className='text-black-600'>
                                    {icon}
                                </motion.div>
                                <motion.div
                                    variants={variants.itemVariants}
                                    className='text-black-600 whitespace-nowrap overflow-hidden'
                                >
                                    {name}
                                </motion.div>
                            </Link>
                        ))}
                    </motion.li>
                </ul>
            ))}
        </motion.div>
    );
};

export default SidebarLinks;
