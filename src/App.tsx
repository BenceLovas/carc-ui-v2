import React, { useEffect, useState } from "react";

const scale = 50;
const widthToHeight = 1.2;
const table = Array.from(Array(30), () => Array(30).fill(null));

function App() {
  const width = scale * table.length;
  const height = scale * table[0].length;
  const [tiles, setTiles] = useState<any>([]);
  const [rotation, setRotation] = useState<number>(0);
  const [cards, setCards] = useState<any>([
    "chapel_with_road",
    "chapel",
    "full_city_with_shield",
    "city_top_straight_road",
    "city_top",
    "city_narrow_shield",
    "city_narrow",
    "city_left_right",
    "city_top_right",
    "city_top_road_bend_right",
    "city_top_road_bend_left",
    "city_top_crossroads",
    "city_diagonal_top_right_shield",
    "city_diagonal_top_right",
    "city_diagonal_top_left_shield_road",
    "city_diagonal_top_left_road",
    "city_bottom_grass_shield",
    "city_bottom_grass",
    "city_bottom_road_shield",
    "city_bottom_road",
    "straight_road",
    "bent_road",
    "three_split_road",
    "crossroads",
  ])
  const [currentCard, setCurrentCard] = useState<number>(0)
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, []);

  const keyDownHandler = (event: KeyboardEvent) => {
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

  const createGrid = (table: any, stroke: string, isInteractive: boolean) => {
    const grid = [];
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[0].length; j++) {
        grid.push(
          createDiamond(
            (i * scale * widthToHeight) / 2 + (j * scale * widthToHeight) / 2,
            (i * scale) / 2 + -(j * scale) / 2,
            i,
            j,
            stroke,
            isInteractive
          )
        );
      }
    }
    return grid;
  };

  const createDiamond = (x: number, y: number, i: number, j: number, stroke: string, isInteractive: boolean) => (
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
          if (!isInteractive) return;
          setTiles(() => {
            const newTiles = [...tiles, { row: i, column: j, rotation, choosenTile: cards[currentCard] }].sort((a, b) => {
              if (a.row < b.row){
                return -1;
              }
              if (a.row > b.row){
                return 1;
              }
              return a.column > b.column ? -1 : 1;
            })
            setCurrentCard(currentCard + 1);
            return newTiles;
          });
          setRotation(0)
        }}
      />
    </svg>
  );

  const createTiles = (tiles: any): any => {
    return tiles.map((tile: any) => {
      
      return (
        <svg
          key={`${tile.row}_${tile.column}`}
          x={
            (tile.row * scale * widthToHeight) / 2 +
            (tile.column * scale * widthToHeight) / 2 - (scale / 40)
          }
          y={(tile.row * scale) / 2 + -(tile.column * scale) / 2 - (scale / 2.6)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            href={`assets/images/tiles_${tile.choosenTile}_${tile.rotation}.svg`}
            height={scale * widthToHeight}
            width={scale}
            transform={`scale(1.25 1.27)`}
          />
        </svg>
      );
    });
  };
  return (
    <div>
      <svg
        width={width * 2}
        height={height * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>{createGrid(table, '#111', false)}</g>
        <g>{createTiles(tiles)}</g>
        <g>{createGrid(table, 'transparent', true)}</g>
      </svg>
    </div>
  );
}

export default App;
