import {RoutePageProps} from "@/types";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {
    BreadCrumbs,
    Button,
    Heading,
    ProductCardLayout,
    ProductGridLayout,
    ProductImage,
    ProductRating,
    SectionContainer
} from "tp-kit/components";
import {ProductAttribute, ProductAttributesTable} from "@/components/product-attributes-table";

export default function ProductPage({ params, searchParams }: RoutePageProps<{categorySlug: string, productSlug: string}>) {
    const categorySlug = params.categorySlug;
    const categoryAsArray = PRODUCTS_CATEGORY_DATA.filter(c => c.slug === categorySlug);
    const category = categoryAsArray.find((_, i) => i === 0)

    const productSlug = params.productSlug;
    const product = category?.products.find(p => p.slug === productSlug);

    const mockAttributes: ProductAttribute[] = [
        { label: "Intensité", rating: 3 },
        { label: "Volupté", rating: 2 },
        { label: "Amertume", rating: 1 },
        { label: "Onctuosité", rating: 4 },
        { label: "Instagramabilité", rating: 5 },
    ];

    return <>
        <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }, { label: category?.name ?? '', url: "/" + categorySlug }, { label: product?.name ?? '', url: productSlug }] } />

        { product !== undefined &&
        <div className={"flex justify-center gap-4"}>
            <div className={"overflow-hidden rounded-lg"}>
                { /* Je fais confiance à votre composant */ }
                <ProductImage
                    className={"!w-full !h-auto"}
                    height={300}
                    width={300}
                    {...product}
                />
            </div>
            <div className={"flex flex-col justify-between"}>
                <div className={"prose flex flex-col"}>
                    <h1>{product.name}</h1>
                    <ProductRating value={4} />
                    <p>{product.desc}</p>
                    <div className={"flex justify-between align-middle mt-auto"}>
                        <span>{product.price}€</span>
                        <Button>Ajouter au panier</Button>
                    </div>
                </div>
                <ProductAttributesTable attributes={mockAttributes} />
            </div>
        </div>
        }

        <SectionContainer>
            <Heading as={"h1"} weight={"bold"}>Vous aimerez aussi</Heading>
            <ProductGridLayout products={category?.products.filter(p => p.slug !== productSlug) ?? []} >
                {product => <ProductCardLayout product={product} button={<Button variant={"white"}>Ajouter au panier</Button>}/>}
            </ProductGridLayout>
        </SectionContainer>
    </>
}