// Recipe.js

class RecipeInstructionStep {
    constructor({
      id = null,
      instruction = '',
      order = 0,
      ingredientNames = [],
      tools = [],
    } = {}) {
      this.id = id;
      this.instruction = instruction;
      this.order = order;
      this.ingredientNames = ingredientNames;
      this.tools = tools;
    }
  
    asJson() {
      return {
        id: this.id,
        instruction: this.instruction,
        order: this.order,
        ingredientNames: this.ingredientNames || [],
        tools: this.tools || [],
      };
    }
  }
  
  class Ingredient {
    constructor({
      id = null,
      name = '',
      quantity = '',
      measurement = '',
      preparation = '',
      notes = '',
    } = {}) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.measurement = measurement;
      this.preparation = preparation;
      this.notes = notes;
    }
  
    asJson() {
      return {
        id: this.id,
        name: this.name,
        quantity: this.quantity,
        measurement: this.measurement,
        preparation: this.preparation,
        notes: this.notes,
      };
    }
  }
  
  class Recipe {
    constructor({
      id = null,
      name = null,
      aka = [],
      origin = null,
      servings = null,
      description = null,
      category = null,
      cuisine = null,
      prepTimeMinutes = null,
      cookTimeMinutes = null,
      totalTimeMinutes = null,
      sourceUrl = null,
      imageUrl = [],
      primaryLanguage = 'en',
      ingredients = [],
      ingredientNames = [],
      instructionText = [],
      instructions = [],
      dietaryPreferences = [],
      tools = [],
      totalCalories = null,
      fatCalories = null,
      proteinCalories = null,
      carbohydrateCalories = null,
      createdDate = null,
      modifiedDate = null,
      createdBy = null,
      modifiedBy = null,
    } = {}) {
      this.id = id;
      this.name = name;
      this.aka = aka;
      this.origin = origin;
      this.servings = servings;
      this.description = description;
      this.category = category;
      this.cuisine = cuisine;
      this.prepTimeMinutes = prepTimeMinutes;
      this.cookTimeMinutes = cookTimeMinutes;
      this.totalTimeMinutes = totalTimeMinutes;
      this.sourceUrl = sourceUrl;
      this.imageUrl = imageUrl;
      this.primaryLanguage = primaryLanguage;
      this.ingredients = ingredients.map((ing) => new Ingredient(ing));
      this.ingredientNames = ingredientNames;
      this.instructionText = instructionText;
      this.instructions = instructions.map((inst) => new RecipeInstructionStep(inst));
      this.dietaryPreferences = dietaryPreferences;
      this.tools = tools;
      this.totalCalories = totalCalories;
      this.fatCalories = fatCalories;
      this.proteinCalories = proteinCalories;
      this.carbohydrateCalories = carbohydrateCalories;
      this.createdDate = createdDate || new Date().toISOString();
      this.modifiedDate = modifiedDate || new Date().toISOString();
      this.createdBy = createdBy;
      this.modifiedBy = modifiedBy;
    }
  
    asJson() {
      return {
        id: this.id,
        name: this.name,
        aka: this.aka || [],
        origin: this.origin,
        servings: this.servings,
        description: this.description,
        category: this.category,
        cuisine: this.cuisine,
        prepTimeMinutes: this.prepTimeMinutes,
        cookTimeMinutes: this.cookTimeMinutes,
        totalTimeMinutes: this.totalTimeMinutes,
        totalCalories: this.totalCalories,
        fatCalories: this.fatCalories,
        proteinCalories: this.proteinCalories,
        carbohydrateCalories: this.carbohydrateCalories,
        sourceUrl: this.sourceUrl,
        imageUrl: this.imageUrl || [],
        primaryLanguage: this.primaryLanguage,
        ingredients: this.ingredients.map((ingredient) => ingredient.asJson()),
        ingredientNames: this.ingredientNames || [],
        instructionText: this.instructionText || [],
        // Uncomment the next line if you want to include instructions in the JSON output
        // "instructions": this.instructions.map((instruction) => instruction.asJson()),
        dietaryPreferences: this.dietaryPreferences || [],
        tools: this.tools || [],
        createdDate: this.createdDate,
        modifiedDate: this.modifiedDate,
        createdBy: this.createdBy,
        modifiedBy: this.modifiedBy,
      };
    }
  
    ingredientsAsJson() {
      return this.ingredients.map((ingredient) => ingredient.asJson());
    }
  }
  
  class Recipes {
    constructor(recipes = []) {
      this.recipes = recipes.map((recipe) => new Recipe(recipe));
    }
  
    append(recipe) {
      this.recipes.push(new Recipe(recipe));
    }
  
    asJson() {
      return this.recipes.map((recipe) => recipe.asJson());
    }
  }
  
  module.exports = {
    RecipeInstructionStep,
    Ingredient,
    Recipe,
    Recipes,
  };