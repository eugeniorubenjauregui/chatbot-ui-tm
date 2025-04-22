import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlinklinkCarousel = () => {
  const carouselRef = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // First effect: Load scripts
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('https://unpkg.com/htmx.org@1.9.10');
        await loadScript('https://ssr.sdk.blinklink.com/loader/loader.js');
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();
  }, []);

  // Second effect: Initialize after scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded || !carouselRef.current) return;

    // Initialize Blinklink
    if (window._blinklink) {
      window._blinklink.init({
        disableClickTracking: true,
        debug: true
      });
    }

    // Initialize HTMX
    if (window.htmx) {
      window.htmx.process(carouselRef.current);
    }

    // Backup processing
    const timer = setTimeout(() => {
      if (window.htmx && carouselRef.current) {
        window.htmx.process(carouselRef.current);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [scriptsLoaded]);

  return (
    <Container>
      <div
        ref={carouselRef}
        className="blinklink-carousel"
        hx-get="https://web.sdk.blinklink.com/web/ui/carousel"
        hx-trigger="load"
        hx-swap="innerHTML"
        hx-target="this"
        hx-boost="true"
        hx-ext="json-enc"
        hx-vals='{"stream":"BlinklinkTest","placement":"Placement1","clientId":"3a94ef31-d90b-4480-8a6b-3b0f5f06b913","adaptiveAi":false,"carouselMode":"hover","miniPlayer":true,"clickStream":false,"recommendation":false}'
      />
    </Container>
  );
};

export default BlinklinkCarousel;
