import prisma from '@/utils/connect'


const getMenu = async () => {

    try {
        const conversations = await prisma.category.findMany({
            include: {
                products: true,
            }
        })
        return conversations
    } catch (error) {
        console.log(error)
    }
}

export default getMenu