import Image from 'next/image'
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, Heading, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {ProductFilterResult} from "@/types";

export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;

  const onChanges = (filters: ProductFilterResult) => {
    console.log(filters)
  };

  return (<div className={"flex"}>
    <aside>
      <SectionContainer>
        <ProductFilters categories={categories} onChanges={onChanges}></ProductFilters>
      </SectionContainer>
    </aside>
    <main className={"flex-1"}>
      <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }] } />
      { categories.map(category => {
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
