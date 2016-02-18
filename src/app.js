import { Observable } from 'rx';
import { div, button, h1, h2, input } from '@cycle/dom';
import _ from 'lodash';

import seedGrid from './seed_grid'
import updateGrid from './update_grid'

const INTRO = `This implementation of <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Conway's Game of Life</a>
  was made lovingly with <a href="http://cycle.js.org" target="_blank">Cycle.js</a><br /><br />`

const grid = _.range(0, 55).map(() => {
  return _.range(0, 55).map(() => ({}))
})

const initialState = {
  grid,
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
    const seededGrid = seedGrid(grid, 0.005)

    return Object.assign({}, state, { grid: seededGrid })
  }
}

function updateGridReducer (e) {
  return function updateGridState (state) {
    return Object.assign({}, state, {grid: updateGrid(state.grid)})
  }
}

function updateSpeed (e) {
  return (state) => {
    return Object.assign({}, state, {speed: e.target.value})
  }
}

export default function App ({DOM}) {
  const startClick$ = DOM
    .select('.start')
    .events('click')

  const speedInput$ = DOM
    .select('.speed')
    .events('change')
    .map(e => e.target.value)
    .startWith(250)

  const startGame$ = startClick$
    .map(e => startGame(e))

  const tick$ = speedInput$
    .flatMapLatest(speed => Observable.interval(speed))

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
    DOM: state$.map(state => (
      div('.container', [
        div([
          h1('.header', 'Conway\'s Game of Life'),
          div('.intro', {innerHTML: INTRO}),
          input('.speed', {type: 'range', min: 0, max: 500}),
          button('.start', 'Start'),
        ]),
        renderGrid(state.grid)
      ])
    ))
  };
}