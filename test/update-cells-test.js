import assert from 'assert'

import getNeighbouringCellPositions from '../src/get_neighbouring_cells'
import updateCell from '../src/update_cell'

describe('updateCell', () => {
  it('dies if fewer than two of its neighbours are alive', () => {
    const grid = [
      [{alive: true}, {alive: false}],
      [{alive: false}, {alive: true}]
    ]

    const cellToCheckPosition = { row: 0, column: 0 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, false)
  })

  it('lives if 2 or 3 of its neighbours are alive', () => {
    const grid = [
      [{alive: false}, {alive: true}],
      [{alive: false}, {alive: true}]
    ]

    const cellToCheckPosition = { row: 0, column: 0 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, true)
  })

  it('dies if more than three of its neighbours are alive', () => {
    const grid = [
      [{alive: true}, {alive: true}, {alive: true}],
      [{alive: true}, {alive: true}, {alive: true}]
    ]

    const cellToCheckPosition = { row: 0, column: 1 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, false)
  })

  it('is revived if it has 3 live neighbours', () => {
    const grid = [
      [{alive: true}, {alive: true}, {alive: false}],
      [{alive: true}, {alive: true}, {alive: false}]
    ]

    const cellToCheckPosition = { row: 0, column: 1 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, true)
  })
})