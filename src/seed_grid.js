export default function seedGrid(grid, probability = 0) {
  return grid.map(row => {
    return row.map(cell => {
      const rand = Math.random()

      cell.alive = probability > rand

      return cell
    })
  })
}