import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { recipes } = useRecipes();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const bookmarkedRecipes = recipes.filter(
    (recipe) =>
      recipe.bookmarkedBy && recipe.bookmarkedBy.includes(userInfo._id)
  );

  const createdRecipes = recipes.filter(
    (recipe) => recipe.createdBy && recipe.createdBy.includes(userInfo._id)
  );

  return (
    <div className="home_page container py-4">
      <h1 className="text-center">
        <span>{userInfo.username}</span>'s Dashboard
      </h1>

      <h5 className="mt-4 mb-3">Bookmarked Recipes</h5>
      {bookmarkedRecipes.length > 0 ? (
        <div className="row">
          {bookmarkedRecipes.map((recipe) => (
            <div className="col mb-3" key={recipe._id}>
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                id={recipe._id}
                bookmarkedBy={recipe.bookmarkedBy}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>You have no bookmarked recipes yet.</p>
      )}
      <h5 className="mt-4 mb-3">Created Recipes</h5>
      {createdRecipes.length > 0 ? (
        <div className="row">
          {createdRecipes.map((recipe) => (
            <div className="col" key={recipe._id}>
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                id={recipe._id}
                bookmarkedBy={recipe.bookmarkedBy}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>You have not created any recipes yet.</p>
      )}
    </div>
  );
};

export default Home;
