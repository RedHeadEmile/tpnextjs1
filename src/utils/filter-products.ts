import {ProductsCategoryData} from "tp-kit/types";
import {ProductFilterResult} from "@/types";

export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFilterResult
): ProductsCategoryData[] {
    let newCategories: ProductsCategoryData[] = JSON.parse(JSON.stringify(categories));

    if ((filters?.categoriesSlug.length ?? 0) > 0)
        newCategories = newCategories.filter(category => filters!.categoriesSlug.indexOf(category.slug) >= 0);

    if ((filters?.search?.trim().length ?? 0) > 0) {
        const filter = filters!.search!.trim().toLowerCase();
        newCategories.forEach(category => {
            category.products = category.products.filter(
                product => product.name.toLowerCase().indexOf(filter) >= 0
            )
        })
    }

    return newCategories.filter(c => c.products.length > 0);
}