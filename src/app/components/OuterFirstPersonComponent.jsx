import { useEffect, useRef } from "react";
import FirstPersonController from "./FirstPersonComponent";
import { Engine, Scene } from "@babylonjs/core";

const OuterFirstPersonComponent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
};

export default OuterFirstPersonComponent;

//     new FirstPersonController(canvas);

// </script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
// <style scoped>
// @import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap");

// main {
//   width: 70%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// }

// #loader {
//   width: 100%;
//   height: 100%;
//   background: slategrey;
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }

// #loaded {
//   width: 100%;
//   height: 100%;
//   background: slategrey;
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   opacity: 0;
//   transition: opacity 1s ease;
// }

// #loadingContainer {
//   width: 30%;
//   height: 2rem;
//   background: rgba(255, 255, 255, 0.75);
//   border-radius: 6px;
//   margin: 0.5rem;
// }

// #loadingBar {
//   height: 100%;
//   background: green;
//   border-radius: 6px;
// }

// p {
//   color: white;
//   background: none;
//   margin-bottom: 1rem;
//   font-family: "Roboto Condensed";
//   font-weight: 400;
//   font-size: 2rem;
// }

// canvas {
//   width: 100%;
//   height: 100%;
//   border: none;
//   outline: none;
//   box-shadow: 8px 8px 10px -6px #000000;
// }
// </style>
