const lexicalService = require('./lexicalService')
const nonLexical = require('../constants/nonLexical')

const first = 'Kim loves going to the cinema'
const second = 'Cem does not love going to the cinema'

const multiSentence = `${first}. ${second}`

describe('Testing complexity service', () => {
  describe('validate()', () => {
    const words = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20'
    const wordLimit = `${words} ${words} ${words} ${words} ${words}`
    const chars = '1234567890abcde1234567890'
    const twoHunderdChars = `${chars}${chars}${chars}${chars}${chars}${chars}${chars}${chars}`
    const charLimit = `${twoHunderdChars}${twoHunderdChars}${twoHunderdChars}${twoHunderdChars}${twoHunderdChars}`

    it('should accept normal input', async () => {
      expect(() => lexicalService.validate(first))
        .not.toThrow('input is missing')
    })

    it('should return not exception: with valid input', async () => {
      expect(() => lexicalService.validate())
        .toThrow('input is missing')
    })

    it('should accept long but within limit input', async () => {
      expect(() => lexicalService.validate(wordLimit))
        .not.toThrow('too many words')
    })

    it('should return not exception: too many words', async () => {
      expect(() => lexicalService.validate(wordLimit + ' 101'))
        .toThrow('too many words')
    })

    it('should accept long but within limit input - char', async () => {
      expect(() => lexicalService.validate(charLimit))
        .not.toThrow('input too long')
    })

    it('should return not exception: too many chars', async () => {
      expect(() => lexicalService.validate(charLimit + 'X'))
        .toThrow('input too long')
    })

    it('should return exception if only spaces', async () => {
      expect(() => lexicalService.validate('     '))
        .toThrow('input missing any word')
    })

    it('should return exception if only dots', async () => {
      expect(() => lexicalService.validate('.........'))
        .toThrow('input missing any word')
    })
  })

  describe('getRatio()', () => {
    it('should return exception: input is missing', async () => {
      expect(() => lexicalService.getRatio())
        .toThrow('input is missing')
    })

    it('should return exception: nonLexical is missing', async () => {
      expect(() => lexicalService.getRatio(first))
        .toThrow('nonLexical is missing')
    })

    it('should return correct ratio first sentence', async () => {
      const result = lexicalService.getRatio(first, nonLexical)

      expect(result).toEqual({ overall_ld: '0.67' })
    })

    it('should return correct ratio second sentence', async () => {
      const result = lexicalService.getRatio(second, nonLexical)

      expect(result).toEqual({ overall_ld: '0.63' })
    })

    it('should return correct ratio for multi sentence', async () => {
      const result = lexicalService.getRatio(multiSentence, nonLexical)

      expect(result).toEqual({ overall_ld: '0.64' })
    })
  })

  describe('getRatioVerbose()', () => {
    it('should return exception: input is missing', async () => {
      expect(() => lexicalService.getRatioVerbose())
        .toThrow('input is missing')
    })

    it('should return exception: nonLexical is missing', async () => {
      expect(() => lexicalService.getRatioVerbose(first))
        .toThrow('nonLexical is missing')
    })

    it('should return correct ratio for first sentence', async () => {
      const result = lexicalService.getRatioVerbose(first, nonLexical)

      expect(result).toEqual({ sentence_ld: ['0.67'], overall_ld: '0.67' })
    })

    it('should return correct ratio for second sentence', async () => {
      const result = lexicalService.getRatioVerbose(second, nonLexical)

      expect(result).toEqual({ sentence_ld: ['0.63'], overall_ld: '0.63' })
    })

    it('should return correct ratio multi sentence', async () => {
      const result = lexicalService.getRatioVerbose(multiSentence, nonLexical)

      expect(result).toEqual({ sentence_ld: ['0.67', '0.63'], overall_ld: '0.64' })
    })
  })
})
