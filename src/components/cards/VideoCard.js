// src/components/cards/VideoCard.js
import React, { useRef, useState, useEffect } from 'react';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

function VideoCard({ data, isRTL }) {
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
    console.log(`VideoCard action: ${action}`);
  };

  const handleContentClick = () => {
    // Navigate to video details or external link
    console.log('VideoCard content clicked');
  };

  return (
    <BaseCard
      title={data.title || t('Video')}
      headerColor='#60AB67'
      onActionClick={handleActionClick}
      onContentClick={handleContentClick}
      showRating={false}
      isRTL={isRTL}
    >
      {/* Video Content */}
      <div ref={ref}>
        <video
          ref={videoRef}
          src={data.videoUrl}
          width="100%"
          height="auto"
          muted
          loop
          playsInline
          controls={true} // Hide default controls if desired
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: '100%', // Ensure it doesn't exceed parent container
          }}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
        >
          {t('Your browser does not support the video tag.')}
        </video>
        {data.description && <p>{t(data.description)}</p>}
      </div>
    </BaseCard>
  );
}

VideoCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    videoUrl: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
    c: PropTypes.string,
    actionMenu: PropTypes.array,
  }).isRequired,
  isRTL: PropTypes.bool,
};

export default VideoCard;