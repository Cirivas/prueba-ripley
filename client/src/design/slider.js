// Built based on https://medium.com/@ItsMeDannyZ/build-an-image-slider-with-react-es6-264368de68e4
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SlidesContainer = styled.div`
  height: 400px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%",
    height: 400,
    display: "inline-block",
    width: "100%"
  };
  return <div className="slide" style={styles} />;
};

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: ${({ translateValue }) => `translateX(${translateValue}px)`};
  transition: transform ease-out 0.45s;
`;

const Arrow = styled.i`
  border: solid grey;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 18px;
  transform: ${({ side }) =>
    side === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
  position: absolute;
  top: calc(50% - 55px);
  ${({ side }) => (side === "left" ? "left: 20px" : "right: 20px")}
  z-index: 2;
`;

const Slider = ({ images }) => {
  const [{ currentIndex, translateValue }, setCurrentIndex] = React.useState({
    currentIndex: 0,
    translateValue: 0
  });

  const decrementIndex = () => {
    if (currentIndex === 0) {
      return setCurrentIndex({
        translateValue: -slideWidth() * (images.length - 1),
        currentIndex: images.length - 1
      });
    }
    setCurrentIndex(prev => ({
      translateValue: prev.translateValue + slideWidth(),
      currentIndex: prev.currentIndex - 1
    }));
  };

  const incrementIndex = () => {
    if (currentIndex === images.length - 1) {
      return setCurrentIndex({ currentIndex: 0, translateValue: 0 });
    }
    setCurrentIndex(prev => ({
      translateValue: prev.translateValue - slideWidth(),
      currentIndex: prev.currentIndex + 1
    }));
  };

  const slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  return (
    <SlidesContainer>
      <Arrow side={"left"} onClick={decrementIndex} />
      <Arrow side={"right"} onClick={incrementIndex} />
      <SliderWrapper translateValue={translateValue}>
        {(images || []).map((image, index) => (
          <Slide key={index} image={image} />
        ))}
      </SliderWrapper>
    </SlidesContainer>
  );
};

Slider.propTypes = {
  images: PropTypes.array.isRequired
};

export default Slider;
