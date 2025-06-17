import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { toast } from "react-toastify";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const navigate = useNavigate();
  const { fetchRecipes } = useRecipes();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ingredients: formData.ingredients
        .split("\n")
        .map((str) => str.trim())
        .filter((item) => item !== ""),
      steps: formData.steps
        .split("\n")
        .map((str) => str.trim())
        .filter((item) => item !== ""),
    };

    try {
      await axios.post("/api/recipes", payload, { withCredentials: true });
      fetchRecipes();
      navigate("/recipes");
      toast.success("Recipe created!", {
        position: "bottom-left",
      });
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
      });
    } catch (err) {
      err.response && err.response.status === 400
        ? toast.error(err.response.data.message, {
            position: "bottom-left",
          })
        : toast.error("Server error");
    }
  };

  return (
    <div className="container py-3">
      <div className="row">
        <h2 className="text-center">Create Recipe</h2>
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
                placeholder="minimum 10 characters"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                name="ingredients"
                placeholder="separate each ingredient in a new line"
                rows="5"
                value={formData.ingredients}
                onChange={handleChange}
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
                placeholder="separate each step in a new line"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-primary">Submit Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
