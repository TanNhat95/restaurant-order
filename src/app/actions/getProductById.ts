import prisma from '@/utils/connect'


const getProductById = async ({params}: {params: { id: string}}) => {

    try {
        const productById = await prisma.product.findUnique({
            include: {
                category: true,
            },
            where: {
                id: params.id ,
            }
        })
        return productById
    } catch (error) {
        console.log(error)
    }
}

export default getProductById