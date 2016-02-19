import { Observable } from 'rx';
import { div, button, h1, h2, input } from '@cycle/dom';
import _ from 'lodash';

import seedGrid from './seed_grid'
import updateGrid from './update_grid'
import renderGrid from './view'

const INTRO = `This implementation of <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">Conway's Game of Life</a>
  was made lovingly with <a href="http://cycle.js.org" target="_blank">Cycle.js</a><br /><br />`

const grid = _.range(0, 55).map(() => {
  return _.range(0, 55).map(() => ({}))
})

const initialState = {
  grid
}

function newGame (e) {
  return function seedGame (state) {
    const seededGrid = seedGrid(grid, 0.3)

    return Object.assign({}, state, { grid: seededGrid })
  }
}

function updateGridReducer (e) {
  return function updateGridState (state) {
    return Object.assign({}, state, { grid: updateGrid(state.grid) })
  }
}

function makeInterval (speed) {
  if (speed === 0) { return Observable.just('stop') }

  return Observable.interval(speed)
}

export default function App ({DOM}) {
  const newGameClick$ = DOM
    .select('.new-game')
    .events('click')

  const pauseClick$ = DOM
    .select('.pause')
    .events('click')

  const startClick$ = DOM
    .select('.start')
    .events('click')

  const speedInput$ = DOM
    .select('.speed')
    .events('change')
    .map(e => e.target.value)
    .startWith(250)

  const newGame$ = newGameClick$
    .map(e => newGame(e))

  const pauseGame$ = pauseClick$
    .map(e => 0)
    .startWith(250)

  const startGame$ = startClick$
    .map(e => speedInput$.latest)

  const gameControl$ = Observable.merge(
    speedInput$,
    pauseGame$,
    newGame$,
    startGame$
  )

  const tick$ = gameControl$
    .flatMapLatest(speed => makeInterval(speed))

  const grid$ = tick$
    .map(e => updateGridReducer(e))

  const reducers$ = Observable.merge(
    newGame$,
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
          button('.new-game', 'New Game'),
          button('.pause', 'Pause'),
          button('.start', 'Start')
        ]),
        renderGrid(state.grid)
      ])
    ))
  };
}