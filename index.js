// Initialize variables

const width = 2500
const height = 600

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Spring: 25
// Summer: 125
// Fall: 225
// Winter: 325
const projection = d3.geo.equirectangular()
  .rotate([325, 0, -37.77])
  .scale(400)
  .translate([1250, 610])

const path = d3.geo.path()
  .projection(projection)

const game = new Game()
game.displayStats()

// Import stars

game.parseData()

// Add to DOM

svg.append('g')
  .attr('class', 'stars')
