import { div } from '@cycle/dom';

function renderCell (cell, rowIndex, column) {
  return (
    div(`.cell ${cell.alive ? '.alive' : ''}`, {key: rowIndex * 55 + column})
  )
}

function renderRow (row, rowIndex) {
  return (
    div('.row', row.map((cell, column) => renderCell(cell, rowIndex, column)))
  )
}

export default function renderGrid (grid) {
  return (
    div('.grid', grid.map((row, rowIndex) => renderRow(row, rowIndex)))
  )
}