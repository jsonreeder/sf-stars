class Season {
  constructor (name, constellationAbbreviations) {
    this.name = name
    this.constellations = []
    this.found = 0
    this.setConstellations(constellationAbbreviations)
  }

  createByAbbreviation (abbreviation, name) {
    return new Constellation(abbreviation, name)
  }

  setConstellations (abbreviationsNames) {
    this.constellations = abbreviationsNames.map(an => {
      const abbreviation = an[0]
      const name = an[1]
      return this.createByAbbreviation(abbreviation, name)
    })
    this.updateFound()
  }

  findByAbbreviation (abbreviation) {
    const matches = this.constellations.filter(c => c.abbreviation === abbreviation)
    return matches[0]
  }

  displayStats () {
    const formattedFound = `${this.found}/${this.constellations.length}`
    const remaining = this.constellations.length - this.found

    d3.select('#season')
      .text(this.name)

    d3.select('#constellationsFound')
      .text(formattedFound)
  }

  updateFound () {
    const found = this.constellations.filter(c => c.isFound)
    this.found = found.length
    this.displayStats()
    const isVictorious = this.found === this.constellations.length
    if (isVictorious) {
      this.announceVictory()
    }
  }

  announceVictory () {
    const modal = d3.select('.modal')
    const modalContent = d3.select('.modal-content')
    modal
      .style('display', 'flex')
    modalContent
      .text("Congratulations! You've found all of the constellations. Get read for the next season.")
    game.changeSeason()
  }
}
