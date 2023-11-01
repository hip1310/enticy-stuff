// Import necessary modules and entities
import connectionPool from "../../config/database";
import { Cart } from "./cart.entity";
import {
  CartInterface,
  FindAllInterface,
  FindOneByUserIdAndNameInterface,
  MoveCartItemInterface,
} from "./cart.interface";
import { moveAllItemToOrder } from "../order/order.service";
import { sendEmail } from "../../util/emailService";
import { User } from "../user/user.entity";

// Function to add or update a cart item
export const addOrUpdate = async (body: CartInterface) => {
  // Destructure properties from the request body
  const { id, name, image, qty, price, userId, category } = body;

  // Get the cart repository from the connection pool
  const cartRepository = connectionPool.getRepository(Cart);
  let responseItem = {};

  // Find the cart item by ID
  await cartRepository
    .find({
      where: { id: id || 0 },
    })
    .then(async (response) => {
      // If quantity is 0, delete the cart item
      if (qty == 0) {
        cartRepository.delete({ id: id });
      } else {
        // If the cart item exists, update it; otherwise, create a new one
        const existingCartItem: CartInterface = response?.[0];
        if (existingCartItem) {
          const updateCartItem = {
            name: name,
            image: image,
            qty: Number(qty),
            price: price,
            category: category,
            user: new User(userId || 0),
          };
          cartRepository.update({ id: existingCartItem.id }, updateCartItem);
          responseItem = { ...updateCartItem, id: existingCartItem.id };
        } else {
          const cartItem = cartRepository.create({
            name: name,
            image: image,
            qty: Number(qty),
            price: price,
            category: category,
            user: new User(userId || 0),
          });
          const savedData = await cartRepository.save(cartItem);
          responseItem = savedData;
        }
      }
    });
  return responseItem;
};

// Function to find all cart items for a specific user
export const findAll = async (query: FindAllInterface) => {
  const { userId } = query;
  const cartRepository = connectionPool.getRepository(Cart);
  // Find all cart items for the specified user, ordered by updated_at in descending order
  const cartItems: CartInterface[] = await cartRepository.find({
    where: { user: new User(userId || 0) },
    order: {
      updated_at: "DESC",
    },
  });
  return cartItems;
};

// Function to find a cart item by user ID and item name
export const findOneByUserIdAndName = async (
  query: FindOneByUserIdAndNameInterface
) => {
  const { userId, name } = query;
  const cartRepository = connectionPool.getRepository(Cart);
  // Find cart items with the specified user ID and item name
  const cartItems: CartInterface[] = await cartRepository.find({
    where: { user: new User(userId || 0), name: name },
  });

  return cartItems;
};

// Function to move cart items to the order and delete them from the cart
export const moveCartItem = async (query: MoveCartItemInterface) => {
  const { userId, addressId } = query;
  const cartRepository = connectionPool.getRepository(Cart);
  // Find all cart items for the specified user
  const cartItems: CartInterface[] = await cartRepository.find({
    relations: {
      user: true,
    },
    where: { user: new User(userId || 0) },
  });
  // Move cart items to the order and delete them from the cart
  const orderItems = await moveAllItemToOrder(cartItems, Number(addressId));
  cartRepository.delete({ user: new User(userId || 0) });
  return orderItems;
};
