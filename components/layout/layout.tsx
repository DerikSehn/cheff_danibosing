import { Contact, GemIcon, Home, Info, Projector, ShoppingBag, User, Workflow } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Footer } from '../ui/footer'
import { FloatingNavBar } from '../ui/scroll/floating-nav-bar'
import AdminLayout from './admin-layout'



const navItems = [
    { name: "Início", link: "/", icon: <Home /> },
    { name: "Empresa", link: "/about", icon: <Info /> },
    { name: "Contato", link: "/contact", icon: <Contact /> },
    { name: "Serviços", link: "/services", icon: <GemIcon /> },
]


export const Layout = ({ children }: any) => {


    const router = useRouter()
    const isAdmin = router.pathname.startsWith("/admin")

    const session = useSession()
    if (session?.status === 'unauthenticated' && isAdmin) signOut()

    return (
        router.pathname.startsWith("/auth") ? <>{children}</> :
            isAdmin ?
                <AdminLayout backgroundImage='/background/hero.jpeg'>
                    {children}
                </AdminLayout>
                : <>
                    <FloatingNavBar navItems={navItems} />
                    <div>{children}</div>
                    <Footer />
                </>
    )
}
