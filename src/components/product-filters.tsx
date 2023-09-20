"use client";

import {useForm} from '@mantine/form';
import { Checkbox, TextInput} from "@mantine/core";
import {MagnifyingGlass} from "@phosphor-icons/react";
import {ProductsCategoryData} from "tp-kit/types";
import {Button} from "tp-kit/components";
import {ProductFilterResult} from "@/types";

interface ProductFiltersProps
{
    categories: ProductsCategoryData[],
    onChanges?: (filters: ProductFilterResult) => void
}

export default function ProductFilters({ categories, onChanges }: ProductFiltersProps) {
    const form = useForm({
        initialValues: {
            search: "",
            categoriesSlug: []
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => { onChanges!(values); })} className={"flex flex-col gap-3"}>
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
                    <Checkbox key={category.id} id={"checkboxno" + category.id.toString()} value={category.slug} label={category.name + " (" + category.products.length + ")"} />
                ) }
            </Checkbox.Group>
            <Button type={"submit"} variant={"primary"}>Filtrer</Button>
        </form>
    )
}