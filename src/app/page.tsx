import ProductList from "@/components/product-list";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, Footer, SectionContainer} from "tp-kit/components";

export default function Home() {

  return <>
    <SectionContainer background={"white"} className={"pb-0"}>
      <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }] } />
    </SectionContainer>
    <ProductList categories={PRODUCTS_CATEGORY_DATA} showFilters={true}/>
    </>
}
