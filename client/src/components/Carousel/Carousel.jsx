import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";
import PropTypes from 'prop-types';

function Carousel({ images }) {
  console.log(images)
   
    const [slide, setSlide] = useState(0);
    
  const nextSlide = () => {
      console.log(slide)
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };


    return (
      
            <div className="carousel"   key="carousel">
                <BsArrowLeftCircleFill onClick={prevSlide}className="arrow arrow-left"   key="leftArrow"/>
      {images.map((item, idx) => {
          return (
           

          <img
            src={window.location.origin + `/images/${item.imageName}`}
            alt="Product Image"
            key={idx}
                className={slide === idx ? "slide" : "slide slide-hidden"}
              />
          
        );
      })}
        <BsArrowRightCircleFill
           key="rightArrow"
                    onClick={nextSlide}
                     className="arrow arrow-right"
      />
       <span className="indicators">
        {images.map((item, idx) => {
            return (
                <button
                    key={idx}
            className={slide === idx ? "buttonnactive" : ""}
                onClick={() => setSlide(idx)}
              >
                <img
            src={window.location.origin + `/images/${item.imageName}`}
            alt="Product Image"
            key={idx}
                  width="25px"
                  height="25px"
              />
            </button>
          );
        })}
      </span>
    </div>
       
    )
}

Carousel.propTypes = {
  images: PropTypes.array,
};

export default Carousel