import Category from "../models/category";

// TODO: find images with consistent borders some have white border some none which makes page icky

export const CATEGORIES = [
  new Category('c1', 'Soup', 'https://spoonacular.com/recipeImages/635684-312x231.jpg', 'soup'),
  new Category('c2', 'Salad', 'https://spoonacular.com/recipeImages/649264-312x231.jpg', 'salad'),
  new Category('c3', 'Main', 'https://spoonacular.com/recipeImages/635874-312x231.jpg', 'main'),
  new Category('c4', 'Pasta', 'https://spoonacular.com/recipeImages/716429-556x370.jpg', 'pasta'),
  new Category('c5', 'Dessert', 'https://spoonacular.com/recipeImages/90629-312x231.jpg', 'dessert'),
  new Category('c6', 'Cakes', 'https://spoonacular.com/recipeImages/661721-312x231.jpg', 'cake'),
  new Category('c7', 'Jams & Preserves', 'https://spoonacular.com/cdn/ingredients_100x100/apricot-jam.jpg', 'jam')
];
