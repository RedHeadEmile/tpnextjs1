import ProductList from "@/components/product-list";
import prisma from "@/utils/prisma";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductsCategoryData} from "tp-kit/types";

export default async function Home() {
  const categories: ProductsCategoryData[] = (await prisma.productCategory.findMany({ include: { products: {} } }));

  return <>
    <SectionContainer background={"white"} className={"pb-0"}>
      <BreadCrumbs items={ [{ label: 'Accueil', url: '/' }] } />
    </SectionContainer>
    <ProductList categories={categories} showFilters={true}/>
    </>
}
