// src/components/cards/BlinklinkCard.js
import React, { useRef, useState, useEffect } from 'react';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import BlinklinkCarousel from '../BlinklinkCarousel';
import styled from 'styled-components';


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
      height: 300px; /* Adjust as necessary */
    }
  }
`;

function BlinklinkCard({ data, isRTL }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.5, // Adjust as needed
    triggerOnce: false,
  });

  // Handle video readiness
  const handleCanPlay = () => {
    setIsVideoReady(true);
    // If already in view, attempt to play
    if (inView && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play:', error);
      });
    }
  };

  const handleLoadedData = () => {
    setIsVideoReady(true);
    if (inView && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error attempting to play:', error);
      });
    }
  };

  // Play or pause the video based on inView state and video readiness
  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      if (inView) {
        videoRef.current.play().catch((error) => {
          console.error('Error attempting to play:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView, isVideoReady]);

  const handleActionClick = (action) => {
    // Handle share, like, more options
    console.log(`BlinklinkCard action: ${action}`);
  };

  const handleContentClick = () => {
    // Navigate to video details or external link
    console.log('BlinklinkCard content clicked');
  };

  return (
    <BaseCard
      title={data.title || t('Blinklink')}
      headerColor='#60AB67'
      onActionClick={handleActionClick}
      onContentClick={handleContentClick}
      showRating={false}
      isRTL={isRTL}
    >
      {/* Video Content */}
      <div ref={ref}>
        {/* Carousel */}
        <CarouselContainer>
            <BlinklinkCarousel />
        </CarouselContainer>
      </div>
    </BaseCard>
  );
}

BlinklinkCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    c: PropTypes.string,
    actionMenu: PropTypes.array,
  }).isRequired,
  isRTL: PropTypes.bool,
};

export default BlinklinkCard;