import * as cartService from "../api/cart/cart.service";
import { CartInterface } from "../api/cart/cart.interface";
import { Cart } from "../api/cart/cart.entity";
import { User } from "../api/user/user.entity";
jest.useFakeTimers()

// Mock the database connection
jest.mock("../config/database");
// Mock the cart service functions
jest.mock("../api/cart/cart.service");
// Mock the cart service and order service functions
jest.mock("../api/order/order.service");

describe("CartService", () => {
  describe("addOrUpdate", () => {
    it("should add or update a cart item", async () => {
      const allData: CartInterface = {
          id: 1,
          name: "Product 1",
          image: "image",
          qty: 1,
          price: "123",
          user: new User(1),
          category: "123",
          updated_at: new Date(),
        }
      ;
  
      const expectedResponse: Cart = {
        id: 1,
        name: "Product 1",
        image: "image",
        qty: 1,
        price: "123",
        user: new User(1),
        category: "123",
        updated_at: new Date(),
      };
  
  
      const addMock = jest.spyOn(cartService, "addOrUpdate");
        addMock.mockImplementation((data) => {
          return Promise.resolve(data as Cart);
        });
  
        const result = await cartService.addOrUpdate(allData);
        expect(result).toEqual(expectedResponse);
  
        // Restore the mock after the test
        addMock.mockRestore();
    });
  });
})

