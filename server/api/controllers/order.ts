import { Order } from "../entity/Order";
import connectionPool from "../data-source";
import { publishSNS } from "../util/publishAwsSns";
import { WarehouseCategoryMapping } from "../entity/WarehouseCategoryMapping";

const changeStatusArnTopic = "arn:aws:sns:us-east-1:690192834616:order_updates";
//moveAllItemToOrder To Order
export const moveAllItemToOrder = async (allData: any) => {
  const dataAfterResponse: any = [];
  allData.forEach(async (data: any) => {
    const savedData = await add(data);
    dataAfterResponse.push(savedData);
  });
  return dataAfterResponse;
};

export const add = async (data: any) => {
  const { name, image, qty, price, category, status, user_id } = data;
  const repository = connectionPool.getRepository(Order);

  const item = repository.create({
    name: name,
    image: image,
    qty: qty,
    price: price,
    category: category,
    status: status,
    user_id: user_id,
  });
  const savedData = await repository.save(item);

  const warehouseCategoryMappingRepository = connectionPool.getRepository(WarehouseCategoryMapping);
  const warehouseCategoryMappingData: any = await  warehouseCategoryMappingRepository.find({
    where:{category:category}
  })
  
  console.log("warehouseCategoryMappingData",warehouseCategoryMappingData[0])
  console.log("warehouseCategoryMappingData.warehouse.code",warehouseCategoryMappingData[0].warehouse.code)

  publishSNS({
    topic: changeStatusArnTopic,
    message: JSON.stringify({
      userId: user_id,
      name: name,
      status: "Pending Delivery",
      wareHouseCode:warehouseCategoryMappingData[0].warehouse.code,
    }),
  });
  return savedData;
};

export const findAll = async (req: any, res: any, next: any) => {
  try {
    const { userId } = req.query;
    const repository = connectionPool.getRepository(Order);
    const items: any = await repository.find({
      where: { user_id: userId },
      order: {
        updated_at: "DESC",
      },
    });

    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error findAll order data" });
  }
};

export const findOneByUserIdAndName = async (req: any, res: any, next: any) => {
  try {
    const { userId, name } = req.query;
    const repository = connectionPool.getRepository(Order);
    const items: any = await repository.find({
      where: { user_id: userId, name: name },
    });

    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error findOneByUserIdAndName order data" });
  }
};

export const changeOrderStatus = async (req: any, res: any, next: any) => {
  try {
    const { userId, name, status } = req.body;
    const repository = connectionPool.getRepository(Order);
    const items: any = await repository.find({
      where: { user_id: userId, name: name },
    });
    if (items?.length > 0) {
      const item = items?.[0];
      repository.update({ id: item.id }, { status: status });
      res.status(200).send({ ...item, status: status });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error findOneByUserIdAndName order data" });
  }
};
