import React, { useEffect, useState } from "react";

const scale = 50;
const widthToHeight = 1.2;

const table = Array.from(Array(30), () => Array(30).fill(null));

function App() {
  const width = scale * table.length;
  const height = scale * table[0].length;
  const [tiles, setTiles] = useState<any>([]);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, []);

  const keyDownHandler = (event: KeyboardEvent) => {
    console.log(event.code);
    if (event.code === "KeyR") {
      rotateCard();
    }
  };

  const rotateCard = () => {
    setRotation((prev) => {
      let rotation = prev + 1;
      if (rotation >= 4) {
        rotation = 0;
      }
      return rotation;
    });
  };

  const createGrid = (table: any, stroke: string) => {
    const grid = [];
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[0].length; j++) {
        grid.push(
          createDiamond(
            (i * scale * widthToHeight) / 2 + (j * scale * widthToHeight) / 2,
            (i * scale) / 2 + -(j * scale) / 2,
            i,
            j,
            stroke
          )
        );
      }
    }
    return grid;
  };

  const createDiamond = (x: number, y: number, i: number, j: number, stroke: string) => (
    <svg x={x} y={y} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="transparent"
        stroke={stroke}
        strokeWidth=".21"
        d={`  
          M 0 ${scale / 2} 
          L ${(scale * widthToHeight) / 2} 0 
          L ${scale * widthToHeight} ${scale / 2}
          L ${(scale * widthToHeight) / 2} ${scale}
          Z`}
        onClick={() => {
          const newTiles = [...tiles, { row: i, column: j, rotation, choosenTile: Math.random() > 0.5 ? "city_top_road_bend_left" : "bent_road" }].sort((a, b) => {
            if (a.row < b.row){
              return -1;
            }
            if (a.row > b.row){
              return 1;
            }
            return a.column > b.column ? -1 : 1;
          })
          setTiles(newTiles);
          setRotation(0)
          console.log(i, j);
        }}
      />
    </svg>
  );

  const createTiles = (tiles: any): any => {
    console.log('creating tiles')
    return tiles.map((tile: any) => {
      
      return (
        <svg
          key={`${tile.row}_${tile.column}`}
          x={
            (tile.row * scale * widthToHeight) / 2 +
            (tile.column * scale * widthToHeight) / 2
          }
          y={(tile.row * scale) / 2 + -(tile.column * scale) / 2 - (scale / 3.5)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            href={`assets/images/${tile.choosenTile}_${tile.rotation}.png`}
            height={scale * widthToHeight}
            width={scale}
            transform={`scale(1.21 1.22)`}
          />
        </svg>
      );
    });
  };
  console.log(tiles);
  return (
    <div>
      <svg
        width={width * 2}
        height={height * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>{createGrid(table, '#111')}</g>
        <g>{createTiles(tiles)}</g>
        <g>{createGrid(table, 'transparent')}</g>
      </svg>
    </div>
  );
}

export default App;
