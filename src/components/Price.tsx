"use client";

import { Product } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: {product: Product}) => {
  const [newPrice, setNewPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCartStore()

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    if (product.options?.length) {
      setNewPrice(quantity * (Number(product.price) + product?.options[selected].additionalPrice));
    }
  }, [quantity, selected, product]);


  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: newPrice,
      ...(product.options?.length && {optionTitle: product.options[selected].title}),
      quantity: quantity,
      additionalPrice: product.options[selected].additionalPrice
    })
    toast.success("The product has been added !!!")
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${newPrice}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length && product?.options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
