import prisma from '@/utils/connect'
import getCurrentUser from './getCurrentUser'


const getMenu = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
        return []
    }

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