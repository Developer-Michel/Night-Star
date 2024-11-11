import { createContext } from "react";
import { Section, SectionDto } from "types/Types";

export const RecipeContext = createContext<RecipeContextData>({} as RecipeContextData);
export const RecipeContextConsumer = RecipeContext.Consumer;

export interface RecipeContextData {
  selectedRecipeId: number | null;
  sections: SectionDto[];
  setSelectedRecipeId: React.Dispatch<React.SetStateAction<number | null>>;
  addSection: (section: Section) => void;

  setSelectedSection: (section: Section) => void;
  selectedSection: Section | null;
}
