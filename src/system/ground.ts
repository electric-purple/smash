import * as CANNON from 'cannon-es';
import {
  MeshStandardMaterial,
  PlaneGeometry,
  Mesh,
  Group,
  GridHelper,
} from 'three';

const Ground = () => {
  const group = new Group();
  const geometry = new PlaneGeometry(50, 50);
  const material = new MeshStandardMaterial({ color: 'grey' });
  const grid = new GridHelper(50, 50, 0x444444, 0x555555);
  const plane = new Mesh(geometry, material);

  grid.position.set(0, 0.001, 0);

  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.receiveShadow = true;

  group.add( grid );
  group.add( plane );



    let groundBody = new CANNON.Body({
      shape: new CANNON.Plane(),
      mass: 0
    });
    groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );

    // this.world.addBody(groundBody);


  return group;
};

export default Ground;
