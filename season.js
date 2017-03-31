class Season {
  constructor (name, constellationAbbreviations) {
    this.name = name
    this.constellations = []
    this.found = 0
    this.setConstellations(constellationAbbreviations)
  }

  createByAbbreviation (abbreviation) {
    return new Constellation(abbreviation)
  }

  setConstellations (abbreviations) {
    this.constellations = abbreviations.map(a => (
      this.createByAbbreviation(a)
    ))
    this.updateFound()
  }

  findByAbbreviation (abbreviation) {
    const matches = this.constellations.filter(c => c.abbreviation === abbreviation)
    return matches[0]
  }

  displayFound () {
    const formattedFound = `${this.found}/${this.constellations.length}`

    d3.select('#constellationsFound')
      .text(formattedFound)
  }

  updateFound () {
    const found = this.constellations.filter(c => c.isFound)
    this.found = found.length
    this.displayFound()
    const isVictorious = this.found === this.constellations.length
    if (isVictorious) {
      this.announceVictory()
    }
  }

  announceVictory () {
    alert("Congratulations! \nYou've found all of the constellations")
  }
}
