import * as orderService from "../api/order/order.service";
import { OrderInterface } from "../api/order/order.interface";
import { Order } from "../api/order/order.entity";

// Mock the database connection and other dependencies
jest.mock("../config/database");
jest.mock("../util/publishAwsSns");
jest.mock("../api/warehouse/warehouse.service");

describe("orderService", () => {
  describe("moveAllItemToOrder", () => {
    it("should move all items to orders", async () => {
      const allData: OrderInterface[] = [
        {
          id: 1,
          name: "Product 1",
          image: "image",
          qty: 1,
          price: "123",
          userId: 1,
          category: "123",
          updated_at: new Date(),
          warehouseId: 1,
          status: "Pending",
        },
      ];

      const expectedResponse: Order[] = [
        {
          id: 1,
          name: "Product 1",
          image: "image",
          qty: 1,
          price: "123",
          userId: 1,
          category: "123",
          updated_at: new Date(),
          warehouseId: 1,
          status: "Created",
        },
      ];

      const addMock = jest.spyOn(orderService, "add");
      addMock.mockImplementation((data) => {
        return Promise.resolve(data as Order);
      });

      const result = await orderService.moveAllItemToOrder(allData);

      expect(addMock).toHaveBeenCalledTimes(allData.length);
      expect(result).toEqual(expectedResponse);

      // Restore the mock after the test
      addMock.mockRestore();
    });
  });
});
