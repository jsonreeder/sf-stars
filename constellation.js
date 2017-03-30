class Constellation {
  constructor (abbreviation) {
    this.abbreviation = abbreviation
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
