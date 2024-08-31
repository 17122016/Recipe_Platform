import Recipe from '../Models/Recipe.js';

// Create a new recipe
export const createRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body);
    try {
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedRecipe) {
            res.status(200).json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
    try {
        const result = await Recipe.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(204).end(); // No content
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
