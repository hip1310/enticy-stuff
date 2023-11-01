import * as userService from "../api/user/user.service";

// Mock the database connection and User repository
jest.mock("../config/database", () => {
  const mockGetRepository = jest.fn();
  return {
    getRepository: mockGetRepository,
  };
});

describe("createUser", () => {
  it("should create a new user when no existing user is found", async () => {
    const mockUserRepository = {
      find: jest.fn().mockResolvedValue([]),
      create: jest.fn(),
      save: jest.fn().mockResolvedValue({id: 1, email: "test@example.com", email_verified: true, name: "Test User", nickname: "Test", picture: "avatar.jpg", sub: "123456", updated_at: new Date()}), // Mock the saved user
      update: jest.fn(),
    };

    // Mock the getRepository method to return the mockUserRepository
    require("../config/database").getRepository.mockReturnValue(
      mockUserRepository
    );

    const userData = {
      id: 1,
      email: "test@example.com",
      email_verified: true,
      name: "Test User",
      nickname: "Test",
      picture: "avatar.jpg",
      sub: "123456",
      updated_at: new Date(),
    };

    const result = await userService.createUser(userData);

    // Expectations
    expect(result).toEqual(userData);
  });
});
