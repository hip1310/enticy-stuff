import { Cart } from "../entity/Cart";
import connectionPool from "../data-source";
import { moveAllItemToOrder } from "../controllers/order";

//Add To Cart
export const addOrUpdate = async (req: any, res: any, next: any) => {
  try {
    const { id, name, image, qty, price, userId, category } = req.body;
    const cartRepository = connectionPool.getRepository(Cart);
    cartRepository
      .find({
        where: { id: id | 0 },
      })
      .then(async (response) => {
        const existingCartItem: any = response?.[0];
        if (existingCartItem) {
          const updateCartItem = {
            name: name,
            image: image,
            qty: qty,
            price: price,
            category: category,
            user_id: userId,
          };
          cartRepository.update({ id: existingCartItem.id }, updateCartItem);
          res.status(200).send({ ...updateCartItem, id: existingCartItem.id });
        } else {
          const cartItem = cartRepository.create({
            name: name,
            image: image,
            qty: qty,
            price: price,
            category: category,
            user_id: userId,
          });
          const savedData = await cartRepository.save(cartItem);
          res.status(200).send(savedData);
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving cart data" });
  }
};

export const findAll = async (req: any, res: any, next: any) => {
  try {
    const { userId } = req.query;
    const cartRepository = connectionPool.getRepository(Cart);
    const cartItems: any = await cartRepository.find({
      where: { user_id: userId },
      order: {
        updated_at: "DESC",
      },
    });

    res.status(200).send(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error findAll cart data" });
  }
};

export const findOneByUserIdAndName = async (req: any, res: any, next: any) => {
  try {
    const { userId, name } = req.query;
    const cartRepository = connectionPool.getRepository(Cart);
    const cartItems: any = await cartRepository.find({
      where: { user_id: userId, name: name },
    });

    res.status(200).send(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error findOneByUserIdAndName cart data" });
  }
};

export const moveCartItem = async (req: any, res: any, next: any) => {
  try {
    const { userId } = req.query;
    const cartRepository = connectionPool.getRepository(Cart);
    const cartItems: any = await cartRepository.find({
      where: { user_id: userId },
    });
    const orderItems = await moveAllItemToOrder(cartItems);
    cartRepository.delete({ user_id: userId });
    res.status(200).send(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error moveCartItem cart data" });
  }
};
