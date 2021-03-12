import "./App.css";
import { ForceGraph3D } from "react-force-graph";
//import myData from "./data.json";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";

import cat from "./imgs/cat.jpg";
import dog from "./imgs/dog.jpg";
import eagle from "./imgs/eagle.jpg";
import elephant from "./imgs/elephant.jpg";
import grasshopper from "./imgs/grasshopper.jpg";
import octopus from "./imgs/octopus.jpg";
import owl from "./imgs/owl.jpg";
import panda from "./imgs/panda.jpg";
import tiger from "./imgs/tiger.jpg";
import whale from "./imgs/whale.jpg";

function App() {
  const imgs = [
    cat,
    dog,
    eagle,
    elephant,
    grasshopper,
    octopus,
    owl,
    panda,
    tiger,
    whale,
  ];

  // Random connected graph
  const ele = `<div class='node-label'><h1>Author: PPF</h1><img width="100" src="${cat}"><ul><li>data: 1</li><li>data: 2</li></ul></div>`;

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
        extraRenderers={extraRenderers}
        graphData={gData}
        nodeThreeObject={({ img, id, color, name }) => {
          //const imgTexture = new THREE.TextureLoader().load(`${img}`);
          //const material = new THREE.SpriteMaterial({ map: imgTexture });
          //const sprite = new THREE.Sprite(material);

          //sprite.scale.set(12, 12);
          //return sprite;

          const nodeEl = document.createElement("div");
          nodeEl.innerHTML = name;
          nodeEl.style.color = color;
          nodeEl.className = "node-label";
          console.log("img", img);
          return new CSS2DObject(nodeEl);
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
