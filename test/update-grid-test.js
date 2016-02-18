import assert from 'assert'

import updateGrid from '../src/update_grid'
import { assertGridEqual, createTestGrid } from './helpers'

describe('updateGrid', () => {
  it('updates each cell on the grid', () => {
    const initialGrid  = createTestGrid(`
      X
       X
    `)

    const expectedGrid = createTestGrid(`
        

    `)

    assertGridEqual(updateGrid(initialGrid), expectedGrid)
  })

  it('produces a blinker pattern', () => {
    const initialGrid  = createTestGrid(`
       X 
       X 
       X 
    `)

    const expectedGrid = createTestGrid(`
         
      XXX

    `)

    assertGridEqual(updateGrid(initialGrid), expectedGrid)
  })

  it('produces a block pattern', () => {
    const initialGrid  = createTestGrid(`
       XX
       XX
    `)

    const expectedGrid = createTestGrid(`
       XX
       XX
    `)

    assertGridEqual(updateGrid(initialGrid), expectedGrid)
  })
})