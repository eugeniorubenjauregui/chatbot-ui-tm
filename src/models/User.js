// /models/User.js

class User {
        constructor({
                username,
                displayName,
                email,
                roles = [],
                allLists = [],
                allRetailers = [],
                currentList = {},
                haveList = null,
                currentRecipe = null,
                currentMealPlan = null,
                userPrefs = [],
                extractedUserPrefs = [],
                actions = {},
                currentActionId = null,
                bgActions = [],
                ...otherProps
        } = {}) {
            this.username = username; // Typically the email address
            this.displayName = displayName;
            this.email = email || username; // If email is not provided, use username
            this.roles = roles; // Array of roles (e.g., ['admin', 'user'])
            this.allLists = []; // List of all shopping lists for the user
            this.allRetailers = []; // List of all retailers that the user has access to
            this.currentList = {}; // Current shopping list
            this.haveList = null; // Shopping list
            this.currentRecipe = null; // Current recipe
            this.currentMealPlan = null; // Current meal plan
            this.userPrefs = []; // User preferences
            this.extractedUserPrefs = []; // Extracted user preferences
            this.actions = {}; // User actions
            this.currentActionId = null; // Current action ID
            this.bgActions = []; // Background actions
            // Include any other properties you need
            Object.assign(this, otherProps);
        }
    
        // Add any methods if necessary
        hasRole(role) {
            return this.roles.includes(role);
        }
    
        // Serialize to JSON if needed
        toJSON() {
            return {
                username: this.username,
                displayName: this.displayName,
                email: this.email,
                roles: this.roles,
                allLists: this.allLists,
                allRetailers: this.allRetailers,
                currentList: this.currentList,
                haveList: this.haveList,
                currentRecipe: this.currentRecipe,
                currentMealPlan: this.currentMealPlan,
                userPrefs: this.userPrefs,
                extractedUserPrefs: this.extractedUserPrefs,
                actions: this.actions,
                currentActionId: this.currentActionId,
                bgActions: this.bgActions,
                // Include other properties
            };
        }
    }
  
  export default User;