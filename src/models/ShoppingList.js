// /src/models/ShoppingList.js

// Product Class
class Product {
    constructor(data) {
      if (data) {
        this.id = data.id;
        this.name = data.name;
        this.createdDate = data.createdDate;
        this.modifiedDate = data.modifiedDate;
        this.skuId = data.skuId;
        this.productId = data.productId;
        this.description = data.description;
        this.brand = data.brand;
        this.imageUrl = data.imageUrl;
        this.primaryLanguage = data.primaryLanguage;
        this.ingredients = data.ingredients || [];
        this.dietaryPreferences = data.dietaryPreferences || [];
        this.score = data.score;
      }
    }
  }
  
  // SkuOptions Class
  class SkuOptions {
    constructor(data) {
      if (data) {
        this.prompt = data.prompt;
        this.products = data.products.map((productData) => new Product(productData));
      }
    }
  }
  
  // ListItem Class
  class ListItem {
    constructor(data) {
      if (data) {
        this.name = data.name;
        this.brand = data.brand;
        this.quantity = data.quantity;
        this.measurement = data.measurement;
        this.size = data.size;
        this.description = data.description;
        this.preparation = data.preparation;
        this.category = data.category;
        this.id = data.id;
        this.imageUrl = data.imageUrl;
        this.isFavorite = data.isFavorite === 'True' || data.isFavorite === true;
        this.preference_conflict = data.preference_conflict || [];
        this.allergens = data.allergens;
        this.ingredientId = data.ingredientId;
        if (data.skuOptions) {
          this.skuOptions = new SkuOptions(data.skuOptions);
        }
      }
    }
  }
  
  // ListPref Class
  class ListPref {
    constructor(data) {
      if (data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.type = data.type;
        this.isCommon = data.isCommon;
        this.relType = data.relType;
        this.relPrefValue = data.relPrefValue;
        this.relPrefStrength = data.relPrefStrength;
        this.defaultPrefValue = data.defaultPrefValue;
        this.primaryLanguage = data.primaryLanguage;
        this.createdDate = data.createdDate;
        this.modifiedDate = data.modifiedDate;
      }
    }
  }
  
  // ShoppingList Class
  class ShoppingList {
    constructor(data) {
      if (data) {
        this.name = data.name || '';
        this.id = data.id || '';
        this.listType = data.listType || '';
        this.description = data.description || '';
        this.folderName = data.folderName || '';  
        this.userId = data.userId || '';
        this.isFolder = data.isFolder || false;
        if (data.listItems) {
          console.log('ShoppingList constructor for listItems array', data.listItems);
          this.listItems = data.listItems.map((itemData) => new ListItem(itemData));
        }
        if (data.listPrefs) {
          console.log('ShoppingList constructor for listPrefs array', data.listItems);
          this.listPrefs = data.listPrefs.map((prefData) => new ListPref(prefData));
        }
        this.numItems = data.numItems || 0;
      }
    }
  
    // Static method to create a ShoppingList from JSON data
    static fromJSON(data) {
      if (!data) return null;
      return new ShoppingList(data.ShoppingList ?? {});
    }
  }
  
  export default ShoppingList;