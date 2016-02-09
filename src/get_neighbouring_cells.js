export default function getNeighbouringCellPositions (grid, cellPosition) {
  const coordinates = [
    { row: -1, column: -1 }, // top-left
    { row: -1, column: 0 }, // top-center,
    { row: -1, column: +1 }, // top-right,
    { row: 0, column: -1 }, // left,
    { row: 0, column: +1 }, // right,
    { row: +1, column: -1 }, // bottom-left,
    { row: +1, column: 0 },// bottom-center,
    { row: +1, column: +1 } // bottom-right
  ]

  const gridBounaries = { width: grid[0].length ,  height: grid.length }

  const cells = coordinates
    .map(coordinate => {
      const row = cellPosition.row
      const column = cellPosition.column

      return { row: row + coordinate.row, column: column + coordinate.column }})
    .filter(coordinate => {
      return (coordinate.row >= 0 && coordinate.row <= gridBounaries.width) && (coordinate.column >= 0 && coordinate.column <= gridBounaries.width)
    })

  return cells
}