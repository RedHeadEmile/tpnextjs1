"use client";

import {useForm} from '@mantine/form';
import {Checkbox, TextInput} from "@mantine/core";
import {MagnifyingGlass} from "@phosphor-icons/react";
import {ProductsCategoryData} from "tp-kit/types";
import {Button} from "tp-kit/components";
import {ProductFilterResult} from "@/types";
import {useState} from "react";
import {filterProducts} from "@/utils/filter-products";

interface ProductFiltersProps
{
    categories: ProductsCategoryData[],
    onChanges: (filters: ProductFilterResult) => void
}

export default function ProductFilters({ categories, onChanges }: ProductFiltersProps) {
    const form = useForm({
        initialValues: {
            search: "",
            categoriesSlug: []
        },
    });

    const [productByCategory, setProductByCategory] = useState(categories.map(category => { return { id: category.id, amount: category.products.length }; }));

    // C'est moche mais tant tant que ça ne produit pas d'appel API, ça ira
    const middleOnChanges = (values: {search: string, categoriesSlug: string[]}) => {
        const filtered = filterProducts(categories, values);
        setProductByCategory(filtered.map(category => { return { id: category.id, amount: category.products.length }; }));
        onChanges(values);
    }

    return (
        <form onSubmit={form.onSubmit((values) => { middleOnChanges(values); })} className={"flex flex-col gap-3"}>
            <TextInput
                id={"searchInput"}
                placeholder={"Rechercher une boisson"}
                icon={<MagnifyingGlass />}
                {...form.getInputProps('search')}
                />
            <Checkbox.Group
                className={"flex flex-col gap-2"}
                {...form.getInputProps('categoriesSlug')}>
                { categories.map(category =>
                    <Checkbox key={category.id} id={"checkboxno" + category.id.toString()} value={category.slug} label={category.name + " (" + (productByCategory.find(c => c.id === category.id)?.amount ?? 0) + ")"} />
                ) }
            </Checkbox.Group>
            <Button type={"submit"} variant={"primary"}>Filtrer</Button>
        </form>
    )
}