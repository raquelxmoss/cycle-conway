import assert from 'assert'

import getNeighbouringCellPositions from '../src/get_neighbouring_cells'
import updateCell from '../src/update_cell'
import { assertGridEqual, createTestGrid } from './helpers'

describe('updateCell', () => {
  it('dies if fewer than two of its neighbours are alive', () => {
    const grid = createTestGrid(`
      X
       X
    `)

    const cellToCheckPosition = { row: 0, column: 0 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, false)
  })

  it('lives if 2 or 3 of its neighbours are alive', () => {
    const grid = createTestGrid(`
       X
       X
    `)

    const cellToCheckPosition = { row: 0, column: 7 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, true)
  })

  it('dies if more than three of its neighbours are alive', () => {
    const grid = createTestGrid(`
      XXX
      XXX
    `)

    const cellToCheckPosition = { row: 0, column: 1 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, false)
  })

  it('is revived if it has 3 live neighbours', () => {
    const grid = createTestGrid(`
      XX 
      XX 
    `)

    const cellToCheckPosition = { row: 0, column: 7 }

    const updatedCell = updateCell(grid, cellToCheckPosition)

    assert.equal(updatedCell.alive, true)
  })
})