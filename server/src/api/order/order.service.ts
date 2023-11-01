// Import necessary modules and entities
import connectionPool from "../../config/database";
import { Order } from "./order.entity";
import { WarehouseCategoryMapping } from "../warehouse/warehouse-category-mapping.entity";
import {
  ChangeOrderStatusInterface,
  FindAllInterface,
  FindOneByUserIdAndNameInterface,
  OrderInterface,
} from "./order.interface";
import { WarehouseInterface } from "../warehouse/warehouse.interface";
import { publishSNS } from "../../util/publishAwsSns";
import { findByOneWarehouseCode } from "../warehouse/warehouse.service";
import { sendEmail } from "../../util/emailService";
import { User } from "../user/user.entity";
import { UserInterface } from "../user/user.interface";
import { findAddressById } from "../address/address.service";

// Define the AWS SNS topic for order updates
const changeStatusArnTopic = "arn:aws:sns:us-east-1:690192834616:order_updates";

// Function to move all items to orders
export const moveAllItemToOrder = async (allData: OrderInterface[], addressId: number) => {
  const dataAfterResponse: OrderInterface[] = [];

  // Loop through each data item and update its status to "Created"
  allData.forEach(async (data: OrderInterface) => {
    data.status = "Created";
    data.userId = data.user?.id;
    data.address = await findAddressById(addressId);
    const savedData = await add(data);
    dataAfterResponse.push(savedData);
  });

  return dataAfterResponse;
};

// Function to add an order
export const add = async (data: OrderInterface) => {
  // Extract necessary data from the input
  const { name, image, qty, price, category, status, userId, address } = data;

  // Get the repository for the Order entity
  const repository = connectionPool.getRepository(Order);

  // Create a new Order entity
  const item = repository.create({
    name: name,
    image: image,
    qty: qty,
    price: price,
    category: category,
    status: status,
    userId: userId,
    address: address,
  });

  // Save the new order to the database
  const savedData = await repository.save(item);

  // Get the repository for WarehouseCategoryMapping entity
  const warehouseCategoryMappingRepository = connectionPool.getRepository(
    WarehouseCategoryMapping
  );

  // Find warehouse category mapping data based on the order category
  const warehouseCategoryMappingData: WarehouseCategoryMapping[] =
    await warehouseCategoryMappingRepository.find({
      where: { category: category },
    });

  // Publish a message to AWS SNS indicating the order status change
  publishSNS({
    TopicArn: changeStatusArnTopic,
    Message: JSON.stringify({
      userId: userId,
      name: name,
      status: "Processing",
      warehouseCode: warehouseCategoryMappingData[0].warehouse.code,
    }),
  });

  // Return the saved order data
  return savedData;
};

// Function to find all orders for a user
export const findAll = async (query: FindAllInterface) => {
  // Extract necessary data from the input
  const { userId } = query;

  // Get the repository for the Order entity
  const repository = connectionPool.getRepository(Order);

  // Find all orders for the specified user, ordered by updated_at in descending order
  const items: OrderInterface[] = await repository.find({
    where: { userId: userId },
    order: {
      updated_at: "DESC",
    },
  });

  // Return the found orders
  return items;
};

// Function to find an order by userId and name
export const findOneByUserIdAndName = async (
  query: FindOneByUserIdAndNameInterface
) => {
  // Extract necessary data from the input
  const { userId, name } = query;

  // Get the repository for the Order entity
  const repository = connectionPool.getRepository(Order);

  // Find orders that match the specified userId and name
  const items: OrderInterface[] = await repository.find({
    where: { userId: userId, name: name },
  });

  // Return the found orders
  return items;
};

// Function to change the status of an order
export const changeOrderStatus = async (body: ChangeOrderStatusInterface) => {
  // Extract necessary data from the input
  const { userId, name, status, warehouseCode } = body;

  // Get the repository for the Order entity
  const repository = connectionPool.getRepository(Order);

  // Find orders that match the specified userId and name
  const items: OrderInterface[] = await repository.find({
    where: { userId: userId, name: name },
  });

  // Get the repository for the User entity
  const userRepository = connectionPool.getRepository(User);
  const userObject: UserInterface[] = await userRepository.find({
    where: { id: userId },
  });

  // If orders are found, update the status and warehouseId
  if (items?.length > 0) {
    const item = items?.[0];
    const warehouseItem: WarehouseInterface = await findByOneWarehouseCode(warehouseCode);
    
    // Update the order status and warehouseId
    repository.update(
      { id: item.id },
      { status: status, warehouseId: warehouseItem.id }
    );

    if(process.env.SEND_ORDER_EMAIL){
      const mailOptions = {
        to: userObject[0].email,
        subject: "Order placed",
        text: "Your Order is placed!",
      };
  
      sendEmail(mailOptions);
    }
    
    // Return the updated order data
    return { ...item, status: status };
  }
};
