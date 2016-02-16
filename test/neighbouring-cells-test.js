import assert from 'assert'
import _ from 'lodash'

import seedGrid from '../src/seed_grid'
import getNeighbouringCellPositions from '../src/get_neighbouring_cells'

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

  it('seriously doesn\'t freak out about boundaries', () => {
    const grid = [
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}]
    ]

    const cellPosition = { row: 2, column: 4 }

    const neighbours = getNeighbouringCellPositions(grid, cellPosition)

    const expected = [
      {row: 1, column: 3},
      {row: 1, column: 4},
      {row: 2, column: 3}
    ]

    assert.deepEqual(neighbours, expected)
  })
})