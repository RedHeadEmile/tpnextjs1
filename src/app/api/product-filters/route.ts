import {NextRequest, NextResponse} from "next/server";
import prisma from "@/utils/prisma";
import {ProductsCategoryData} from "tp-kit/types";

export async function GET(request: NextRequest) {
    const search = (request.nextUrl.searchParams.get("search") ?? '').trim();
    const cat = request.nextUrl.searchParams.getAll("cat");

    let categoryWhereClause = {};
    if (cat.length > 0)
        categoryWhereClause = {
            slug: {
                in: cat
            }
        };

    const categories: ProductsCategoryData[] = await prisma.productCategory.findMany({
        where: categoryWhereClause,

        include: {
            products: {
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            }
        }
    });

    return NextResponse.json( {
        "params": {
            "categoriesSlugs": cat,
            "search": search,
        },
        "categories": categories
    });
}