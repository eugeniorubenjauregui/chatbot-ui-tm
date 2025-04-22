// src/services/apiService.js
import Config from '../constants/config';

class ApiService {
  constructor() {
    this.baseURL = Config.USE_SERVER
      ? `https://${Config.ROOT_URL_SERVER}`
      : `http://${Config.ROOT_URL_LOCAL}`;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Helper methods
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Get headers for requests
  ///////////////////////////////////////////////////////////////////////////////////////////
  getHeaders(accessToken = null) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': Config.API_KEY,
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Generic method to make API calls
  ///////////////////////////////////////////////////////////////////////////////////////////
  async request(url, method = 'GET', data = null, accessToken = null) {
    const headers = this.getHeaders(accessToken);
    const options = { method, headers };
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(`${this.baseURL}${url}`, options);
      const contentType = response.headers.get('content-type');
      let responseData = contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(responseData.message || 'API request failed');
      }
      return responseData;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Implement the API methods
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////////////////
  // loginAnonymous() - 
  /////////////////////////////////////////////////////////////////////////////
  async loginAnonymous() {
    const url = Config.URL_LOGIN_ANONYMOUS;
    return await this.request(url, 'POST');
  }

  /////////////////////////////////////////////////////////////////////////////
  // doLogin() for known users
  /////////////////////////////////////////////////////////////////////////////
  async doLogin(username, password) {
  
    if (!password) {
      password = window.prompt("Password:"); // Use a secure input prompt in production
    }
  
    const payload = new URLSearchParams({
      grant_type: 'password',
      username: username,
      password: password,
      scope: '',
      client_id: '',
      client_secret: ''
    });
  
    let url;
    const headers = this.getHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";

    if (Config.USE_SERVER) {
      url = `https://${Config.ROOT_URL_SERVER}${Config.URL_LOGIN}`;
    } else {
      url = `http://${Config.ROOT_URL_LOCAL}${Config.URL_LOGIN}`;
    }
    // const url = `${USE_SERVER ? Config.ROOT_URL_SERVER : Config.ROOT_URL_LOCAL}${Config.URL_LOGIN}`;
    // alert(`Login URL: ${url}`);

    console.log(`Login URL: ${url} with Headers: ${JSON.stringify(headers, null, 4)} and Payload: ${payload}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: payload,
      });
  
      let localAccessToken = null;
      let jsonResp = await response.json();
      // alert(`Response: ${JSON.stringify(jsonResp)}`);
      if (jsonResp && 'access_token' in jsonResp) {
        console.log(jsonResp);
        localAccessToken = jsonResp['access_token'];
        // setUserToken(localAccessToken);
        console.log(`The userToken that was just set: ${localAccessToken}`);
        return jsonResp;
      }
  
      return `Login failed for ${username}. Please try again.`;
  
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return `Login failed for ${username}. Please try again.`;
    }
  };
  

  /////////////////////////////////////////////////////////////////////////////
  // Call the LLM to initialize the user session
  /////////////////////////////////////////////////////////////////////////////
  async getUserProfile(username, userToken = null) {
    let llmResponse = null;
    try {
      llmResponse = await this.callLLMService("login", userToken, username);
    } catch (error) { 
      console.error(`Error calling LLM Service: ${error}`);
    }
    console.log(`LLM Response to "login" request: ${llmResponse}`);

    // Extract the current user's shopping list as specified on the server
    if (llmResponse && typeof llmResponse === 'string') {
      const jsonResp = JSON.parse(llmResponse);
      
      if ("ShoppingList" in jsonResp && "name" in jsonResp.ShoppingList) {
        console.log(`Current Shopping List from server: ${jsonResp.ShoppingList.name}`);
        // setCurrShoppingListId(jsonResp.ShoppingList.id);
        console.log(`setCurrShoppingListId: ${jsonResp.ShoppingList.id}`);
        // setCurrShoppingList(jsonResp.ShoppingList);
      }
      return jsonResp;
    }
}

  /////////////////////////////////////////////////////////////////////////////
  // Call the generic LLM endpoint
  /////////////////////////////////////////////////////////////////////////////
  async doServiceCall(serviceRoute, method, headers, payload, params, username) {

    const encodedParams = new URLSearchParams(params).toString();

    console.log(`doServiceCall::Service Route: ${serviceRoute}, Method: ${method}, Params: ${JSON.stringify(params)}, Headers: ${JSON.stringify(headers)}, Payload: ${payload}, User: ${username}`);
    
    let url = null;
    if (Config.USE_SERVER) {
      url = `https://${Config.ROOT_URL_SERVER}${serviceRoute}?${encodedParams}`;
    } else {
      url = `http://${Config.ROOT_URL_LOCAL}${serviceRoute}?${encodedParams}`;
    }
    
    console.log(`LLM URL: ${url}`);

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: payload,
      });
      console.info(`Service call result: ${response.status}, ${response.statusText}`);

      if (response.ok) {
        const jsonResp = await response.json();
        console.log(`Response: ${JSON.stringify(jsonResp)}`);
        
        if (jsonResp) {
          console.log(jsonResp);
          return jsonResp;
        } else {
          console.error(`Service call failed: ${response.status}, ${response.statusText}`);
          return null;
        }
      }

    } catch (error) {
      console.error(`An error occurred: ${error}`);
      console.error(`Service call failed for ${username}. Please try again.`);
      return null;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the LLM service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callLLMService(userInput, accessToken, username, chatContext = 'all', fastMode = false) {
    const context = chatContext ? chatContext : 'all';
    const payload = null
    console.log(`LLM Payload: ${payload}`);
    const headers = this.getHeaders(accessToken);
    const params = 
      { 
        user_input: userInput, 
        context: context,
        llmService: 'openai',  // 'openai' | 'groq' | 'gemini' | 'llama' | 'claude'
        fastMode: fastMode
      };

    let jsonResp = null;
    try {
      jsonResp = await this.doServiceCall(Config.URL_LLM_ACTION, 'GET', headers, payload, params, username);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
    console.log(`LLM Response to: "${userInput}" request: \n${jsonResp}`);

    return jsonResp; 
}

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the LLM service Recipe on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callLLMServiceRecipe(userInput, accessToken, username, chatContext = 'recipe', fastMode = false) {
    const context = chatContext ? chatContext : 'recipe';
    const payload = null
    console.log(`LLM Payload: ${payload}`);
    const headers = this.getHeaders(accessToken);
    const params = 
      { 
        user_input: userInput, 
        context: context,
        llmService: 'openai',  // 'openai' | 'groq' | 'gemini' | 'llama' | 'claude'
        fastMode: fastMode
      };

    let jsonResp = null;
    try {
      jsonResp = await this.doServiceCall(Config.URL_RECIPES, 'GET', headers, payload, params, username);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
    console.log(`LLM Response to Recipe: "${userInput}" request: \n${jsonResp}`);

    return jsonResp; 
}

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the image service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callImageService(file, accessToken) {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // For file uploads, use FormData and omit 'Content-Type'
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseURL}${Config.URL_IMAGES}`, {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Image upload failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Image service error:', error);
      throw error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the Shopping List service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callShopListService(itemId, itemCount, accessToken) {
    const data = { itemId, itemCount };
    // return await this.doServiceCall(Config.URL_LISTS_SKU, 'POST', headers, payload, params, username)
    return await this.request(Config.URL_LISTS_SKU, 'POST', data, accessToken);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the Add Image Constents to Shopping List service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callImageShopListService(itemList, accessToken) {
    const data = { items: itemList };
    return await this.request(Config.URL_LISTS_IMAGE, 'POST', data, accessToken);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the Preferences service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async callPrefsService(prefId, addPref = true, prefValue = null, prefStrength = null, accessToken = null) {
    const url = addPref ? Config.URL_ADD_PREF : Config.URL_REMOVE_PREF;
    const data = { prefId, prefValue, prefStrength };
    return await this.request(url, 'POST', data, accessToken);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Call the Shopping List service on the server
  ///////////////////////////////////////////////////////////////////////////////////////////
  async fetchShoppingList(accessToken, username, chatContext = 'all') {
    return await this.callLLMService("list", accessToken, username, chatContext);
  }

  // Add other methods as needed
}

const apiService = new ApiService();

export default apiService;