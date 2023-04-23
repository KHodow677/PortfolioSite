import React, { Component } from 'react';
import Constant from './Constants'

class Fish extends Component {
  constructor() {
    super();
    const buffer = 350;
    const x = typeof window !== 'undefined'
      ? Math.random() * ((window.innerWidth - buffer) - Constant.max_scale_factor * Constant.image_width)
      : 0;

    const y = typeof window !== 'undefined'
      ? Math.random() * ((window.innerHeight - buffer) - Constant.max_scale_factor * Constant.image_height)
      : 0;

    this.state = {
      x,
      xDirection: 'right',
      xVelocity: 2,
      y,
      yDirection: 'down',
      yVelocity: 1,
    };
  }  

  chooseRandomMovement() {
    let xVelocity = Math.random() * Constant.max_x_velocity;
    let yVelocity = Math.random() * Constant.max_y_velocity;
    let zVelocity = Math.random() * Constant.max_z_velocity;
    let xDirection = Math.random() < 0.5 ? 'left' : 'right';
    let yDirection = Math.random() < 0.5 ? 'up' : 'down';
    let zDirection = Math.random() < 0.5 ? 'in' : 'out';
    this.setState({
      xVelocity: xVelocity,
      yVelocity: yVelocity,
      xDirection: xDirection,
      yDirection: yDirection,
    })
  }

  tick() {
    this.move();
    if(Math.random() < Constant.chance_to_change_direction) {
      this.chooseRandomMovement();
    }
  }

  relocate() {
    const buffer = 350;
  
    this.setState({
      x: Math.random() * ((window.innerWidth - buffer) - Constant.max_scale_factor * Constant.image_width),
      y: Math.random() * ((window.innerHeight - buffer) - Constant.max_scale_factor * Constant.image_height),
      yDirection: 'down',
      yVelocity: 1,
    })
  }
  

  move() {
    const bufferWLeft = 0;
    const bufferWRight = 400;
    const bufferHBot = 600;
    const bufferHTop = 0;
    let { xVelocity, xDirection, yVelocity, yDirection } = this.state;
  
    if (this.state.x > (window.innerWidth - bufferWRight) || this.state.y > (window.innerHeight - bufferHBot)) {
      this.relocate(); // if the fish is outside the window (window was resized, probably)
    }
  
    if (this.state.x > ((window.innerWidth - bufferWRight) - 0.5 * Constant.image_width)) {
      xDirection = 'right'; // change from 'left' to 'right'
    } else if (this.state.x < bufferWLeft + 0.5 * Constant.image_width) {
      xDirection = 'left'; // change from 'right' to 'left'
    }
  
    if (this.state.y > ((window.innerHeight - bufferHBot) - 0.5 * Constant.image_height)) {
      yDirection = 'down'; // change from 'up' to 'down'
    } else if (this.state.y < bufferHTop + 0.5 * Constant.image_height) {
      yDirection = 'up'; // change from 'down' to 'up'
    }
  
    const newX = this.state.x + (xDirection === 'right' ? -xVelocity : xVelocity); // swap direction values
    const newY = this.state.y + (yDirection === 'down' ? -yVelocity : yVelocity); // swap direction values
  
    this.setState({
      x: newX,
      xDirection: xDirection,
      y: newY,
      yDirection: yDirection,
    })
  }

 

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), Constant.tick_interval
    );
  }

  render() {
    const xScale = this.state.xDirection === 'left' ? 0.5 : -0.5;
    const yScale = 0.5;
  
    return (
        <img
          src={this.props.image}
          alt={this.props.alt}
          style={{
            position: 'absolute',
            left: this.state.x - Constant.image_width / 2,
            top: this.state.y + Constant.image_height / 2,
            transform: `scaleX(${xScale}) scaleY(${yScale})`
          }}
        />
      );      
  }
  
  


  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

export default Fish;