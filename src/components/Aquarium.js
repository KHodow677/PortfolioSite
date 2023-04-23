import React, { Component } from 'react';
import Fish from './Fish';
import styles from './Aquarium.module.css';

class Aquarium extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.water}></div>
        <Fish image='./images/fish/tropical-fish-pink.png' alt='fish'/>
        <Fish image='./images/fish/tropical-fish-orange.png' alt='fish'/>
        <Fish image='./images/fish/tropical-fish-lime.png' alt='fish'/>
      </div>
    );
  }
}

export default Aquarium;

