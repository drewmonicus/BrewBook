import RecipeCard from "./RecipeCard";
import { useRecipes } from "../context/RecipeContext";

function RecipePage() {
  const { recipes } = useRecipes();

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">All Recipes</h2>
      <div className="row g-4">
        {recipes.map((recipe) => (
          <div className="col-md-12" key={recipe._id}>
            <RecipeCard id={recipe._id} key={recipe._id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipePage;
