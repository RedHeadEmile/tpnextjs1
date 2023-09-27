"use client";

import {ProductFilterResult} from "@/types";
import {Heading, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {useEffect, useState} from "react";
import {ProductsCategoryData} from "tp-kit/types";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";

export interface ProductListProps {
    categories: ProductsCategoryData[],
    showFilters?: boolean
}

export default function ProductList({ categories, showFilters }: ProductListProps ) {
    const [filteredCategories, setFilteredCategories] = useState<ProductsCategoryData[]>(categories);
    const [filters, setFilters] = useState<ProductFilterResult | undefined>(undefined);
    useEffect(() => {
        if (!filters)
            return;

        (async () => {
            const searchParams = new URLSearchParams();
            filters?.categoriesSlug.forEach(slug => searchParams.append('cat', slug));
            if (filters?.search !== undefined)
                searchParams.append('search', filters.search)

            const response = await fetch('/api/product-filters?' + searchParams.toString());
            const jsonResponse = await response.json();

            setFilteredCategories(jsonResponse['categories'].filter((categ: ProductsCategoryData) => categ.products.length > 0));
        })();
    }, [filters]);

    return (<div className={"flex"}>
        { (showFilters ?? false) &&
            <SectionContainer background={"white"}>
                <ProductFilters categories={categories} onChanges={setFilters}></ProductFilters>
            </SectionContainer>
        }
        <div className={"flex-1"}>
            { filteredCategories.map(category => {
                return <SectionContainer background={"white"} key={category.id}>
                    <Link href={"/" + category.slug} className={"link"}><Heading className={"my-4"} as={"h3"} weight={"bold"}>{ category.name + " (" + category.products.length + ")" }</Heading></Link>
                    <ProductGridLayout products={category.products} >
                        {product => <ProductCardLayout product={product} button={<AddToCartButton className={"w-full"} product={product} />}/>}
                    </ProductGridLayout>
                </SectionContainer>
            }) }
        </div>
    </div>)
}