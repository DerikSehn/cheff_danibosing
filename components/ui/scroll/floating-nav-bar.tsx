"use client";
import { Dropdown, Tab, Tabs, Trigger, TriggerWrapper } from "@/components/dropdown/dropdown-menu";
import { cn, generateWhatsAppLink } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";

/**
 * Represents a floating navigation bar component.
 *
 * @component
 * @example
 * ```tsx
 * <FloatingNavBar
 *    navItems={[
 *      { name: "Home", link: "/home", icon: <HomeIcon /> },
 *      { name: "About", link: "/about", icon: <AboutIcon /> },
 *      { name: "Contact", link: "/contact", icon: <ContactIcon /> },
 *    ]}
 *    className="navbar"
 * />
 * ```
 */
export const FloatingNavBar = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);


    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;
            setIsAtTop(scrollYProgress.get() < 0.05)
            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });
    return (

        <motion.div
            layout
            animate={{
                y: visible ? 0 : -200,
                /*                     opacity: visible ? 1 : 0, */

                transition: {
                    duration: 0.6,
                    type: 'just'
                },
            }}
            transition={{
                duration: 0.6,
                type: 'just',
                bounce: 0.25,
                damping: 30
            }}
            style={{
                textShadow: '1px 1px 1px  gray'
            }}
            className={cn(
                "flex p-8 pb-2 uppercase font-montserrat tracking-widest fixed top-0 inset-x-0 md:mx-auto transition-colors duration-500 bg-black/50 text-white   z-[5000] items-between justify-between md:space-x-4",
                isAtTop ? " md:bg-transparent  " : "",
                className,
            )}
        >
            <div className="hidden md:block relative max-w-[200px]  h-[72px] w-1/2">
                <Image src="/logo.png" alt="logo" fill className="object-contain object-center" />
            </div>
            <div className="hidden sm:flex justify-end gap-6">
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}

                        className={cn(
                            "relative font-bold flex flex-col justify-center items-center space-x-1 group/link px-2",
                            "transition-all duration-500 hover:text-primary-800 "
                        )}
                    >
                        <motion.span className="absolute inset-y-0 transition-all duration-500 w-0 group-hover/link:w-full border-t-2 border-primary-600   group-hover/link:bg-gradient-to-b from-primary-300/10" />
                        <motion.span
                            animate={{
                                fontWeight: isAtTop ? 500 : 600,
                                transition: {
                                    duration: 0.3,
                                    type: 'just'
                                },
                            }}
                            className={cn("hidden sm:block")}>
                            {navItem.name}
                        </motion.span>
                    </Link>
                ))}



            </div>
            <Link href={'/cardapio'} target="_blank" className="flex items-center justify-center w-[200px]  ">
                <Button
                    variant={'swipe'}
                    className="text-md group transition-all bg-primary/10 w-full"
                >
                    Montar Cardápio
                </Button>
            </Link>
            <div className="flex sm:hidden h-20 w-full justify-center">

                <Dropdown className="w-full flex justify-center items-center">
                    <TriggerWrapper >
                        <Trigger className="">
                            <div className="relative  w-72 h-[80px] ">
                                {/* max width is 200px */}
                                <Image src="/logo-white.png" alt="logo" fill className="object-cover object-center" />
                                {/* <Logo className="dark:hidden block" /> */}
                            </div>
                        </Trigger>
                    </TriggerWrapper>
                    <Tabs>
                        <Tab>
                            <div className="flex gap-4 p-4 w-full h-full bg-primary-900 text-white-900 border-b border-white-900">
                                <div
                                    className={
                                        'text-white font-bold text-3xl flex items-end justify-start p-4 w-56 h-[200px] rounded-md bg-gradient-to-br [background-size:150%] from-primary-300   to-primary-400'
                                    }
                                >
                                    Cultura <br /> Verde
                                </div>
                                <div className={'flex flex-col  justify-between'}>
                                    {navItems.map((navItem, idx: number) => (
                                        <Link
                                            key={`link=${idx}`}
                                            href={navItem.link} className="flex items-center justify-start space-x-4 active:bg-primary-900/40 p-2 w-full rounded-lg">
                                            <h3 className={'dark:text-white text-primary-800'}>{navItem.icon}</h3>

                                            <p className={'text-white-900 text-xl '}>
                                                {navItem.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Dropdown>
            </div>
        </motion.div>
    );
}; 
