import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";
import PropTypes from 'prop-types';

function Carousel({ images }) {
 
   
    const [slide, setSlide] = useState(0);
    
  const nextSlide = () => {
   
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };


    return (
      <div className="carouselDiv">
            <div className="carousel" >
                <BsArrowLeftCircleFill onClick={prevSlide}className="arrow arrow-left"   />
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
          
                    onClick={nextSlide}
                     className="arrow arrow-right"
          />
          </div> 
       <span className="indicators">
        {images.map((item, idx) => {
            return (
                <button
                    key={idx}
            className={slide === idx ? "button buttonnactive" : "button"}
                onClick={() => setSlide(idx)}
              >
                <img
            src={window.location.origin + `/images/${item.imageName}`}
            alt="Product Image"
                  key={idx}
                  className="buttonImage"
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