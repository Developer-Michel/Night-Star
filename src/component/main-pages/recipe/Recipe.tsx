import { useEffect, useRef, useState } from "react";
import { RecipeContextConsumer } from "./context/RecipeContext";
import { RecipeContextProvider } from "./context/RecipeProvider";
import "./Recipe.scss";
import { RecipeDto, RecipeIngredient, RecipeInstruction, Section, SectionDto } from "types/Types";
import { useRecipe } from "./context/useRecipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFilter, faTimes, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

export const Recipe = () => {
  return (
    <div className="recipe">
      <RecipeContextProvider>
        <RecipeContextConsumer>
          {(dto) => {
            if (dto.selectedRecipeId == -1) {
              return <></>;
            }
            if (dto.selectedSection != null) return <RecipeForm />;
            return <SectionContainer />;
          }}
        </RecipeContextConsumer>
      </RecipeContextProvider>
    </div>
  );
};
const SectionContainer = () => {
  const { sections } = useRecipe();
  return (
    <div>
      {sections.map((x) => (
        <SectionDropdown section={x} />
      ))}
      <AddSectionButton />
    </div>
  );
};
const SectionDropdown = ({ section }: { section: SectionDto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedSection } = useRecipe();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={"section-dropdown " + (isOpen && "open")}>
      <div className="section-header" onClick={toggleDropdown}>
        {section.Name}
        <span className="dropdown-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="section-content">
          {section.Recipes && (
            <ul className="recipes-list">
              {section.Recipes.map((recipe) => (
                <li key={recipe.Id} className="recipe-item">
                  {recipe.Name}
                </li>
              ))}
            </ul>
          )}
          {section.Sections && (
            <div className="nested-sections">
              {section.Sections.map((subSection) => (
                <SectionDropdown key={subSection.Id} section={subSection} />
              ))}
            </div>
          )}
          <button
            className="add-section-button"
            onClick={() => {
              setSelectedSection(section);
            }}>
            + Add Recipe
            <FontAwesomeIcon icon={faUtensils} />
          </button>
          <AddSectionButton parentId={section.Id} />
        </div>
      )}
    </div>
  );
};
const AddSectionButton = ({ parentId }: { parentId?: number }) => {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState("");
  const { addSection } = useRecipe();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (clicked)
      setTimeout(() => {
        ref.current?.focus();
      }, 200);
  }, [clicked]);
  return (
    <>
      {clicked ? (
        <div className="add-section-button">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            ref={ref}
            placeholder="Section name..."
          />
          <FontAwesomeIcon
            onClick={() => {
              setClicked(false);
            }}
            icon={faTimes}
          />
          <FontAwesomeIcon
            onClick={() => {
              if (value.length >= 2) {
                addSection({ Id: 0, Name: value, ParentId: parentId });
                setClicked(false);
              }
            }}
            icon={faAdd}
          />
        </div>
      ) : (
        <button
          className="add-section-button"
          onClick={() => {
            setClicked(true);
          }}>
          + Add Section
          <FontAwesomeIcon icon={faFilter} />
        </button>
      )}
    </>
  );
};

const RecipeForm: React.FC = ({ section, recipeDto }: { section?: Section; recipeDto?: RecipeDto }) => {
  const [recipe, setRecipe] = useState<RecipeDto>(
    recipeDto != null
      ? recipeDto
      : {
          Id: -1,
          Name: "",
          Description: "",
          PictureUrl: "",
          SectionId: section?.Id ?? -1,
          TimeMinCooking: 0,
          TimeMinPreparation: 0,
          LastUpdate: new Date(),
          Ingredients: [],
          Instructions: []
        }
  );
  const isInEdit = recipe == null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: name === "SectionId" || name === "TimeMinCooking" || name === "TimeMinPreparation" ? Number(value) : value
    }));
  };

  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      Ingredients: [
        ...prevRecipe.Ingredients,
        { Id: Date.now(), Quantity: 0, UomName: "", Name: "", RecipeId: prevRecipe.Id }
      ]
    }));
  };

  const updateIngredient = (index: number, field: keyof RecipeIngredient, value: any) => {
    const updatedIngredients = recipe.Ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setRecipe((prevRecipe) => ({ ...prevRecipe, Ingredients: updatedIngredients }));
  };

  const addInstruction = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      Instructions: [
        ...prevRecipe.Instructions,
        { Id: Date.now(), Description: "", VisOrder: prevRecipe.Instructions.length + 1 }
      ]
    }));
  };

  const updateInstruction = (index: number, field: keyof RecipeInstruction, value: any) => {
    const updatedInstructions = recipe.Instructions.map((instruction, i) =>
      i === index ? { ...instruction, [field]: value } : instruction
    );
    setRecipe((prevRecipe) => ({ ...prevRecipe, Instructions: updatedInstructions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Recipe:", recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <Container fluid>
        <Row>
          <Col>
            <label>
              <input
                type="text"
                placeholder="Recipe name....."
                name="Name"
                value={recipe.Name}
                onChange={handleInputChange}
                required
              />
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="zen-container">
              <span className="zen-label">Prep Time:</span>
              <div>
                <input
                  type="number"
                  name="TimeMinPreparation"
                  value={recipe.TimeMinPreparation}
                  onChange={handleInputChange}
                />
                min
              </div>
            </label>
          </Col>
          <Col>
            <label className="zen-container">
              <span className="zen-label">Cooking Time:</span>
              <div>
                <input type="number" name="TimeMinCooking" value={recipe.TimeMinCooking} onChange={handleInputChange} />{" "}
                min
              </div>
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <textarea
              name="Description"
              placeholder="Description...."
              value={recipe.Description}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="zen-subtitle">Ingredients</h3>
            {recipe.Ingredients.map((ingredient, index) => (
              <div key={ingredient.Id} className="ingredient zen-item">
                <label>
                  <input
                    type="number"
                    value={ingredient.Quantity}
                    onChange={(e) => updateIngredient(index, "Quantity", Number(e.target.value))}
                  />
                </label>
                <label>
                  <UOMSelect onUOMChange={() => {}} />
                </label>
                <label>
                  <input
                    type="text"
                    value={ingredient.Name}
                    onChange={(e) => updateIngredient(index, "Name", e.target.value)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="zen-button">
              + Add Ingredient
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="zen-subtitle">Instructions</h3>
            {recipe.Instructions.map((instruction, index) => (
              <div key={instruction.Id} className="instruction zen-item">
                <label>
                  <span className="zen-label">Step {index + 1}:</span>
                  <textarea
                    value={instruction.Description}
                    onChange={(e) => updateInstruction(index, "Description", e.target.value)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={addInstruction} className="zen-button">
              + Add Instruction
            </button>
          </Col>
        </Row>

        <button type="submit" className="zen-button zen-submit">
          Save Recipe
        </button>
      </Container>
    </form>
  );
};

const UOMSelect: React.FC<UOMSelectProps> = ({ onUOMChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUOMChange(e.target.value);
  };

  return (
    <label className="uom-select">
      <select onChange={handleChange} className="zen-select">
        <option value="" disabled>
          Select UOM
        </option>
        {cookingUOMs.map((uom) => (
          <option key={uom} value={uom}>
            {uom}
          </option>
        ))}
      </select>
    </label>
  );
};
interface UOMSelectProps {
  onUOMChange: (uom: string) => void;
}

const cookingUOMs = [
  "Teaspoon",
  "Tablespoon",
  "Cup",
  "Milliliter",
  "Liter",
  "Fluid Ounce",
  "Pint",
  "Quart",
  "Gallon",
  "Gram",
  "Kilogram",
  "Ounce",
  "Pound",
  "Pinch",
  "Dash",
  "Piece",
  "Clove",
  "Slice",
  "Can",
  "Bottle",
  "Jar",
  "Sprig",
  "Stalk",
  "Leaf"
];
