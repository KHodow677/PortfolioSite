import React, { Component } from 'react';
import Constant from './Constants';

class Fish extends Component {
  constructor() {
    super();
    const bufferWRight = 500;
    const bufferHBot = 600;
    const x = typeof window !== 'undefined'
      ? Math.random() * ((window.innerWidth - bufferWRight) - Constant.max_scale_factor * Constant.image_width)
      : 0;

    const y = typeof window !== 'undefined'
      ? Math.random() * ((window.innerHeight - bufferHBot) - Constant.max_scale_factor * Constant.image_height)
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
    });
  }

  tick() {
    this.move();
    if (Math.random() < Constant.chance_to_change_direction) {
      this.chooseRandomMovement();
    }
  }

  relocate() {
    const bufferWRight = 500;
    const bufferHBot = 600;
  
    this.setState({
      x: Math.random() * ((window.innerWidth - bufferWRight) - Constant.max_scale_factor * Constant.image_width),
      y: Math.random() * ((window.innerHeight - bufferHBot) - Constant.max_scale_factor * Constant.image_height),
      yDirection: 'down',
      yVelocity: 1,
    });
  }
  

  move() {
    const bufferWLeft = 0;
    const bufferWRight = 500;
    const bufferHBot = 600;
    const bufferHTop = 0;
    const { x, xVelocity, xDirection, y, yVelocity, yDirection } = this.state;
    const newX = x + (xDirection === 'right' ? -xVelocity : xVelocity);
    const newY = y + (yDirection === 'down' ? -yVelocity : yVelocity);
  
    if (newX > ((window.innerWidth - bufferWRight) - 0.5 * Constant.image_width)) {
      this.setState({ xDirection: 'right' });
    } else if (newX < bufferWLeft + 0.5 * Constant.image_width) {
      this.setState({ xDirection: 'left' });
    }
  
    if (newY > ((window.innerHeight - bufferHBot) - 0.5 * Constant.image_height)) {
      this.setState({ yDirection: 'down' });
    } else if (newY < bufferHTop + 0.5 * Constant.image_height) {
      this.setState({ yDirection: 'up' });
    }
  
    this.setState({
      x: newX,
      y: newY,
    }, () => {
      if (newX > (window.innerWidth - bufferWRight) || newY > (window.innerHeight - bufferHBot)) {
        this.relocate();
      }
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), Constant.tick_interval
    );
  }

  render() {
    const { x, y, xDirection } = this.state;
    const xScale = xDirection === 'left' ? 0.5 : -0.5;
    const yScale = 0.5;
    const left = x - Constant.image_width / 2;
    const top = y + Constant.image_height / 2;
    
    return (
      <img
        src={this.props.image}
        alt={this.props.alt}
        style={{
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`,
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