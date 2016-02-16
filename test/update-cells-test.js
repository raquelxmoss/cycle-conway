import assert from 'assert'

import getNeighbouringCellPositions from '../src/get_neighbouring_cells'

describe('updateCell', () => {
  it('dies if fewer than two of its neighbours are alive', () => {
    const grid = [
      [{alive: true}, {alive: false}],
      [{alive: false}, {alive: true}]
    ]

    const cellToCheck = { row: 0, column: 0 }

    const neighbours = getNeighbouringCellPositions(grid, cellToCheck)

    updateCell(grid[0][0], neighbours)
    console.log(neighbours)
  })

  xit('lives if 2 or 3 of its neighbours are alive', () => {

  })

  xit('dies if more than three of its neighbours are alive', () => {

  })

  xit('is revived if it has 3 live neighbours', () => {

  })
})