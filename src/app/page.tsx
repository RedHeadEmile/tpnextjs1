import Image from 'next/image'
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, Heading, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";

export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;

  return (
    <main>
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
  )
}
