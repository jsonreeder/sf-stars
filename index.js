// Initialize variables

const width = 2500
const height = 1200

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const projection = d3.geo.equirectangular()
  .rotate([300, 0, -37.77])
  .scale(400)
  .translate([1250, 610])

const path = d3.geo.path()
  .projection(projection)

const graticule = d3.geo.graticule()

// Import stars

d3.json('data/stars.6.json', data => {
  const starFeatures = data.features
  const render = () => {
    svg.select('.graticule')
      .attr('d', path)

    const positionedStars = []

    starFeatures.forEach(d => {
      const dataToKeep = {}
      const coordinates = d.geometry.coordinates
      const p = projection([coordinates[0], coordinates[1]])
      dataToKeep[0] = p[0]
      dataToKeep[1] = p[1]
      dataToKeep.constellation = d.properties.con
      if (d.properties.mag <= 3.5) {
        positionedStars.push(dataToKeep)
      }
    })

    const stars = svg.select('.stars')
      .selectAll('circle')
      .data(positionedStars)

    stars.enter()
      .append('circle')
      .attr('r', 4)

    stars
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
  }

  render()
})

// Add to DOM

// Graticule
svg.append('path')
  .datum(graticule)
  .attr('d', path)
  .attr('class', 'graticule')

svg.append('g')
  .attr('class', 'stars')
