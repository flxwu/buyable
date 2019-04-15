import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import CarouselCard from './CarouselCard';

import '../../../style/slick.css';
import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';

const Carousel = ({
  slidesToShow = 3,
  autoplaySpeed = 2000,
  asyncItemsUrl
}) => {
  const [items, setItems] = useState(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed,
    pauseOnHover: true
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(asyncItemsUrl);
      setItems(data);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const content = () => {
    switch (items) {
      case null:
        return <LoadingSpinner />;
      case []:
        return null;
      default:
        return items.map((item, i) => (
          <CarouselCard key={i} title={item.title} imageURL={item.imageURL} />
        ));
    }
  };

  return <Slider {...settings}>{content()}</Slider>;
};

export default Carousel;
