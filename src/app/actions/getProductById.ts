import prisma from '@/utils/connect'
import getCurrentUser from './getCurrentUser'


const getProductById = async ({params}: {params: { id: string}}) => {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
        return []
    }

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