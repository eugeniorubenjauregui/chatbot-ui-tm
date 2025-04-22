// src/MainPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ControlPanel from './components/ControlPanel';
import ChatbotButton from './components/ChatbotButton';
import Chatbot from './components/Chatbot';
import LanguageSwitcher from './components/LanguageSwitcher';
import BlinklinkCarousel from './components/BlinklinkCarousel';
import { useTranslation } from 'react-i18next';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ShoppingListProvider } from './contexts/ShoppingListContext';
import { useAuth } from './contexts/AuthContext'; // Assuming useAuth is a custom hook to access AuthContext

// Import the new ChatbotContext
import { useChatbotContext } from './contexts/ChatbotContext';

// ===== NEW Imports for Hierarchical Navigation =====
import CategoryTree from './MainPageComponents/CategoryTree'; 
import DetailPanel from './MainPageComponents/DetailPanel';
import catalogData from './data/catalogData'; // External file with your categories/products

// ===== Styled Components (existing + new) =====

// The outermost container: stacked top-to-bottom
const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

// Container for the search input and button
const SearchBoxContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const SearchButton = styled.button`
  padding: 10px;
  font-size: 1.5rem;
  background: ${(props) => props.theme.buttons.background};
  color: white;
  border: none;
  cursor: pointer;
`;

// The top bar holding the search input (centered)
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the Logo horizontally */
  padding-right: 16px;
`;

// The top bar holding the search input (centered)
// background-color: #f1f1f1;
const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center the Search Bar horizontally */
  padding: 8px;
  background-color: #fff;
`;

// The menu bar 
// background-color: #f1f1f1;
const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center the Search Bar horizontally */
  padding: 8px;
  width: 100%;
  height: 80px;
  background-color: #f1f1f1;
`;

const SearchInput = styled.input`
  width: 50%; /* Middle 50% of screen width */
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1.5rem;
`;

// The middle section: left navigation + right content
const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.$isRTL ? 'row-reverse' : 'row')};
`;

/** 
 * Left controls container: houses LanguageSwitcher, ControlPanel, 
 * and the CategoryTree 
 */
const ControlsContainer = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  padding: 20px;
  overflow-y: auto;
  border-right: ${(props) => (props.$isRTL ? 'none' : '1px solid #ccc')};
  border-left: ${(props) => (props.$isRTL ? '1px solid #ccc' : 'none')};

  /* Optional: Add transition for smooth border changes */
  transition: border-right 0.3s ease, border-left 0.3s ease;
`;

// The right side: where the main content + detail panel + chatbot appear
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent parent from scrolling */
  min-height: 0; /* Allow children to shrink */
`;

// Our main content area with a banner, carousel, detail panel, etc.
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.contentBackground};
  overflow-y: auto;

  /* Optional: smooth scrolling */
  scroll-behavior: smooth;
`;

// Title banner from your existing code
const TitleBanner = styled.div`
  text-align: ${(props) => (props.$isRTL ? 'right' : 'left')};
  margin-bottom: 32px;

  h1 {
    font-size: 2.5rem;
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
    line-height: 1.2;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.textSecondary};
    margin-top: 8px;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.25rem;
    }
  }
`;

const CarouselContainer = styled.div`
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.card};
  width: 100%;

  .blinklink-carousel {
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    .blinklink-carousel {
      height: 200px; /* Adjust as necessary */
    }
  }
`;

// ===== MainPage Component =====
function MainPage() {
  const [stateData, setStateData] = useState({});
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const { userToken, userId } = useAuth(); // Access user data and services from AuthContext

  // These states control which "page" we're showing in the detail panel:
  const [pageType, setPageType] = useState(null); // 'category' | 'product' | 'search' | null
  const [detailData, setDetailData] = useState(null); // data for DetailPanel
  const [searchQuery, setSearchQuery] = useState('');

  const { i18n } = useTranslation();
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(i18n.language);

  // Toggles the chatbot open/close
  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  // Keep document direction updated for RTL languages
  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Use the ChatbotContext hook to access setChatbotContext
  const { setChatbotContext } = useChatbotContext();

  // ====== Chatbot Integration Helpers ======
  const sendContextToChatbot = (contextDoc) => {
    // In a real app, you might pass this object to the Chatbot’s context,
    // or call a method on the Chatbot to handle new context.
    console.log('Sending context to Chatbot:', contextDoc);

    // Instead of just logging or calling a local function,
    // we store the contextDoc in our new ChatbotContext state
    setChatbotContext(contextDoc);
  };

  // Build the context object for passing to chatbot
  const buildContextDocument = ({
    pageType,
    catalogCategory,
    catalogContext,
    name,
    price = 0,
    brand = '',
  }) => {
    return {
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageType, // e.g., "productDetailPage"
      catalogCategory, // e.g., "Oils"
      catalogContext,  // e.g., "/Home/Oils/Olive Oils"
      catalogContextDetail: '',
      sourceUrl: 'sampleSource',
      userId: userId,
      name,
      description: 'description',
      brand,
      price,
      nutritionInfo: '',
      onPageRecommendations: '',
      geography: '',
      storeId: 'Kroger 1278 Dallas',
      storeLocation: '123 Denton Park Dr, Dallas, TX 75012',
      retailerId: '123451',
      retailerName: 'Kroger',
    };
  };

  // ====== Navigation Handlers ======

  // Called when user clicks on a category
  const handleCategoryClick = (node, fullPath) => {
    setPageType('category');
    setDetailData({
      name: node.name,
      fullPath,  // The /Home/... path from the CategoryTree
    });

    const contextDoc = buildContextDocument({
      pageType: 'categoryDetailPage',
      catalogCategory: node.name,
      catalogContext: fullPath,
      name: node.name,
    });
    sendContextToChatbot(contextDoc);
  };

  // Called when user clicks on a product
  const handleProductClick = (categoryNode, product, fullPath) => {
    setPageType('product');
    setDetailData({
      id: product.id,
      name: product.name,
      brand: 'Bertoli', // Example brand
      price: 28.99,     // Example price
      fullPath,         // The /Home/... path from the CategoryTree
    });

    const contextDoc = buildContextDocument({
      pageType: 'productDetailPage',
      catalogCategory: categoryNode.name,
      catalogContext: fullPath,
      name: product.name,
      price: 28.99,
      brand: 'Bertoli',
    });
    sendContextToChatbot(contextDoc);
  };

  // Called when user hits Enter in the search bar
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };
  // Or if you want a search button, you can call performSearch onClick

  const performSearch = () => {
    setPageType('search');
    const mockResults = [
      { id: 'search-001', name: `Result A for "${searchQuery}"` },
      { id: 'search-002', name: `Result B for "${searchQuery}"` },
    ];
    setDetailData({
      query: searchQuery,
      results: mockResults,
    });

    const contextDoc = buildContextDocument({
      pageType: 'searchResultsPage',
      catalogCategory: 'search',
      catalogContext: '/search',
      name: '',  // no specific item name in a search
    });
    sendContextToChatbot(contextDoc);
  };

  return (
    <AuthProvider>
      <ShoppingListProvider>
        <DataProvider>
          {/* Wrap your entire MainPage layout in the ChatbotProvider */}
          
            <OuterContainer>
              {/* ===== MIDDLE SECTION: Left Nav + Right Content ===== */}
              <MiddleSection $isRTL={isRTL}>
                {/* RIGHT SIDE: Main Content, including detail panel and chatbot */}
                <ContentContainer>
                  <MainContent>

                    {/* Chatbot */}
                    <Chatbot setStateData={setStateData} isRTL={isRTL} />
             
                  </MainContent>
                </ContentContainer>
              </MiddleSection>
            </OuterContainer>
          
        </DataProvider>
      </ShoppingListProvider>
    </AuthProvider>
  );
}

export default MainPage;