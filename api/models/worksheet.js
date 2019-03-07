const Constants = require('../../constants')
const shortid = require('shortid')
const mongoose = require('mongoose')
const randomColor = require('randomcolor')

const Schema = mongoose.Schema

const worksheetSchema = new Schema({
  blocks: [
    {
      id: { type: String, required: true, default: shortid.generate },
      type: { type: String, enum: Object.values(Constants.BLOCK), required: true },
      data: { type: Schema.Types.Mixed }
    }
  ],
  choices: [
    {
      id: { type: String, required: true, default: shortid.generate },
      name: { type: String, required: true, default: 'Choice' },
      color: { type: String, required: true, default: () => randomColor({ luminosity: 'dark' }) }
    }
  ],
  values: [
    {
      id: { type: String, required: true, default: shortid.generate },
      name: { type: String, required: true, default: 'Value' }
    }
  ],
  scores: Schema.Types.Mixed,
  color: { type: String, required: false, default: () => randomColor({ luminosity: 'dark' }) }
})

module.exports = mongoose.model('Worksheet', worksheetSchema)
