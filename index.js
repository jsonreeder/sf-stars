// Initialize variables

const width = 2000
const height = 1000

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Spring: 25
// Summer: 125
// Fall: 225
// Winter: 325
const projection = d3.geo.equirectangular()
  .rotate([25, 0, -37.77])
  .scale(300)
  .translate([1250, 380])

const path = d3.geo.path()
  .projection(projection)

svg.append('svg:image')
  .attr('x', 0)
  .attr('y', 250)
  .attr('width', width)
  .attr('xlink:href','data/images/skyline.png')

const game = new Game()
game.displayStats()

// Import stars

game.parseData()

// Add to DOM

svg.append('g')
  .attr('class', 'stars')
