import connectionPool from "../../config/database";
import { Category } from "./category.entity";
import { CategoryInterface } from "./category.interface";

export const categorySync = async (body: any) => {
  const { contentfulId, name } = body;
  //if id only without name then perform delete
  //else if with id and name then perform update or create

  const categoryRepository = connectionPool.getRepository(Category);
  const response = await categoryRepository.find({
    where: { contentfulId: contentfulId },
  });

  const existingCategory: CategoryInterface = response?.[0];

  if (existingCategory && name) {
    // Category exists, update
    categoryRepository.update({ id: existingCategory.id }, { name: name });
  } else if (existingCategory && !name) {
    // Category exists, but require delete action because category is deleted in contentful
    categoryRepository.delete({ id: existingCategory.id });
  } else {
    // Category does not exist, add it
    const newCategory = categoryRepository.create({
      name: name,
      contentfulId: contentfulId,
    });
    await categoryRepository.save(newCategory);
  }
};
