import { BLOCK } from '../../constants'
import shortid from 'shortid'
import mongoose from 'mongoose'
import randomColor from 'randomcolor'

const Schema = mongoose.Schema

const worksheetSchema = new Schema({
  blocks: [
    {
      id: { type: String, required: true, default: shortid.generate },
      type: { type: String, enum: Object.values(BLOCK), required: true },
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
  scores: Schema.Types.Mixed
})

module.exports = mongoose.model('Worksheet', worksheetSchema)
