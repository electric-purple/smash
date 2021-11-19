import { MeshStandardMaterial, BoxGeometry, Mesh } from 'three';

class Cube {
  constructor(scene) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 'purple' }); // MeshBasicMaterial
    const cube = new Mesh(geometry, material);

    this.scene = scene;
    this.cube = cube;

    return cube;
  }

  addTo(scene) {
    // this.scene.add(this.cube);
    scene.add(this.cube);
  }

  tick() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}

export default Cube;
