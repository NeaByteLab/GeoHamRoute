const path = require('path')
const fs = require('fs')
const baseThirtyTwoMap = '0123456789bcdefghjkmnpqrstuvwxyz'

/**
 * Encode Coordinates To Geohash
 * Params: LatitudeNumber, LongitudeNumber, PrecisionNumber
 */
function encodeCoordinatesToGeohash(latitudeNumber, longitudeNumber, precisionNumber) {
  const latitudeRange = [-90.0, 90.0]
  const longitudeRange = [-180.0, 180.0]
  let isEvenBitPosition = true
  let bitCount = 0
  let charIndex = 0
  let geohashString = ''
  while (!(geohashString.length === precisionNumber)) {
    let middleValue
    if (isEvenBitPosition) {
      middleValue = (longitudeRange[0] + longitudeRange[1]) / 2.0
      if (longitudeNumber > middleValue) {
        charIndex = charIndex * 2 + 1
        longitudeRange[0] = middleValue
      } else {
        charIndex = charIndex * 2
        longitudeRange[1] = middleValue
      }
    } else {
      middleValue = (latitudeRange[0] + latitudeRange[1]) / 2.0
      if (latitudeNumber > middleValue) {
        charIndex = charIndex * 2 + 1
        latitudeRange[0] = middleValue
      } else {
        charIndex = charIndex * 2
        latitudeRange[1] = middleValue
      }
    }
    isEvenBitPosition = !(isEvenBitPosition)
    bitCount += 1
    if (bitCount === 5) {
      geohashString += baseThirtyTwoMap[charIndex]
      bitCount = 0
      charIndex = 0
    }
  }
  return geohashString
}

/**
 * Calculate Hamming Distance
 * Params: GeohashOne, GeohashTwo
 */
function calculateHammingDistance(geohashOne, geohashTwo) {
  if (geohashOne.length === geohashTwo.length) {
    let distanceCount = 0
    for (let index = 0; index < geohashOne.length; index++) {
      if (!(geohashOne[index] === geohashTwo[index])) {
        distanceCount += 1
      }
    }
    return distanceCount
  } else {
    return -1
  }
}

/**
 * Plan Route By Hamming Distance
 * Params: CourierLocation, DeliveryList
 */
function planRouteByHammingDistance(courierLocation, deliveryList) {
  const coordinatePrecision = 7
  const courierGeohash = encodeCoordinatesToGeohash(courierLocation.latitude, courierLocation.longitude, coordinatePrecision)
  const scoredDeliveryList = deliveryList.map(deliveryItem => {
    const deliveryGeohash = encodeCoordinatesToGeohash(deliveryItem.latitudeValue, deliveryItem.longitudeValue, coordinatePrecision)
    const distanceScore = calculateHammingDistance(courierGeohash, deliveryGeohash)
    return { deliveryItem, distanceScore }
  })
  const sortedDeliveryList = scoredDeliveryList.sort((firstItem, secondItem) => firstItem.distanceScore - secondItem.distanceScore)
  return sortedDeliveryList.map(item => item.deliveryItem)
}

/**
 * Start Calculation
 */
const jsonPath = path.join(__dirname, 'location_array.json')
const locationArray = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
const courierLocation = { latitude: -7.2, longitude: 112.7 }
const optimizedRoute = planRouteByHammingDistance(courierLocation, locationArray)
console.log('Optimized Delivery Order:')
optimizedRoute.forEach((item, index) => {
  console.log(`${index + 1}. ${item.locationName} (${item.latitudeValue}, ${item.longitudeValue})`)
})