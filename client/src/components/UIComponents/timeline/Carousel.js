import React, { useState } from 'react';
import Slider from 'react-slick';

import CarouselCard from './CarouselCard';

import '../../../style/slick.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <Slider {...settings}>
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
      <CarouselCard
        title="Item 1"
        imageUrl="https://www.ikea.com/us/en/images/products/gamlared-table__0517435_PE640691_S4.JPG"
      />
    </Slider>
  );
};

export default Carousel;
