"use client";

import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {ProductFilterResult} from "@/types";
import {BreadCrumbs, Heading, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {useEffect, useMemo, useState} from "react";
import {filterProducts} from "@/utils/filter-products";

export default function ProductList() {
    const categories = PRODUCTS_CATEGORY_DATA;
    const [filters, setFilters] = useState(undefined as ProductFilterResult | undefined);
    const filteredCategories = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    return (<div className={"flex"}>
        <aside>
            <SectionContainer>
                <ProductFilters categories={categories} onChanges={setFilters}></ProductFilters>
            </SectionContainer>
        </aside>
        <main className={"flex-1"}>
            <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }] } />
            { filteredCategories.map(category => {
                return <SectionContainer key={category.id}>
                    <Heading className={"my-4"} as={"h3"} weight={"bold"}>{ category.name + " (" + category.products.length + ")" }</Heading>
                    <ProductGridLayout products={category.products} >
                        {product => <ProductCardLayout product={product}  button={"Ajouter au panier"}/>}
                    </ProductGridLayout>
                </SectionContainer>
            }) }
        </main>
    </div>)
}