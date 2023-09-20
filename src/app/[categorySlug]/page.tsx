import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import ProductList from "@/components/product-list";
import {BreadCrumbs} from "tp-kit/components";
import {RoutePageProps} from "@/types";

export default function CategoryPage({ params, searchParams }: RoutePageProps<{categorySlug: string}>) {
    const categorySlug = params.categorySlug;
    const categoryAsArray = PRODUCTS_CATEGORY_DATA.filter(c => c.slug === categorySlug);
    const category = categoryAsArray.find((_, i) => i === 0)

    return <>
        <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category?.name ?? '', url: categorySlug }] } />
        <ProductList categories={categoryAsArray}/>
        </>
}