import prisma from '@/utils/connect'


const getProducts = async () => {

    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
            where: {
                isFeatured: true
            }
        })
        return products
    } catch (error) {
        console.log(error)
    }
}

export default getProducts