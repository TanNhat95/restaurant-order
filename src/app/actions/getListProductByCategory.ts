import prisma from '@/utils/connect'


const getListProductByCategory = async (category: string) => {

    try {
        const getListProduct = await prisma.product.findMany({
            include: {
                category: true,
            },
            where: {
                catSlug: category
            }
        })
        return getListProduct
    } catch (error) {
        console.log(error)
    }
}

export default getListProductByCategory