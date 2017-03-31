class Game {
  constructor () {
    this.currentSeasonIdx = 0
    this.seasons = []
    this.setSeasons()
  }

  setSeasons () {
    const constellationsBySeason = {
      'spring': [
        'Ori',
        'Cas',
        'CMa',
        'UMi',
        'Tau'
      ],
      'summer': [
        'Leo',
        'UMi',
        'Cas',
        'Cyg',
        'Boo'
      ],
      'fall': [
        'Boo',
        'UMi',
        'Cas',
        'UMa',
        'Cyg'
      ],
      'winter': [
        'UMi',
        'UMa',
        'Ori',
        'Tau',
        'And'
      ]
    }

    this.seasons = [
      new Season('spring', constellationsBySeason.spring),
      new Season('summer', constellationsBySeason.summer),
      new Season('fall', constellationsBySeason.fall),
      new Season('winter', constellationsBySeason.winter)
    ]
  }

  currentSeason () {
    return this.seasons[this.currentSeasonIdx]
  }

  displayStats () {
    d3.select('#season')
      .text(this.currentSeason().name)
  }

  handleClick (star) {
    const season = this.currentSeason()
    const parentConstellation = season.findByAbbreviation(star.con)
    parentConstellation.isFound = true
    season.updateFound()
  }

  renderStars (...starArrays) {
    const radius = d3.scale.linear()
      .domain([-1, 5])
      .range([8, 1])

    const stars = svg.select('.stars')
          .selectAll('circle')
      .data([].concat(...starArrays))

    stars.enter()
      .append('circle')
      .attr('r', d => radius(d.mag))
      .on('click', d => this.handleClick(d))

    stars
      .attr('cx', d => d.coordinates[0])
      .attr('cy', d => d.coordinates[1])
  }

  parseData () {
    d3.json('data/stars.6.json', data => {
      const season = this.currentSeason()
      const starFeatures = data.features
      const render = () => {
        svg.select('.graticule')
          .attr('d', path)

        starFeatures.forEach(d => {
          const dataToKeep = {}
          const coordinates = d.geometry.coordinates
          dataToKeep.coordinates = projection([0 - coordinates[0], coordinates[1]])
          dataToKeep.mag = d.properties.mag
          dataToKeep.con = d.properties.con

          const ellation = season.findByAbbreviation(d.properties.con)
          if (ellation) {
            ellation.receiveStar(dataToKeep)
          }
        })

        this.renderStars(
          season.constellations[0].lowMagLimit(3.7),
          season.constellations[1].lowMagLimit(3.7),
          season.constellations[2].lowMagLimit(3.7),
          season.constellations[3].lowMagLimit(3.7),
          season.constellations[4].lowMagLimit(3.7)
        )
      }

      render()
    })
  }
}
