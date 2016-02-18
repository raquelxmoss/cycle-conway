import updateCell from './update_cell'

export default function updateGrid (grid) {
  const updatedGrid = grid.map((row, rowIndex) => {
    return row.map((cell, columnIndex) => {
      return updateCell(grid, {row: rowIndex, column: columnIndex})
    })
  })

  return updatedGrid.map(row => {
    return row.map(cell => {
      return Object.assign({}, cell, {alive: cell.nextAliveStatus})
    })
  })
}