import { ActionTypes, Cart, CartItem } from "@/types/types"
import { create } from "zustand"
import { persist } from 'zustand/middleware'

const INIT_STATE = {
    products: [],
    totalItems: 0,
}

const OPTION_TITLE = {
    'Small': 0,
    'Medium': 2,
    'Large': 4
}

export const useCartStore = create(persist<Cart & ActionTypes>(
        (set, get) => ({
            products: INIT_STATE.products,
            totalItems: INIT_STATE.totalItems,
            addToCart(item: CartItem) {

                let products = get().products
                const duplicateItem = findItem(products, item)

                if (duplicateItem.length > 0) {
                    products = deleteItem(products, item)
                    products = [...products, {
                        ...item,
                        quantity: item.quantity + duplicateItem[0].quantity,
                        price: item.price + duplicateItem[0].price,
                    }]
                    set((state) => ({
                        products: products,
                        totalItems: state.totalItems + item.quantity,
                    }))

                } else {
                    set((state) => ({
                        products: [...products, item],
                        totalItems: state.totalItems + item.quantity,
                    })
                    )
                    console.log(item.price)
                }
            },
            removeFromCart(item) {
                let products = get().products
                const duplicateItem = findItem(products, item)
                if (duplicateItem.length > 0) {
                    products = deleteItem(products, item)
                    set((state) => ({
                        products: products,
                        totalItems: state.totalItems - item.quantity,
                    }))

                } else {
                    set((state) => ({
                        products: state.products.filter(product => product.id !== item.id),
                        totalItems: state.totalItems - item.quantity,
                    }))
                }


                // set((state) => ({
                //     products: [],
                //     totalItems: 0,
                // }))
            }
}), {name: 'cart-storage', skipHydration: true}))

const findItem = (arr: CartItem[], item: CartItem) => arr.filter(
    e => e.optionTitle === item.optionTitle && e.id === item.id
)

const deleteItem = (arr: CartItem[], item: CartItem) => arr.filter(
    e => e.optionTitle !== item.optionTitle && e.id === item.id || e.id !== item.id
)