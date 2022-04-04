import React, { Component } from 'react';
import './ImageSlider.css';

class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.slides = props.slides;
        this.state = {
            currentSlide: 0,
        };
        this.setCurrentSlide = this.setCurrentSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }


    setCurrentSlide(index) {
        this.setState({ currentSlide: index });
    }

    nextSlide() {
        let newSlide =
            this.state.currentSlide === this.slides.length - 1
                ? 0
                : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
    }

    prevSlide() {
        let newSlide =
            this.state.currentSlide === 0
                ? this.slides.length - 1
                : this.state.currentSlide - 1;
        this.setState({ currentSlide: newSlide });
    }

    render() {
        const { slides } = this.props;

        return (
            <section className='slider'>
                {slides.map((slide, index) => {
                    return (
                        <div
                            className={index === this.state.currentSlide ? 'slide active' : 'slide'}
                            key={index}
                        >
                            {index === this.state.currentSlide && (
                                <img src={slide} alt='travel' className='image' />
                            )}
                        </div>
                    );
                })}
                <div className='left-arrow' onClick={this.prevSlide}>&lt;</div>
                <div className='right-arrow' onClick={this.nextSlide}>&gt;</div>
            </section>
        );
    }
};

export default ImageSlider;