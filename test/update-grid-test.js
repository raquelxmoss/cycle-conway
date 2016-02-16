import assert from 'assert'

import updateGrid from '../src/update_grid'

describe('updateGrid', () => {
  it('updates each cell on the grid', () => {
    const initialGrid = [
      [{alive: false}, {alive: true}, {alive: false}, {alive: true}],
      [{alive: true}, {alive: false}, {alive: false}, {alive: true}],
      [{alive: false}, {alive: false}, {alive: true}, {alive: false}]
    ]

    const expectedGrid = [
      [{alive: true}, {alive: false}, {alive: true}, {alive: false}],
      [{alive: false}, {alive: true}, {alive: false}, {alive: true}],
      [{alive: false}, {alive: true}, {alive: false}, {alive: true}]
    ]

    assert.deepEqual(updateGrid(initialGrid), expectedGrid)
  })
})