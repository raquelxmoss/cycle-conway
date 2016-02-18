import _ from 'lodash';

import getNeighbouringCellPositions from './get_neighbouring_cells'

export default function updateCell(grid, cellPosition) {
  const neighbourPositions = getNeighbouringCellPositions(grid, cellPosition)
  const cell = grid[cellPosition.row][cellPosition.column]

  const neighbourStatuses = neighbourPositions.map(position => {
    return grid[position.row][position.column].alive
  })

  const aliveNeighbours = neighbourStatuses.filter((status) => status === true)

  if (cell.alive) {
    if (aliveNeighbours.length < 2) {
      return Object.assign({}, grid[cellPosition.row][cellPosition.column], {nextAliveStatus: false})
    }

    if (aliveNeighbours.length === 2) {
      return Object.assign({}, grid[cellPosition.row][cellPosition.column], {nextAliveStatus: true})
    }

    if(aliveNeighbours.length > 3) {
      return Object.assign({}, grid[cellPosition.row][cellPosition.column], {nextAliveStatus: false})
    }
  }

  if (aliveNeighbours.length === 3 && !cell.alive) {
    return Object.assign({}, grid[cellPosition.row][cellPosition.column], {nextAliveStatus: true})
  }

  return cell
}

