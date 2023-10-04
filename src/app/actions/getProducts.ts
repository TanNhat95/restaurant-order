import prisma from '@/utils/connect'
import getCurrentUser from './getCurrentUser'
import { NextRequest } from 'next/server'


const getProducts = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
        return []
    }

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