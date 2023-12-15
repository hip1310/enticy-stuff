// Define an interface named CategoryInterface to represent the structure of a user object.
export interface CategoryInterface {
  // Numeric identifier for the category.
  id: number;

  // The name of the category.
  name: string;

  // The contentfulId is id of contentful content of the category.
  contentfulId: string;
}
