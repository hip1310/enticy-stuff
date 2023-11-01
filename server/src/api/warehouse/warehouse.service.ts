import connectionPool from "../../config/database";
import { Warehouse } from "./warehouse.entity";
import { WarehouseInterface } from "./warehouse.interface";

// Function to find a warehouse by its code
export const findByOneWarehouseCode = async (warehouseCode: string) => {
  // Creating a repository instance for the Warehouse entity
  const warehouseRepository = connectionPool.getRepository(Warehouse);

  // Retrieving warehouse items from the database based on the provided warehouse code
  const warehouseItems: WarehouseInterface[] = await warehouseRepository.find({
    where: { code: warehouseCode },
  });

  // Extracting the first warehouse item from the result array (if any)
  const warehouseItem: WarehouseInterface = warehouseItems[0];

  // Returning the found warehouse item (or undefined if not found)
  return warehouseItem;
};
