// src/components/cards/AdvertisementCard.js
import React from 'react';
import styled from 'styled-components';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AdvertisementContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isRTL ? 'flex-end' : 'flex-start')};
`;

const AdvertisementImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Description = styled.p`
  margin-top: 12px;
  color: ${(props) => props.theme.colors.text};
`;

function AdvertisementCard({ data, isRTL, actionMenu }) {
  const { t } = useTranslation();

  const handleActionClick = (action) => {
    switch (action) {
      case 'notInterestedSpecific':
        // Handle "Not interested this specific content"
        console.log('Not interested in this specific content');
        break;
      case 'notInterestedType':
        // Handle "Not interested this type of content or format"
        console.log('Not interested in this type of content or format');
        break;
      case 'saveForLater':
        // Handle "Save for later"
        console.log('Save for later');
        break;
      default:
        console.log(`Action "${action}" triggered`);
    }
  };

  const handleContentClick = () => {
    // Navigate to the advertisement's link
    window.open(data.link, '_blank');
  };

  return (
    <BaseCard
      title={t('(Sponsored)') + ' ' + data.title}
      headerColor='#60AB67'
      bgColor={data.bgColor}
      onActionClick={handleActionClick}
      onContentClick={handleContentClick}
      showRating={false} // Ads typically don't have ratings
      isRTL={isRTL}
      actionMenu={actionMenu}
    >
      <AdvertisementContent $isRTL={isRTL}>
        <AdvertisementImage src={data.imageUrl} alt={t('Advertisement')} />
        <Description>{t(data.description)}</Description>
      </AdvertisementContent>
    </BaseCard>
  );
}

AdvertisementCard.propTypes = {
    data: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
  }).isRequired,
  isRTL: PropTypes.bool,
  actionMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};


export default AdvertisementCard;