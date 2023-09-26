import ProductList from "@/components/product-list";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {RoutePageProps} from "@/types";
import {ProductsCategoryData} from "tp-kit/types";
import prisma from "@/utils/prisma";
import {notFound} from "next/navigation";
import {cache} from "react";

const getCategory = cache(async (categorySlug: string) => {
    console.log("getCategory")
    const category = await prisma.productCategory.findUnique({ include: { products: {} }, where: { slug: categorySlug } })
    if (!category)
        notFound();

    return category as ProductsCategoryData;
});

export default async function CategoryPage({ params }: RoutePageProps<{categorySlug: string}>) {
    const category = await getCategory(params.categorySlug);
    const categoryAsArray = [category];

    return <>
        <SectionContainer background={"white"} className={"pb-0"}>
            <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category.name, url: params.categorySlug }] } />
        </SectionContainer>
        <ProductList categories={categoryAsArray}/>
        </>
}

export async function generateMetadata({ params }: RoutePageProps<{categorySlug: string}>) {
    const category = await getCategory(params.categorySlug);

    return {
        title: category.name,
        description: "Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits " + category?.name
    }
}
