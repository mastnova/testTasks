import React, { PureComponent } from 'react';
import RangeSlider from './components/RangeSlider';
import Canvas from './components/Canvas/Canvas';

export default class App extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      sliderMax: 100,
      sliderMin: 0,
      sliderValue: 10,
      circlesNumber: 10
    };
    this.changeSliderValue = this.changeSliderValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeSliderValue(e) {
    const sliderValue = Number(e.target.value);
    if (Number.isInteger(sliderValue) &&
      sliderValue >= this.state.sliderMin &&
      sliderValue <= this.state.sliderMax) {
        this.setState({sliderValue});
    }
  }

  onSubmit() {
    this.setState({circlesNumber: this.state.sliderValue})
  }

  render() {
    return (
      <div className='App'>
        <RangeSlider
          labelStep={10}
          max={this.state.sliderMax}
          min={this.state.sliderMin}
          onChange={this.changeSliderValue}
          value={this.state.sliderValue}
        />
        <input
          className='slider-input'
          onChange={this.changeSliderValue}
          value={this.state.sliderValue}
        />
        <button
          className='buttton-submit'
          onClick={this.onSubmit}>
            Submit
        </button>
        <Canvas
          circlesNumber={this.state.circlesNumber}
          height={400}
          width={800}
        />
      </div>
    )
  }
}
