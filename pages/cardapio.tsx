/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GHGbYHHTINB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import prisma from "@/lib/prisma"
import Page from "@/components/page"
import { BentoGrid, BentoGridItem } from "@/components/bento-grid"

export default function Cardapio({ products }: { products: Product[] }) {

    console.log(products)
    return (
        <Page>
            <BentoGrid>
                <BentoGridItem variant="card">

                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle>Montar Cardápio Personalizado</CardTitle>
                            <CardDescription>Crie um cardápio personalizado de acordo com suas preferências.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Selecione os itens do seu cardápio:</Label>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="breakfast" />
                                            <Label htmlFor="breakfast">Café da manhã</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Salvar Cardápio
                            </Button>
                        </CardFooter>
                    </Card>
                </BentoGridItem>
            </BentoGrid>
        </Page>
    )
}


export async function getServerSideProps() {

    const products = await prisma.product.findMany()

    return {
        props: {
            products,
        },
    }
}