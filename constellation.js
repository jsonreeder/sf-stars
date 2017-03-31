class Constellation {
  constructor (abbreviation, name) {
    this.abbreviation = abbreviation
    this.name = name
    this.stars = []
    this.isFound = false
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
