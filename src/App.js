import "./App.css";
import { ForceGraph3D } from "react-force-graph";
//import myData from "./data.json";
import * as THREE from "three";
//import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
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
import { useCallback, useEffect, useRef } from "react";

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

  const fgRef = useRef(null);

  useEffect(() => {
    //fgRef.current.linkColor = "#000000";
    const d3 = fgRef.current;
    console.log(fgRef.current);
  }, [fgRef]);

  // Random connected graph
  const ele = (id) =>
    `<div class='node-label'><h1>Author: PPF</h1><img width="200" src="${imgs[id]}"><ul><li>data: 1</li><li>data: 2</li></ul></div>`;

  const gData = {
    nodes: imgs.map((img, id) => ({
      id,
      color: "#00ffff",
      name: ele(id),
      img,
    })),
    links: [...Array(imgs.length).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 50;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  return (
    <div className="App">
      <ForceGraph3D
        ref={fgRef}
        graphData={gData}
        onNodeClick={handleClick}
        backgroundColor="white"
        linkOpacity={0.5}
        linkAutoColorBy
        //onEngineStop={() => fgRef.current.zoomToFit(100)}
        nodeThreeObject={({ img, id, color, name }) => {
          const imgTexture = new THREE.TextureLoader().load(`${img}`);
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);

          sprite.scale.set(30, 30);
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
