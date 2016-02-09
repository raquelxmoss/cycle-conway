import { Observable } from 'rx';
import { div, button } from '@cycle/dom';
import _ from 'lodash';

import seedGrid from './seed_grid'

const grid = _.range(0, 10).map(() => {
  return _.range(0, 10).map(() => ({}))
})

function renderCell (cell) {
  return (
    div(`.cell ${cell.alive ? '.alive' : ''}`)
  )
}

function renderRow (row) {
  return (
    div('.row', row.map(cell => renderCell(cell)))
  )
}

function renderGrid (grid) {
  return (
    div('.grid', grid.map(row => renderRow(row)))
  )
}

function checkCell (grid, cellPosition) {

  // setCellState(cellState, cell)
  // return grid
}

function setCellState (cellState, cell) {

  // return cell
}

function startGame (e) {
  return function seedGame (state) {
    const seededGrid = seedGrid(grid, 0.1)

    return Object.assign({}, state, { grid: seededGrid })
  }
}

function updateGridReducer (e) {
  return function updateGrid (state) {
    const grid = state.grid

    console.log(grid)
    // check each square
    // return the updated grid to state
  }
}


const initialState = {
  grid
}

export default function App ({DOM}) {
  const startClick$ = DOM
    .select('.start')
    .events('click')

  const tick$ = DOM
    .select('.step')
    .events('click')

  const startGame$ = startClick$
    .map(e => startGame(e))

  const grid$ = tick$
    .map(e => updateGridReducer(e))

  const reducers$ = Observable.merge(
    startGame$,
    grid$
  )

  const state$ = reducers$
    .startWith(initialState)
    .scan((state, reducer) => reducer(state))
    .do(console.log.bind(console, 'state'))

  return {
    DOM: state$.map(({grid}) => (
      div([
        renderGrid(grid),
        button('.start', 'Start'),
        button('.step', 'Step')
      ])
    ))
  };
}


// Rules
// The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells,

//  1. Render a grid [x]
//  2. Render a start button [x]
//  3. Seed a grid randomly when start button is clicked [x]
//  4. Implement each rule by TDD

// each of which is in one of two possible states, alive or dead.

// Every cell interacts with its eight neighbours, which are the cells that are

// horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.