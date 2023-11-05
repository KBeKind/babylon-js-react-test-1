"use client";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
} from "@babylonjs/core";

import * as GUI from "@babylonjs/gui/2D";

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

    // GUI BELOW
    //
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //GUI BUTTON
    const button = GUI.Button.CreateSimpleButton("myButton", "Clicky button");
    button.width = "150px";
    button.height = "40px";
    button.color = "black";
    button.background = "green";
    // button.left = -400;
    // button.top = -50;
    //advancedTexture.addControl(button);

    //GUI BUTTON FROM AN IMAGE
    const picButton = GUI.Button.CreateImageButton(
      "myButton2",
      "Clicky button",
      "testbutton.jpg"
    );
    picButton.width = "150px";
    picButton.height = "40px";
    picButton.color = "black";
    picButton.image.width = "100%";
    // picButton.left = -400;
    picButton.onPointerUpObservable.add(function () {
      if (light.intensity < 0.8) {
        light.intensity += 0.1;
      } else {
        light.intensity = 0.1;
      }
    });
    //advancedTexture.addControl(picButton);

    //GUI TEXT BOX
    const textBox = new GUI.TextBlock();
    textBox.text = "this is my GUI text box text";
    textBox.color = "purple";
    textBox.fontFamily = "Tahoma";
    textBox.fontSize = 72;
    textBox.shadowColor = "black";
    textBox.shadowOffsetX = 2;
    textBox.shadowOffsetY = 2;
    textBox.width = "300px";
    textBox.height = "50px";
    textBox.top = -300;
    advancedTexture.addControl(textBox);

    //GUI SLIDER
    const slider = new GUI.Slider();
    slider.minimum = 0.1;
    slider.maximum = 5;
    slider.width = "200px";
    slider.height = "20px";
    slider.value = 2.5;
    slider.top = 300;
    slider.onValueChangedObservable.add(function (value) {
      textBox.scaleX = value;
      textBox.scaleY = value;
    });
    advancedTexture.addControl(slider);

    // // GUI BUTTON PANEL?
    const panel = new GUI.StackPanel();
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    panel.isVertical = true;
    // panel.adaptWidthToChildren = true;
    // panel.adaptHeightToChildren = true;
    advancedTexture.addControl(panel);

    panel.addControl(button);
    panel.addControl(picButton);

    //GUI RADIO BUTTON
    const radioButton = new GUI.RadioButton();
    radioButton.width = "20px";
    radioButton.height = "20px";
    radioButton.color = "white";
    radioButton.background = "green";
    //AddHeader can be use for other buttons too like checkbox etc
    const header1 = GUI.Control.AddHeader(radioButton, "radio-text", "100px", {
      isHorizontal: true,
      controlFirst: true,
    });
    header1.height = "30px";
    panel.addControl(header1);

    const radioButton2 = radioButton.clone();
    const header2 = GUI.Control.AddHeader(
      radioButton2,
      "radio-text2",
      "100px",
      {
        isHorizontal: true,
        controlFirst: true,
      }
    );
    header2.height = "30px";
    panel.addControl(header2);

    //GUI CONTAINER
    const aContainer = new GUI.Container();
    aContainer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    aContainer.adaptWidthToChildren = true;
    aContainer.adaptHeightToChildren = true;

    aContainer.isPointerBlocker = true;
    advancedTexture.addControl(aContainer);

    //CONTAINER RECTANGLE
    const containerRectangle = new GUI.Rectangle();
    // containerRectangle.background = "grey";
    containerRectangle.width = "500px";
    containerRectangle.height = "400px;";
    containerRectangle.cornerRadius = 25;
    containerRectangle.addControl(panel);

    aContainer.addControl(containerRectangle);

    // GUI ABOVE

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
      <div id="reticle">+</div>

      <SceneComponent
        className="w-10/12"
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
      />
    </div>
  );
}
