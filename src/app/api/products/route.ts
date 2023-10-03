
import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, res: NextResponse) => {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    try {
        const products = await prisma.product.findMany({
            where: {
                ...(category ? { catSlug: category } : { isFeatured: true })
            }
        })

        return new NextResponse(JSON.stringify(products), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: 'Something went wrong !!!'}), {status: 500})
    }
}

export const POST = async () => {
    return new NextResponse("POST products", {status: 200})
}