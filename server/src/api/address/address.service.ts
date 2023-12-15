// Import necessary modules and entities
import connectionPool from "../../config/database";
import { Address } from "./address.entity";
import {
  AddressInterface,
  DeleteInterface,
  FindAllInterface,
  FindByIdInterface,
} from "./address.interface";
import { User } from "../user/user.entity";

// Function to add or update a address item
export const addOrUpdate = async (body: AddressInterface) => {
  // Destructure properties from the request body
  const {
    id,
    name,
    mobile,
    address_line1,
    address_line2,
    landmark,
    pincode,
    default_address,
    userId,
  } = body;

  // Get the addressRepository repository from the connection pool
  const addressRepository = connectionPool.getRepository(Address);
  let responseItem = {};

  // Find the address item by ID
  await addressRepository
    .find({
      where: { id: id || 0 },
    })
    .then(async (response) => {
      // If the address item exists, update it; otherwise, create a new one
      const existingAddress: AddressInterface = response?.[0];
      if (existingAddress) {
        const updateAddress = {
          name: name,
          mobile: mobile,
          address_line1: address_line1,
          address_line2: address_line2,
          landmark: landmark,
          pincode: pincode,
          default_address: default_address,
          user: new User(userId || 0),
        };
        addressRepository.update({ id: existingAddress.id }, updateAddress);
        responseItem = { ...updateAddress, id: existingAddress.id };
      } else {
        const newAddress = addressRepository.create({
          name: name,
          mobile: mobile,
          address_line1: address_line1,
          address_line2: address_line2,
          landmark: landmark,
          pincode: pincode,
          default_address: default_address,
          user: new User(userId || 0),
        });
        const savedData = await addressRepository.save(newAddress);
        responseItem = savedData;
      }
    });
  return responseItem;
};

// Function to find all address for a specific user
export const findAll = async (query: FindAllInterface) => {
  const { userId } = query;
  const addressRepository = connectionPool.getRepository(Address);
  // Find all address items for the specified user, ordered by updated_at in descending order
  const allAddress: AddressInterface[] = await addressRepository.find({
    where: { user: new User(userId || 0) },
    order: {
      updated_at: "DESC",
    },
  });
  return allAddress;
};

// Function to find all address for a specific user
export const findAddressById = async (id: number) => {
  const addressRepository = connectionPool.getRepository(Address);
  // Find all address items for the specified user, ordered by updated_at in descending order
  const address: AddressInterface | null = await addressRepository.findOneBy({ id: id });
  if(address){
    return `${address.name} ${address.address_line1} ${address.address_line2} ${address.landmark} ${address.pincode}`
  }
  return "";
};

// Function to delete address for a specific user
export const deleteAddress = async (query: DeleteInterface) => {
  const { id } = query;
  const addressRepository = connectionPool.getRepository(Address);
  // delete address items for the specified id, ordered by updated_at in descending order
  const deletedAddress = await addressRepository.delete({
    id: id,
  });
  return deletedAddress;
};
