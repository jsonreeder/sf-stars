// Initialize variables

const width = 2500
const height = 600

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const projection = d3.geo.equirectangular()
  .rotate([25, 0, -37.77])
  .scale(400)
  .translate([1250, 610])

const path = d3.geo.path()
  .projection(projection)

const graticule = d3.geo.graticule()

const radius = d3.scale.linear()
  .domain([-1, 5])
  .range([8, 1])

const renderStars = (...starArrays) => {
  const stars = svg.select('.stars')
    .selectAll('circle')
    .data([].concat(...starArrays))

  stars.enter()
    .append('circle')
    .attr('r', d => radius(d.mag))

  stars
    .attr('cx', d => d.coordinates[0])
    .attr('cy', d => d.coordinates[1])
}

class Constellation {
  constructor () {
    this.stars = []
  }

  receiveStar (star) {
    this.stars.push(star)
  }

  lowMagLimit (mag) {
    return (
      this.stars.filter(star => star.mag <= mag)
    )
  }
}

const orion = new Constellation()
const canisMajor = new Constellation()
const ursaMinor = new Constellation()

// Import stars

d3.json('data/stars.6.json', data => {
  const starFeatures = data.features
  const render = () => {
    svg.select('.graticule')
      .attr('d', path)

    starFeatures.forEach(d => {
      const dataToKeep = {}
      const coordinates = d.geometry.coordinates
      dataToKeep.coordinates = projection([0 - coordinates[0], coordinates[1]])
      dataToKeep.mag = d.properties.mag
      switch (d.properties.con) {
        case 'Ori':
          orion.receiveStar(dataToKeep)
          return
        case 'CMa':
          canisMajor.receiveStar(dataToKeep)
          return
        case 'UMi':
          ursaMinor.receiveStar(dataToKeep)
      }
    })

    renderStars(
      orion.lowMagLimit(4.5),
      canisMajor.lowMagLimit(4.3),
      ursaMinor.lowMagLimit(6)
    )
  }

  render()
})

// Add to DOM

// Graticule
// svg.append('path')
//   .datum(graticule)
//   .attr('d', path)
//   .attr('class', 'graticule')

svg.append('g')
  .attr('class', 'stars')
