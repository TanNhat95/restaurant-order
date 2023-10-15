'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { revalidatePath } from 'next/cache'

const DeleteButton = ({id}: {id: string}) => {
    const { data, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated' || !data?.user.isAdmin) {
        return
    }

    const handleDelete = async () => {
        const result = await fetch(`https://restaurant-order-alpha.vercel.app//api/products/${id}`, {
            method: 'DELETE'
        })
        if (result.status === 200) {
            router.push('/menu')
            // Fix bug when delete product but not reload update UI
            router.refresh()


            toast.success('The product has been deleted !!!')
        } else {
            const data = await result.json()
            toast.error(data.message)
        }
    }
    return (
        <>
        <button className="bg-red-200 p-2 rounded-full absolute top-4 right-4">
            <Image src="/temporary/delete.png" alt="deleteIcon" width={20} height={20} onClick={handleDelete}/>
        </button>
        <div>{id}</div>
        </>
    );
}

export default DeleteButton;