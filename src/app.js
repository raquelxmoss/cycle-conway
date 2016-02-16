import { Observable } from 'rx';
import { div, button } from '@cycle/dom';
import _ from 'lodash';

import seedGrid from './seed_grid'
import updateGrid from './update_grid'

const grid = _.range(0, 50).map(() => {
  return _.range(0, 50).map(() => ({}))
})

const initialState = {
  grid
}

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

function startGame (e) {
  return function seedGame (state) {
    const seededGrid = seedGrid(grid, 0.05)

    return Object.assign({}, state, { grid: seededGrid })
  }
}

function updateGridReducer (e) {
  return function updateGridState (state) {
    return Object.assign({}, state, {grid: updateGrid(state.grid)})
  }
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