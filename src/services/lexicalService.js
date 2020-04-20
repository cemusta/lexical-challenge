const assert = require('assert').strict

const validate = (input) => {
  assert.ok(input, 'input is missing')

  const wordCount = input.split(' ').length
  assert.ok(wordCount <= 100, 'too many words')

  const charCount = input.length
  assert.ok(charCount <= 1000, 'input too long')

  const normalized = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ').replace(/\s+/g, ' ').trim()
  assert.ok(normalized.length > 0, 'input missing any word')
}

const getRatio = (input, nonLexical) => {
  assert.ok(input, 'input is missing')
  assert.ok(nonLexical, 'nonLexical is missing')

  // normalization: replace punctuation, remove extra spaces, trim and then lowercase
  const normalized = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
  // assert.ok(input.length > 1, 'input is missing, after normalization')

  // tokenize
  const words = normalized.split(' ')

  // filter
  const filtered = words.filter(y => !nonLexical.includes(y))

  const ratio = (filtered.length / words.length).toFixed(2)

  const result = { overall_ld: parseFloat(ratio) }

  return result
}

const getRatioVerbose = (input, nonLexical) => {
  assert.ok(input, 'input is missing')
  assert.ok(nonLexical, 'nonLexical is missing')

  const sentences = input.split('.')

  const res = sentences.map(x => getRatio(x, nonLexical).overall_ld)

  const overall = getRatio(input, nonLexical).overall_ld

  const result = { sentence_ld: res, overall_ld: overall }

  return result
}

module.exports = {
  validate,
  getRatio,
  getRatioVerbose
}
