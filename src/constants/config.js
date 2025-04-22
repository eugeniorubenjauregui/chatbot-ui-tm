
class Config {
  static API_KEY             = "abc123";
  static MODEL_NAME          = "";
  static APP_PASSWORD        = "abc123";
  static API_KEY             = "abc123";
  static TIMEOUT             = 60000; // milliseconds
  static USE_SERVER          = true;
  static ROOT_URL_SERVER     = "dai-chat-service-public-826633408444.us-central1.run.app";
  static ROOT_URL_LOCAL      = "localhost:8001";
  static URL_LOGIN_ANONYMOUS = "/api/v1/auth/anonymous";
  static URL_LOGIN           = "/api/v1/auth/token";
  static URL_LLM             = "/api/v1/llm";
  static URL_LLM_ACTION      = "/api/v1/llm/select_action";
  static URL_RECIPES         = "/api/v1/recipes";
  static URL_IMAGES          = "/api/v1/images/";
  static URL_LISTS_SKU       = "/api/v1/shoplist/{list_id}/items/{item_id}";
  static URL_LISTS_SKU_INGR  = "/api/v1/shoplist/{list_id}/items/sku_ingr";
  static URL_LISTS_IMAGE     = "/api/v1/shoplist/{list_id}/items/image";
  static URL_ADD_PREF        = "/api/v1/users/{username}/prefs";
  static URL_REMOVE_PREF     = "/api/v1/users/{username}/prefs";
}

// Export the Config class
export default Config;