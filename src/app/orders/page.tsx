'use client'

import React from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Order } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns'
import Image from "next/image";
import { toast } from 'react-toastify'

const OrdersPage = () => {

  const { data: session, status} = useSession()

  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/')
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then(
        (res) => res.json(),
      ),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string}) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status)
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["orders"]})
    }
  })

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const input = form.elements[0] as HTMLInputElement
    const status = input.value

    mutation.mutate({id, status})
    toast.success("The order status has been changed !!!")
  }

    if (isLoading || status === 'loading') return 'Loading...'

    if (error) return 'An error has occurred: ' + error

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Order) => (
            <tr className = {`text-sm md:text-base ${item.status !== 'delivered' && 'bg-red-50'}`} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">{format(new Date('2023-09-29T06:31:21.857Z'), 'yyyy-MM-dd-HH:mm:ss')}</td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">{item.products[0].title}</td>
              {session?.user.isAdmin
                ? (
                    <td>
                      <form className="flex items-center justify-center gap-4" onSubmit={(event) => handleUpdate(event, item.id)}>
                        <input
                          placeholder={item.status}
                          className="p-2 ring-1 ring-red-100 rounded-md"
                        />
                        <button>
                          <Image alt="" src="/cart.png" width={20} height={20}/>
                        </button>
                      </form>
                    </td>
                  )
                : (<td className="py-6 px-1"></td>)
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
