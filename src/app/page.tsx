import ProductList from "@/components/product-list";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, Footer} from "tp-kit/components";

export default function Home() {

  return <>
    <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }] } />
    <ProductList categories={PRODUCTS_CATEGORY_DATA} showFilters={true}/>
    <Footer />
    </>
}
