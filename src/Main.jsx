import React from "react"
import IngredientsList from "./components/IngredientsList"
import MistralRecipe from "./components/MistralRecipe"
import {getRecipeFromMistral} from "./ai"

export default function Main() {
  const [ingredients, setIngredients] = React.useState(
    []
  )

  const [recipe, setRecipe] = React.useState("")

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="Add minimum of 4 items(e.g oregano, etc)"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 &&
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      }

      {recipe && <MistralRecipe recipe={recipe} />}

    </main>
  )

}