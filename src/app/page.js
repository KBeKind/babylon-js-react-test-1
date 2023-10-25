"use client";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
} from "@babylonjs/core";
import SceneComponent from "./components/SceneComponent";

import OuterFirstPersonComponent from "./components/OuterFirstPersonComponent";
//import "./App.css";

export default function Home() {
  let box;

  const onSceneReady = async (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 10, -10), scene);
    camera.attachControl();
    camera.applyGravity = false;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(1, 1, 1);
    camera.minZ = 0.45;
    camera.speed = 0.75;
    camera.angularSensibility = 4000;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysDownward.push(67);
    camera.keysUpward.push(69);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Prototype_Level.glb",
      scene
    );
    meshes.map((mesh) => {
      mesh.checkCollisions = true;
    });
  };

  return (
    <div className="flex item-center justify-center w-full ">
      <SceneComponent
        className="w-10/12"
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
      />
    </div>
  );
}
