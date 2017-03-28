const width = 1000
const height = 500

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const projection = d3.geo.equirectangular()
  .scale(120)

const path = d3.geo.path()
  .projection(projection)

const graticule = d3.geo.graticule()

svg.append('path')
  .datum(graticule)
  .attr('d', path)
  .attr('class', 'graticule')
