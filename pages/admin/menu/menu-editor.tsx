import { z } from "zod";
import React from "react";
import { useMutation } from '@tanstack/react-query';
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { MenuCategory } from "@prisma/client";
import { handleApiRequest } from "../../api/protected/crud";

const MenuItemSchema = z.object({
    title: z.string().min(1, "Nome é obrigatório").describe('Título'),
    description: z.string().optional().nullable().describe('Descrição'),
    price: z.number().min(0, "Preço deve ser positivo").describe('Preço (R$)'),
});

const MenuCategorySchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    items: z.array(MenuItemSchema).describe("Itens do menu/cardápio"),
});

interface MenuItem {
    id?: string;
    title: string;
    description?: string;
    price: number;
}

interface MenuEditorProps {
    item?: MenuItem;
    method: 'create' | 'update';
    onSubmit: (data: MenuCategory) => void;
    onClose: (data: { item: MenuItem, method: string }) => void;
}

const MenuEditor: React.FC<MenuEditorProps> = ({ item, method, onClose }) => {

    const mutation = useMutation({
        mutationFn: (data: typeof MenuCategorySchema._output) => handleApiRequest(data, 'menuCategory', method),
        onSuccess: (data) => {
            onClose({ item: data, method });
        },
        onError: () => {
            console.error(`Erro ao ${method === 'create' ? 'criar' : 'atualizar'} item de menu.`);
        },
    });

    const handleSubmit = (data: typeof MenuCategorySchema._output) => {
        mutation.mutate(data);
    };

    return (
        <AutoForm formSchema={MenuCategorySchema}
            values={(item as any)}
            fieldConfig={{
                name: {
                    label: 'Nome',
                    description: 'Insira uma categoria para o seu menu',
                },
            }} onSubmit={handleSubmit}>
            <AutoFormSubmit >
                Salvar
            </AutoFormSubmit>
        </AutoForm>
    );
};

export default MenuEditor;