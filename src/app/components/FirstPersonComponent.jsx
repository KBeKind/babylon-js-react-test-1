import {
  Scene,
  Engine,
  SceneLoader,
  Vector3,
  HemisphericLight,
  FreeCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders";

const FirstPersonController = () => {
  //   // scene: Scene;
  //   // engine: Engine;
  //   // constructor(private canvas: HTMLCanvasElement) {
  //   constructor(canvas) {
  //     this.engine = new Engine(this.canvas, true);
  //     this.scene = this.CreateScene();
  //     this.CreateEnvironment();
  //     this.CreateController();
  //     this.engine.runRenderLoop(() => {
  //       this.scene.render();
  //     });
  //   }
  //   //CreateScene(): Scene {
  //   CreateScene() {
  //     const scene = new Scene(this.engine);
  //     new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);
  //     scene.onPointerDown = (evt) => {
  //       if (evt.button === 0) this.engine.enterPointerlock();
  //       if (evt.button === 1) this.engine.exitPointerlock();
  //     };
  //     const framesPerSecond = 60;
  //     // const gravity = -9.81;
  //     const gravity = 0;
  //     scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
  //     scene.collisionsEnabled = true;
  //     return scene;
  //   }
  //   // async CreateEnvironment(): Promise<void> {
  //   async CreateEnvironment() {
  //     const { meshes } = await SceneLoader.ImportMeshAsync(
  //       "",
  //       "./models/",
  //       "Prototype_Level.glb",
  //       this.scene
  //     );
  //     meshes.map((mesh) => {
  //       mesh.checkCollisions = true;
  //     });
  //   }
};

export default FirstPersonController;
