import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecipes } from "../context/RecipeContext";
import { toast } from "react-toastify";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, fetchRecipes } = useRecipes();

  const recipe = recipes.find((r) => r._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients.join("\n"),
        steps: recipe.steps.join("\n"),
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      steps: formData.steps
        .split("\n")
        .map((step) => step.trim())
        .filter((item) => item !== ""),
    };

    try {
      await axios.put(`/api/recipes/${id}`, updatedData, {
        withCredentials: true,
      });
      fetchRecipes();
      navigate(`/recipes/${id}`);
      toast.success("Edited Recipe!", {
        position: "bottom-left",
      });
    } catch (err) {
      console.error("Error updating recipe:", err);
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
    }
  };

  if (!recipe) return <div>No such recipe!</div>;

  return (
    <div className="container py-3">
      <div className="row">
        <h2 className="text-center">Edit Recipe</h2>
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                type="text"
                className="form-control"
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="steps" className="form-label">
                Steps
              </label>
              <textarea
                className="form-control"
                id="steps"
                name="steps"
                rows="5"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary">Update Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
