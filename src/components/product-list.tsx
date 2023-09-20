"use client";

import {ProductFilterResult} from "@/types";
import {BreadCrumbs, Heading, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {useMemo, useState} from "react";
import {filterProducts} from "@/utils/filter-products";
import {ProductsCategoryData} from "tp-kit/types";
import Link from "next/link";

export interface ProductListProps {
    categories: ProductsCategoryData[],
    showFilters?: boolean
}

export default function ProductList({ categories, showFilters }: ProductListProps ) {
    const [filters, setFilters] = useState(undefined as ProductFilterResult | undefined);
    const filteredCategories = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    return (<div className={"flex"}>
        { (showFilters ?? false) &&
            <SectionContainer>
                <ProductFilters categories={categories} onChanges={setFilters}></ProductFilters>
            </SectionContainer>
        }
        <div className={"flex-1"}>
            { filteredCategories.map(category => {
                return <SectionContainer key={category.id}>
                    <Link href={category.slug} className={"link"}><Heading className={"my-4"} as={"h3"} weight={"bold"}>{ category.name + " (" + category.products.length + ")" }</Heading></Link>
                    <ProductGridLayout products={category.products} >
                        {product => <ProductCardLayout product={product}  button={"Ajouter au panier"}/>}
                    </ProductGridLayout>
                </SectionContainer>
            }) }
        </div>
    </div>)
}