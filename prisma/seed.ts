import {PrismaClient} from ".prisma/client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";

const prisma = new PrismaClient();
async function main() {
    for (const category of PRODUCTS_CATEGORY_DATA) {
        await prisma.productCategory.upsert({
            where: { slug: category.slug },
            update: {},
            create: {
                id: category.id,
                name: category.name,
                slug: category.slug,
                products: {
                    create: category.products.map(product => {
                        return {
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            img: product.img,
                            desc: product.desc,
                            path: product.path,
                            price: product.price
                        }
                    })
                }
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });