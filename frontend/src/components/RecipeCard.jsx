import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useRecipes } from "../context/RecipeContext";

function RecipeCard({ id }) {
  const { userInfo } = useAuth();
  const { recipes, bookmarkRecipe, isRecipeBookmarked } = useRecipes();

  const recipe = recipes.find((r) => r._id === id);

  const isBookmarked = userInfo && isRecipeBookmarked(recipe, userInfo._id);

  const handleBookmark = () => {
    bookmarkRecipe(id);
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text text-muted">{recipe.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/recipes/${id}`} className="btn btn-outline-info">
            View Recipe
          </Link>
          <button
            onClick={handleBookmark}
            className={`btn ${
              isBookmarked ? "btn-brown" : "btn-outline-secondary"
            }`}
          >
            {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
