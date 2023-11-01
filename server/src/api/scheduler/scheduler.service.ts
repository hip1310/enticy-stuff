// Import necessary modules and entities
import { LessThanOrEqual } from "typeorm";
import connectionPool from "../../config/database";
import { sendEmail } from "../../util/emailService";
import { Cart } from "../cart/cart.entity";
import { CartInterface } from "../cart/cart.interface";
import logger from "../../middleware/logger";

// Function to promote orders
export const promoteOrders = async () => {
  if (!process.env.SEND_SCHEDULER_EMAIL) {
    return "Send Scheduler Email is disabled";
  }
  // Get the repository for the cart entity
  const repository = connectionPool.getRepository(Cart);

  // Find all cart before 15 days in descending order
  let newUpdatedDate = new Date();
  newUpdatedDate.setDate(newUpdatedDate.getDate() - 15);
  const cartItems: CartInterface[] = await repository.find({
    relations: {
      user: true,
    },
    where: { updated_at: LessThanOrEqual(newUpdatedDate) },
    order: {
      updated_at: "DESC",
    },
  });
  const userWiseCartItems = new Map();
  if (cartItems?.length > 0) {
    cartItems.map((element: CartInterface) => {
      if (userWiseCartItems.get(element.user?.email)) {
        const currentCartItems = userWiseCartItems.get(element.user?.email);
        currentCartItems.push(element);
        userWiseCartItems.set(element.user?.email, currentCartItems);
      } else {
        const cartItemArray = [];
        cartItemArray.push(element);
        userWiseCartItems.set(element.user?.email, cartItemArray);
      }
    });
    if (userWiseCartItems.size > 0) {
      for (const [key, value] of userWiseCartItems.entries()) {
        logger.info(`Mail Sent to email : ${key} with data : ${value}`);
        const mailOptions = {
          to: key || "",
          subject: "You have pending items in cart",
          text: `Hello Customer,
                \n
                You left items in your cart. Please navigate to ${process.env.FRONTEND_URL}cart to buy`,
        };
        sendEmail(mailOptions);
      }
    }
  }
  return "Job Performed!";
};
