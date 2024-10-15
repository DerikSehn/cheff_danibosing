import { cn } from "@/lib/utils";
import { MenuCategory, MenuItem } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Dot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export const MenuCategoryCard = ({ item, className }: { item: MenuCategory & { items: MenuItem[] }, className?: string }) => {

    return (
        <Card className={cn("w-full max-w-2xl", className)}>
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {item?.items?.map((variation, index) =>
                            <TableRow key={index} className={cn("cursor-pointer hover:bg-white-50")}>
                                <TableCell>{variation.title}</TableCell>
                                <TableCell> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(variation.price)}</TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
