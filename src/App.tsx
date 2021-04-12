import React, { ReactElement } from 'react';


const scale = 30;
const widthToHeight = 1.2

const table = Array.from(Array(30), () => Array(30).fill(null))
const createGrid = (table: any) => {
  const grid = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      grid.push(createDiamond(((i * scale * widthToHeight) / 2) + ((j * scale * widthToHeight) / 2), (i * scale / 2) + (-(j * scale) / 2), i, j))
    }
  }
  console.log(grid)
  return grid;
};

const createDiamond = (x: number, y: number, i: number, j: number) => (
  <svg x={x} y={y} xmlns="http://www.w3.org/2000/svg">
    <path 
      fill='transparent'
      stroke='#111'
      strokeWidth='.21'
      d={`  
        M 0 ${scale / 2} 
        L ${scale * widthToHeight / 2} 0 
        L ${scale * widthToHeight} ${scale / 2}
        L ${scale * widthToHeight / 2} ${scale}
        Z`
      }
      onClick={() => console.log(i, j)}
    />
</svg>
)

function App() {
  const width = scale * table.length;
  const height = scale * table[0].length;
  return (
    <div>
      <svg
        width={width * 2}
        height={height * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0, 300)">
          {createGrid(table)}

        </g>
        {/* {diamond} */}
        {/* <g x={0} y={0} transform="translate(250, 0) rotate(60)" >
          {createGrid(table)}
        </g>
        <g x={0} y={0} transform="translate(0, 250) rotate(-60)">
          {createGrid(table)}
        </g> */}
      </svg>
    </div>
  );
}

export default App;
