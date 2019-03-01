import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props){
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        pauseOnHover: true,

    }

    return(
        <Slider {...settings}>
            <div className="slick-image"><img src="/images/homepage1_1.jpg" alt=""/></div>
            <div className="slick-image"><img src="/images/homepage1_2.jpg" alt=""/></div>
            <div className="slick-image"><img src="/images/homepage1_3.jpg" alt=""/></div>
        </Slider>
    )
}

export default Carousel;