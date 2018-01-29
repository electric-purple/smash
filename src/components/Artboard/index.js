import React, { Component } from "react";
import * as THREE from "three";

let camera, scene, renderer;

class Artboard extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   mouseX: 0,
    //   mouseY: 0
    // };

    // this.animate = () => {
    //   this._animate();
    // };

    this.mouseMove = e => {
      this.onMouseMove(e);
    };

    this.resize = () => {
      this.onResize();
    };

    // params: field of view, aspect ratio for render output, near and far clipping plane.
    // also move the camera backwards so we can see stuff! (default position is 0,0,0)
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );
    camera.position.z = 200;
    camera.position.y = 300;
    camera.position.x = -500;

    // the scene contains all the 3D object data
    scene = new THREE.Scene();
    scene.add(camera);

    // figure out what the stuff in the scene looks like, draws it
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.lookAt(scene.position);
  }

  componentDidMount() {
    this.container.appendChild(renderer.domElement);

    window.addEventListener("resize", this.resize);
    window.addEventListener("mousemove", this.mouseMove);

    this.animate();
  }

  onMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // other animation stuffs
    
    renderer.render(scene, camera);
  }

  render() {
    const { x, y } = this.state;
    return <div ref={smash => (this.container = smash)}>
        <h1>
          Mouse coordinates: {x} {y}
        </h1>
      </div>;
  }
}

export default Three;
