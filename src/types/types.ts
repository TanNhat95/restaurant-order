export type Menu = {
    id: string,
    slug: string
    title: string
    desc?: string
    image?: string
    color: string
}

export type Product = {
    id: string,
    title: string,
    desc?: string,
    image?: string,
    price: number,
    options: { title: string; additionalPrice: number}[]
}

export type Order = {
    id: string,
    userEmail: string,
    price: number,
    products: CartItem[],
    status: string,
    createAt: Date,
    intent_id?: string
}

export type Cart = {
    products: CartItem[],
    totalItems: number,
}

export type CartItem = {
    id: string,
    title: string,
    image?: string,
    price: number,
    optionTitle?: string,
    quantity: number,
    additionalPrice: number,
}

export type ActionTypes = {
    addToCart: (item: CartItem) => void,
    removeFromCart: (item: CartItem) => void,
}