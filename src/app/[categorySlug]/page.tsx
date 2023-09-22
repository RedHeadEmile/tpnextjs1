import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import ProductList from "@/components/product-list";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {RoutePageProps} from "@/types";

export default function CategoryPage({ params }: RoutePageProps<{categorySlug: string}>) {
    const categorySlug = params.categorySlug;
    const categoryAsArray = PRODUCTS_CATEGORY_DATA.filter(c => c.slug === categorySlug);
    const category = categoryAsArray.find((_, i) => i === 0)

    return <>
        <SectionContainer background={"white"} className={"pb-0"}>
            <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category?.name ?? '', url: categorySlug }] } />
        </SectionContainer>
        <ProductList categories={categoryAsArray}/>
        </>
}

export function generateMetadata({ params }: RoutePageProps<{categorySlug: string}>) {
    const categorySlug = params.categorySlug;
    const categoryAsArray = PRODUCTS_CATEGORY_DATA.filter(c => c.slug === categorySlug);
    const category = categoryAsArray.find((_, i) => i === 0)

    return {
        title: category?.name,
        description: "Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits " + category?.name
    }
}
