import _ from 'lodash';

import getNeighbouringCellPositions from './get_neighbouring_cells'

export default function updateCell(grid, cellPosition) {
  const neighbourPositions = getNeighbouringCellPositions(grid, cellPosition)

  const neighbourStatuses = neighbourPositions.map(position => {
    return grid[position.row][position.column].alive
  })

  const aliveNeighbours = neighbourStatuses.filter((status) => status === true)

  if (aliveNeighbours.length < 2) {
    return Object.assign({}, grid[cellPosition.row][cellPosition.column], {alive: false})
  }

  if (aliveNeighbours.length === 2) {
    return Object.assign({}, grid[cellPosition.row][cellPosition.column], {alive: true})
  }

  if (aliveNeighbours.length === 3) {
    return Object.assign({}, grid[cellPosition.row][cellPosition.column], {alive: true})
  }

  if(aliveNeighbours.length > 3) {
    return Object.assign({}, grid[cellPosition.row][cellPosition.column], {alive: false})
  }
}

