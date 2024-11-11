import { useComm } from "@hooks/useComm";
import { useState, useEffect, ReactNode } from "react";
import { RecipeDto, Section, SectionDto } from "types/Types";
import { RecipeContext } from "./RecipeContext";

export const RecipeContextProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const addSection = (section: Section) => {
    api.Recipe.addSection({ dto: section, Success: refresh });
  };
  const addRecipe = (recipe: RecipeDto) => {
    api.Recipe.addRecipe({
      dto: recipe,
      Success: () => {
        setSelectedSection(null);
      }
    });
  };
  const { api } = useComm();
  const refresh = () => {
    api.Recipe.getSections({ Success: setSections });
  };
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RecipeContext.Provider
      value={{
        sections,
        selectedRecipeId,
        setSelectedRecipeId,
        addSection,
        selectedSection,
        setSelectedSection
      }}>
      {children}
    </RecipeContext.Provider>
  );
};
