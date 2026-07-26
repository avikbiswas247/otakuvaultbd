"use client";

import Image from "next/image";

import {
  removeCartItem,
  updateQuantity,
} from "../service/cart";

export default function CartItem({

  item,

  refresh,

}: any) {

  return (

    <div className="border rounded-xl p-4 flex gap-5 mb-5">

      <Image

        src={item.image_url}

        alt={item.name}

        width={120}

        height={120}

      />

      <div className="flex-1">

        <h2 className="font-bold text-xl">

          {item.name}

        </h2>

        <p>

          ${item.price}

        </p>

        <div className="flex gap-3 mt-4">

          <button

            onClick={async () => {

              await updateQuantity(

                item.cart_item_id,

                item.quantity - 1

              );

              refresh();

            }}

          >

            -

          </button>

          <span>

            {item.quantity}

          </span>

          <button

            onClick={async () => {

              await updateQuantity(

                item.cart_item_id,

                item.quantity + 1

              );

              refresh();

            }}

          >

            +

          </button>

        </div>

      </div>

      <button

        onClick={async () => {

          await removeCartItem(
            item.cart_item_id
          );

          refresh();

        }}

      >

        Remove

      </button>

    </div>

  );

}