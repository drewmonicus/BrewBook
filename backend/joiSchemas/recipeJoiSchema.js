const Joi = require("joi");

const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(60).required(),
  description: Joi.string().min(1).max(500).required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  steps: Joi.array().items(Joi.string()).required(),
});

module.exports = recipeSchema;
