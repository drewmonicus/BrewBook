import { useParams, useNavigate, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import axios from "axios";
import { useAuth } from "../context/authContext";

function RecipeView() {
  const { id } = useParams();
  const { recipes, fetchRecipes, bookmarkRecipe, isRecipeBookmarked } =
    useRecipes();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const recipe = recipes.find((recipe) => recipe._id === id);

  const isBookmarked = userInfo && isRecipeBookmarked(recipe, userInfo._id);

  const handleBookmark = () => {
    bookmarkRecipe(id);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/recipes/${id}`);
    await fetchRecipes();
    navigate("/recipes");
  };

  if (!recipe) return <div>Not a valid recipe !</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-3">{recipe.title}</h2>
      <p className="text-muted">{recipe.description}</p>
      <div className="mb-4">
        <h5>Ingredients</h5>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h5>Steps</h5>
        <ol>
          {recipe.steps.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
      <button
        onClick={handleBookmark}
        className={`btn ${
          isBookmarked ? "btn-brown" : "btn-outline-secondary"
        }`}
      >
        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
      {userInfo && recipe.createdBy === userInfo._id && (
        <div className="btn">
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>

          <Link to={`/recipes/${id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecipeView;
