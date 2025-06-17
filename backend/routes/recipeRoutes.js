const { Router } = require("express");
const verifyUser = require("../middleware/verifyUser");
const Recipe = require("../models/recipeModel");
const validateRecipe = require("../middleware/validateRecipe");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.send(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/bookmark", verifyUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const isBookmarked = recipe.bookmarkedBy.includes(userId);

    isBookmarked
      ? recipe.bookmarkedBy.pull(userId)
      : recipe.bookmarkedBy.push(userId);

    await recipe.save();

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating bookmark" });
  }
});

router.post("/", verifyUser, validateRecipe, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdBy: req.user.id,
    });

    await recipe.save();
    res.status(201).send(recipe);
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ message: "Failed to create recipe" });
  }
});

router.put("/:id", verifyUser, validateRecipe, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated", recipe: updatedRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Failed to update recipe" });
  }
});

router.delete("/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
