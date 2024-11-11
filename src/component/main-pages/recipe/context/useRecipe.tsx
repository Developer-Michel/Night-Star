import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  return context;
};
