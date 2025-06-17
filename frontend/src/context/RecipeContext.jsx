import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const RecipeContext = createContext(null);

export const useRecipes = () => useContext(RecipeContext);

export const RecipeContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  const bookmarkRecipe = async (recipeId) => {
    try {
      const res = await axios.post(
        `/api/recipes/${recipeId}/bookmark`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        await fetchRecipes();
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const isRecipeBookmarked = (recipe, userId) => {
    if (!recipe || !userId) return false;
    return recipe.bookmarkedBy.map((id) => id.toString()).includes(userId);
  };

  const value = {
    recipes,
    fetchRecipes,
    setRecipes,
    bookmarkRecipe,
    isRecipeBookmarked,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};

export default RecipeContext;
