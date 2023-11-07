"use client";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  StandardMaterial,
  Color4,
  Vector2,
  OutlineRenderer,
  Color3,
  Matrix,
} from "@babylonjs/core";

import * as GUI from "@babylonjs/gui/2D";

import SceneComponent from "./components/SceneComponent";

import OuterFirstPersonComponent from "./components/OuterFirstPersonComponent";
//import "./App.css";

export default function Home() {
  // let box;

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
    //MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    // Building a box with MeshBuilder CreateBox
    // const aBox = MeshBuilder.CreateBox(
    //   "testBox",
    //   { size: 1, width: 1, height: 1, depth: 1 },
    //   scene
    // );
    // aBox.position.y = 5;
    // aBox.checkCollisions = true;

    //CREATE A MATERIAL FOR A MESH
    const material = new StandardMaterial(scene);

    // SET MATERIAL COLOR
    material.diffuseColor = new Color4(0.2, 0.5, 0.5, 1);
    // ASSIGN MATERIAL TO MESH
    // aBox.material = material;

    // MeshBuilder.CreateBox with null for scene so it isnt added to scene
    // const boxVertexData = MeshBuilder.CreateBox(
    //   "testBoxCloner",
    //   {
    //     size: 1,
    //     width: 1,
    //     height: 1,
    //     depth: 1,
    //   },
    //   null
    // );
    // boxVertexData.isVisible = false;

    //TEST
    // Assuming you have a box mesh created like this
    const ogBox = MeshBuilder.CreateBox("testBoxCloner", { size: 1 }, scene);

    ogBox.material = material; // Assigning material to the original mesh
    ogBox.enableEdgesRendering(); // Enable edges rendering on the original mesh
    ogBox.edgesWidth = 4.0;
    ogBox.edgesColor = new Color4(1, 0, 0, 1);
    ogBox.isVisible = false;

    //TEST

    // CREATE A CLONE FROM THE box mesh
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 5; i++) {
        const boxClone = ogBox.clone(`boxClone_${i}_${j}`); // Clone the mesh, not the vertex data
        boxClone.position.y = 1;
        boxClone.position.x = i + 1;
        boxClone.position.z = j + 1;
        boxClone.checkCollisions = true;
        boxClone.isVisible = true;
        // Since we cloned after enabling edge rendering on the original mesh,
        // the clones should also have edge rendering enabled.
        // If you want to be explicit or have different settings for each clone, you can set them here
        boxClone.enableEdgesRendering(); // If you need to set different parameters for edges

        // Check if this is the middle box
      }
    }

    // Importing a model file
    // const { meshes } = await SceneLoader.ImportMeshAsync(
    //   "",
    //   "./models/",
    //   "Prototype_Level.glb",
    //   scene
    // );
    // meshes.map((mesh) => {
    //   mesh.checkCollisions = true;
    // });

    // Initialize the OutlineRenderer
    const outline = new OutlineRenderer(scene);

    // Debug: Log to see if outline renderer is initialized properly
    console.log("OutlineRenderer initialized", outline);

    // // Function to remove outline from all boxes
    // const clearOutline = (boxes) => {
    //   boxes.forEach((box) => {
    //     box.renderOutline = false;
    //   });
    // };

    // // Function to add an outline to the closest block to the camera
    // const highlightClosestBlock = () => {
    //   const boxes = scene.meshes.filter((mesh) =>
    //     mesh.name.includes("testBoxCloner")
    //   );
    //   // Debug: Log to check if the correct meshes are being selected
    //   console.log("Boxes found:", boxes.length);

    //   let closestBox = null;
    //   let closestDistance = Number.MAX_VALUE;

    //   boxes.forEach((box) => {
    //     const distance = Vector3.Distance(
    //       camera.position,
    //       box.getAbsolutePosition()
    //     );
    //     if (distance < closestDistance) {
    //       closestBox = box;
    //       closestDistance = distance;
    //     }
    //   });
    //   // Debug: Log to see which box is selected as the closest
    //   if (closestBox) {
    //     console.log("Closest box:", closestBox.name);
    //     clearOutline(boxes);
    //     // For debugging, increase the outline width
    //     closestBox.outlineWidth = 1;
    //     // Change the outline color to a more noticeable one for debugging
    //     closestBox.outlineColor = Color3.Green();
    //     closestBox.renderOutline = true;
    //   } else {
    //     // Debug: Log if no closest box is found
    //     console.log("No closest box found");
    //   }
    // };

    // // Call the highlight function manually for testing
    // highlightClosestBlock();

    // // Set up an event to highlight the closest block when the scene is ready
    // // Removed for initial manual test
    // // scene.onReadyObservable.add(highlightClosestBlock);

    // // Update the highlighted block on camera move
    // camera.onViewMatrixChangedObservable.add(() => {
    //   // Debug: Confirm that the camera movement is detected
    //   console.log("Camera moved");
    //   highlightClosestBlock();
    // });

    // ... other code remains the same

    // Function to add an edge rendering to the closest block to the camera
    const highlightClosestBlock = () => {
      const boxes = scene.meshes.filter((mesh) =>
        mesh.name.includes("boxClone")
      );
      let closestBox = null;
      let minDistanceToCenter = Number.MAX_VALUE;

      // Transform the coordinates from world space to screen space
      const screenCenter = new Vector2(
        scene.getEngine().getRenderWidth() / 2,
        scene.getEngine().getRenderHeight() / 2
      );

      boxes.forEach((box) => {
        // Project the position of the box's center onto screen space
        const projectedPosition = Vector3.Project(
          box.getAbsolutePosition(),
          Matrix.Identity(),
          scene.getTransformMatrix(),
          camera.viewport.toGlobal(
            scene.getEngine().getRenderWidth(),
            scene.getEngine().getRenderHeight()
          )
        );

        // Calculate the distance from the projected position to the center of the screen
        const distanceToCenter = Vector2.Distance(
          new Vector2(projectedPosition.x, projectedPosition.y),
          screenCenter
        );

        // Check if this distance is the smallest one so far
        if (distanceToCenter < minDistanceToCenter) {
          closestBox = box;
          minDistanceToCenter = distanceToCenter;
        }
      });

      // Clear previous edge rendering
      boxes.forEach((box) => {
        box.edgesColor = new Color4(1, 0, 0, 1); // default red color
        box.edgesWidth = 1.0; // default width
      });

      if (closestBox) {
        // Change the outline of the closest box to the center of the screen
        closestBox.edgesColor = new Color4(0, 1, 0, 1); // green color for the closest one
        closestBox.edgesWidth = 4.0; // make it thicker
      }
    };

    // Update the highlighted block on camera move
    camera.onViewMatrixChangedObservable.add(highlightClosestBlock);

    // Call the function once initially if needed
    highlightClosestBlock();

    // Update the highlighted block on camera move
    camera.onViewMatrixChangedObservable.add(highlightClosestBlock);

    // ... other code remains the same

    //TEST BELOW

    const createCrosshair = () => {
      const crosshairSize = 20; // Size of the crosshair

      // Create the vertical line
      const verticalLine = new GUI.Line();
      verticalLine.x1 = advancedTexture.getSize().width / 2;
      verticalLine.y1 = (advancedTexture.getSize().height - crosshairSize) / 2;
      verticalLine.x2 = verticalLine.x1;
      verticalLine.y2 = (advancedTexture.getSize().height + crosshairSize) / 2;
      verticalLine.color = "white";
      verticalLine.lineWidth = 2;
      advancedTexture.addControl(verticalLine);

      // Create the horizontal line
      const horizontalLine = new GUI.Line();
      horizontalLine.x1 = (advancedTexture.getSize().width - crosshairSize) / 2;
      horizontalLine.y1 = advancedTexture.getSize().height / 2;
      horizontalLine.x2 = (advancedTexture.getSize().width + crosshairSize) / 2;
      horizontalLine.y2 = horizontalLine.y1;
      horizontalLine.color = "white";
      horizontalLine.lineWidth = 2;
      advancedTexture.addControl(horizontalLine);
    };

    // Call the function in the onSceneReady function
    createCrosshair();
  };

  return (
    <div className="flex item-center justify-center w-full ">
      {/* <div id="reticle">+</div> */}

      <SceneComponent
        className="w-10/12"
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
      />
    </div>
  );
}
