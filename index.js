// Initialize variables

const width = 1000
const height = 200

const svg = d3.select('div.sky-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const projection = d3.geo.orthographic()
  .scale(280)
  .rotate([60, 20, -40])
  .clipAngle(90)

const path = d3.geo.path()
  .projection(projection)

const graticule = d3.geo.graticule()

// Import stars

d3.json('data/stars.json', data => {
  const constellations = data.constellations
  const render = () => {
    svg.select('.graticule')
      .attr('d', path)

    const positionedStars = []
    const positionedNames = []

    constellations.forEach(c => {
      const n = {}
      n.name = c.name
      n.ra = +c.RAh * (360 / 24)
      n.dec = +c.DEd
      const p = projection([-n.ra, n.dec])
      n[0] = p[0]
      n[1] = p[1]
      positionedNames.push(n)

      c.stars.forEach(d => {
        d.ra = +d.RAh * (360 / 24)
        d.dec = +d.DEd
        const p = projection([-d.ra, d.dec])
        d[0] = p[0]
        d[1] = p[1]
        positionedStars.push(d)
      })
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

    const names = svg.select('.stars')
      .selectAll('text')
      .data(positionedNames)

    names.enter()
      .append('text')
      .attr('r', 90)

    names
      .attr('x', d => d[0])
      .attr('y', d => d[1])
      .text(d => d.name)
  }

  render()
})

// Add to DOM

svg.append('path')
  .datum(graticule)
  .attr('d', path)
  .attr('class', 'graticule')

svg.append('g')
  .attr('class', 'stars')
