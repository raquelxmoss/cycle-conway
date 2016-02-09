import assert from 'assert'
import _ from 'lodash'

import seedGrid from '../src/seed_grid'
import getNeighbouringCellPositions from '../src/get_neighbouring_cells'
// import updateGrid from '../updateGrid'

describe('getNeighbouringCellPositions', () => {
  it('collects the correct neighbouring coordinates', () => {
    const grid =  seedGrid(_.range(0, 10).map(() => {
      return _.range(0, 10).map(() => ({}))
    }), 0.2)

    const cellPosition = { row: 3, column: 3 }

    const neighbours = getNeighbouringCellPositions(grid, cellPosition)

    const expected = [
      { row: 2, column: 2 },
      { row: 2, column: 3 },
      { row: 2, column: 4 },
      { row: 3, column: 2 },
      { row: 3, column: 4 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 4 }
    ]

    assert.deepEqual(neighbours, expected);
  })

  it('doesn\'t freak out if neighbours are out-of-bounds', () => {
    const grid =  seedGrid(_.range(0, 10).map(() => {
      return _.range(0, 10).map(() => ({}))
    }), 0.2)

    const cellPosition = { row: 0, column: 0 }

    const neighbours = getNeighbouringCellPositions(grid, cellPosition)

    const expected = [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 }
    ]

    assert.deepEqual(neighbours, expected)
  })
})

// each of which is in one of two possible states, alive or dead.

// Every cell interacts with its eight neighbours, which are the cells that are

// horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.