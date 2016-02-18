import _ from 'lodash';
import assert from 'assert';

export function createTestGrid (gridString) {
  const rows = gridString
    .split('\n')

  const maxRowWidth = _.max(rows.map(row => row.length))

  return rows.map(row => _.padRight(row, maxRowWidth)
    .split('')
    .map(char => {
    return {alive: char !== ' ', nextAliveStatus: char !== ' '}
  })).slice(1)
}

export function assertGridEqual (actualGrid, expectedGrid) {
  return assert.deepEqual(actualGrid, expectedGrid, compareGrid(actualGrid, expectedGrid))
}

function compareGrid (actualGrid, expectedGrid) {
  return ['', 'Expected:', prettyGrid(expectedGrid), '', 'Actual:', prettyGrid(actualGrid)].join('\n')
}

function prettyGrid (grid) {
  return grid.map(row => row.map(cell => cell.alive ? 'X' : ' ').join('')).join('\n')
}