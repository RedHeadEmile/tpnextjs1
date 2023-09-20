import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import ProductList from "@/components/product-list";
import {BreadCrumbs} from "tp-kit/components";

export type CategoryPageProps<T = Record<string, string>> = {
    /**
     * The path parameters received
     * e.g. : page/[slug] --> params.slug
     */
    params: T,
    /**
     * The HTTP query parameters received
     * e.g. : my-page?page=1 --> searchParams.page (= '1')
     */
    searchParams: { [key: string]: string | string[] | undefined }
};

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const categorySlug = params['categorySlug'];
    const categoryAsArray = PRODUCTS_CATEGORY_DATA.filter(c => c.slug === categorySlug);
    const category = categoryAsArray.find((_, i) => i === 0)

    return <>
        <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category?.name ?? '', url: categorySlug }] } />
        <ProductList categories={categoryAsArray}/>
        </>
}