import Image from 'next/image';
import React from 'react'
import styled from 'styled-components';
import defaultImage from '../public/projectDefaultImage.jpg';
import Button from './Button';
import Tag from './Tag';

const Card = (props: {
    name: string;
    description: string;
    credits: string;
    verifier: string;
    country: string;
    rating: string;
    purpose: string;
    year: number;
    image?: string;
  }) => {
  const { name, description, credits, verifier, country, rating, purpose, year, image } = props;
  
  const handleClickTally = () => {
    console.log('tallyUp!');
  }
  
  return (
    <StyledCard>
        <CardHeader>
        <Image src={image || defaultImage} alt="Image of the project" />
        </CardHeader>
        <CardBody>
            <H3>{name}</H3>
            <Description>{description}</Description>
            <TagWrapper>
                <Tag type='credits' value={credits} />
                <Tag type='country' value={country} />
                <Tag type='year' value={year} />
                <Tag type='verifier' value={verifier} />
                <Tag type='rating' value={rating} />
                <Tag type='purpose' value={purpose} />
            </TagWrapper>
            <WrapperButton>
                <Button handler={handleClickTally} text="tally up" />
            </WrapperButton>
        </CardBody>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  width: 310px;
  height: 530px;
  border-radius: 27px;
  position: relative;
  box-shadow: 4px 4px 76px -18px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const CardHeader = styled.div`
  top: 0;
  left: 0;
  margin: 0;
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const CardBody = styled.div`
  width: auto;
  height: auto;
  padding: 10px 10px;
`;

const H3 = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 13px;
  margin-bottom: 10px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const WrapperButton = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Card;
