import {RoutePageProps} from "@/types";
import {
    BreadCrumbs,
    Heading,
    ProductCardLayout,
    ProductGridLayout,
    ProductImage,
    ProductRating,
    SectionContainer
} from "tp-kit/components";
import {ProductAttribute, ProductAttributesTable} from "@/components/product-attributes-table";
import AddToCartButton from "@/components/add-to-cart-button";
import {cache} from "react";
import prisma from "@/utils/prisma";
import {notFound} from "next/navigation";
import {ProductData, ProductsCategoryData} from "tp-kit/types";

const getCategoryAndProduct = cache(async (categorySlug: string, productSlug: string) => {
    const product = await prisma.product.findUnique({ where: { slug: productSlug }, include: { category: { include: { products: { where: { NOT: [ { slug: productSlug } ] } } } } } })
    if (!product)
        notFound();

    return [product.category as ProductsCategoryData, product as ProductData] as const;
});

export default async function ProductPage({ params }: RoutePageProps<{categorySlug: string, productSlug: string}>) {
    const [category, product] = await getCategoryAndProduct(params.categorySlug, params.productSlug);

    const mockAttributes: ProductAttribute[] = [
        { label: "Intensité", rating: 3 },
        { label: "Volupté", rating: 2 },
        { label: "Amertume", rating: 1 },
        { label: "Onctuosité", rating: 4 },
        { label: "Instagramabilité", rating: 5 },
    ];

    return <>
        <SectionContainer background={"white"} className={"pb-0"}>
            <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category.name, url: "/" + params.categorySlug }, { label: product.name, url: params.productSlug }] } />
        </SectionContainer>

        <div className={"flex justify-center gap-4"}>
            <div className={"overflow-hidden rounded-lg"}>
                <div className={"overflow-hidden"}>
                    { /* Je fais confiance à votre composant */ }
                    <ProductImage
                        className={"!w-full !h-auto"}
                        height={300}
                        width={300}
                        {...product}
                    />
                </div>
            </div>
            <div className={"flex flex-col justify-between"}>
                <div className={"prose flex flex-col"}>
                    <h1>{product.name}</h1>
                    <ProductRating value={4} />
                    <p>{product.desc}</p>
                    <div className={"flex justify-between align-middle mt-auto"}>
                        <span>{product.price}€</span>
                        <AddToCartButton variant={"primary"} product={product} />
                    </div>
                </div>
                <ProductAttributesTable attributes={mockAttributes} />
            </div>
        </div>

        <SectionContainer background={"white"}>
            <Heading as={"h1"} weight={"bold"}>Vous aimerez aussi</Heading>
            <ProductGridLayout products={category.products} >
                {product => <ProductCardLayout product={product} button={<AddToCartButton product={product} className={"w-full"} />}/>}
            </ProductGridLayout>
        </SectionContainer>
    </>
}

export async function generateMetadata({ params }: RoutePageProps<{categorySlug: string, productSlug: string}>) {
    const [category, product] = await getCategoryAndProduct(params.categorySlug, params.productSlug);

    let desc = product.desc;
    if (desc == undefined || desc.trim().length === 0)
        desc = "Succombez pour notre " + product.name + " et commandez-le sur notre site !"

    return {
        title: product.name,
        description: desc
    }
}

export async function generateStaticParams() {
    const categories: ProductsCategoryData[] = await prisma.productCategory.findMany({ include: { products: {} } });
    const flattenProducts = [];
    for (let category of categories)
        for (let product of category.products)
            flattenProducts.push({
                categorySlug: category.slug,
                productSlug: product.slug
            });
    return categories;
}
