const format = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
})

const formatDisplayNumber = (num: number) => format.format(num)

export default formatDisplayNumber
