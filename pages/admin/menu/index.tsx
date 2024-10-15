import Card from "@/components/card/card"
import CategoryCard from "@/components/card/category-card"
import { MenuCategoryCard } from "@/components/card/menu-category-card"
import List from "@/components/list/list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from "@/lib/prisma"
import { Category, MenuCategory } from "@prisma/client"

export async function getServerSideProps() {


    const menuCategories = await prisma.menuCategory.findMany({
        include: {
            items: true,
        }
    })

    return { props: { menuCategories } }
}

export default function AdminMenuCategories({ menuCategories }: { menuCategories: MenuCategory[], categories: Category[] }) {

    return (
        <Card className="w-full h-full grid md:grid-cols-2 gap-4">
            <List items={menuCategories} tableName={'menuCategory'}
                className=' grid md:grid-cols-2 lg:grid-cols-4 gap-3 bg-white shadow-lg rounded-lg p-4'
                itemsPerPage={18}
                enableEditor
                header={{ title: 'Produtos' }}
            >
                {/* @ts-ignore */}
                <MenuCategoryCard className="" />
            </List>

        </Card>

    )
}
