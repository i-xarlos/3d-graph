import "./App.css";
import { ForceGraph3D } from "react-force-graph";
//import myData from "./data.json";
import * as THREE from "three";
//import { } from "three/examples/js/renderers/CSS2DRenderer";
//import { CSS2DObject } from "three/examples/js/renderers/CSS2DRenderer";
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";

function App() {
  const imgs = [
    "cat.jpg",
    "dog.jpg",
    "eagle.jpg",
    "elephant.jpg",
    "grasshopper.jpg",
    "octopus.jpg",
    "owl.jpg",
    "panda.jpg",
    "squirrel.jpg",
    "tiger.jpg",
    "whale.jpg",
  ];

  // Random connected graph
  const ele =
    "<div class='node-label'><h1>Author: XXX</h1><ul><li>data: 1</li><li>data: 2</li></ul></div>";

  const gData = {
    nodes: imgs.map((img, id) => ({ id, color: "#00ff00", name: ele, img })),
    links: [...Array(imgs.length).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };
  const extraRenderers = [new CSS2DRenderer()];
  return (
    <div className="App">
      <ForceGraph3D
        graphData={gData}
        nodeThreeObject={({ img, id, color, name }) => {
          const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);

          //var geometry = new THREE.BoxGeometry(1, 1, 1);
          //var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          //var cube = new THREE.Mesh(geometry, material);
          //sprite.add(cube);

          sprite.scale.set(12, 12);
          return sprite;

          //const nodeEl = document.createElement("div");
          //nodeEl.textContent = name;
          //nodeEl.style.color = color;
          //nodeEl.className = "node-label";
          //return new CSS2DObject(nodeEl);
        }}
        //nodeThreeObjectExtend={true}
      />
      {
        //<ForceGraph3D
        //width="100%"
        //height="600"
        //backgroundColor="#333"
        //graphData={myData}
        ///>
      }
    </div>
  );
}

export default App;
