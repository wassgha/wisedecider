import { store } from 'react-easy-state'
import shortid from 'shortid'
import randomColor from 'randomcolor'
import _ from 'lodash'
import axios from 'axios'
import { arrayMove } from 'react-sortable-hoc'

import { BLOCK, SERVER_HOST } from '../constants'

const worksheet = store({
  id: null,
  blocks: [],
  choices: [],
  values: [],
  scores: {},
  isLoading: true,
  isSaving: false,
  async load(id) {
    worksheet.isLoading = true
    const { data } = await axios.get(`${SERVER_HOST}api/worksheet/${id}`)
    worksheet.id = id
    worksheet.blocks = data.blocks || []
    worksheet.choices = data.choices || []
    worksheet.values = data.values || []
    worksheet.scores = data.scores || {}
    worksheet.isLoading = false
    worksheet.isSaving = false
  },
  async new() {
    worksheet.isLoading = true
    const createdWorksheet = await axios.post(`${SERVER_HOST}api/worksheet`)
    const id = createdWorksheet.data._id
    worksheet.id = id
    worksheet.blocks = [
      {
        id: shortid.generate(),
        type: BLOCK.TITLE,
        data: {
          placeholder: 'Insert decision name here...'
          // tag: 'h1',
          // title: 'My decision'
        }
      },
      {
        id: shortid.generate(),
        type: BLOCK.TEXT,
        data: {
          placeholder:
            'Use this paragraph to describe the decision you are trying to make and any important background information related to the decision...'
          // content: 'Your text here'
        }
      }
    ]
    worksheet.choices = [
      // {
      //   id: shortid.generate(),
      //   name: 'An example choice',
      //   color: randomColor({ luminosity: 'dark' })
      // },
      // {
      //   id: shortid.generate(),
      //   name: 'Another example choice',
      //   color: randomColor({ luminosity: 'dark' })
      // }
    ]
    worksheet.values = [
      // { id: shortid.generate(), name: 'First value' },
      // { id: shortid.generate(), name: 'Second value' }
    ]
    worksheet.scores = {}
    worksheet.isLoading = false
    worksheet.save()
    return id
  },
  async loadExample() {
    worksheet.isLoading = true
    worksheet.blocks = [
      {
        id: 'Zzw_oNoIl',
        type: 'title',
        data: {
          placeholder: 'Insert decision name here...',
          title: 'Choosing Universities and Colleges'
        }
      },
      {
        id: 'iP2f9nGb-',
        type: 'text',
        data: {
          content:
            "In this worksheet, we will explore deciding between colleges and universities to apply to next year. We have already visited the campuses of @C1, @C2 and @C3 and really enjoyed all of our visits. We have not visited @C4 's campus yet but it seemed like a great fit based on the website."
        }
      },
      {
        id: 'b2cDFMDUX',
        type: 'text',
        data: {
          content:
            'For us, a great @V3  and @V4 are very important. However, it is necessary that the school provides enough @V2 to be considered since we are seeking at least a 60% scholarship (both @C4 and @C2 have more than 80% of need met). Having a great @V4 and a good Computer Science department is crucial to this decision.'
        }
      }
    ]
    worksheet.choices = [
      { id: 'nXZ97UZNY', name: 'Lafayette College', color: '#910b1a' },
      { id: '5BNbQUcDZ', name: 'Lehigh University', color: '#502d0e' },
      { id: 'QydKBsCGu', name: 'Stanford', color: '#c41e3a' },
      { id: 'ffdztAocz', name: 'Connecticut College', color: '#002f5f' }
    ]
    worksheet.scores = {
      '5BNbQUcDZ': {
        '3cTD_db9b': { score: 5 },
        aL6LHLNJi: { score: 3 },
        DcWcn4hy0: { score: 2 },
        PxZ9UZmDC: { score: 3 }
      },
      ffdztAocz: {
        '3cTD_db9b': { score: 3 },
        aL6LHLNJi: { score: 1 },
        DcWcn4hy0: { score: 4 },
        PxZ9UZmDC: { score: 2 }
      },
      nXZ97UZNY: {
        '3cTD_db9b': { score: 4 },
        aL6LHLNJi: { score: 4 },
        DcWcn4hy0: { score: 4 },
        PxZ9UZmDC: { score: 4 }
      },
      QydKBsCGu: {
        '3cTD_db9b': { score: 5 },
        aL6LHLNJi: { score: 5 },
        DcWcn4hy0: { score: 1 },
        PxZ9UZmDC: { score: 5 }
      }
    }
    worksheet.isLoading = false
  },
  addBlock(type = BLOCK.TEXT, data = {}, index = worksheet.blocks.length) {
    const id = shortid.generate()
    worksheet.blocks.splice(index, 0, { id, type, data })
    worksheet.save()
    return id
  },
  removeBlock(id) {
    if (!id) return
    const blockIndex = _.findIndex(worksheet.blocks, { id })
    _.remove(worksheet.blocks, { id })
    worksheet.save()
    const previousBlock = worksheet.blocks[blockIndex - 1]
    return previousBlock && previousBlock.id
  },
  getPrevBlock(id) {
    if (!id) return
    const blockIndex = _.findIndex(worksheet.blocks, { id })
    const previousBlock = worksheet.blocks[blockIndex - 1]
    return previousBlock
  },
  getNextBlock(id) {
    if (!id) return
    const blockIndex = _.findIndex(worksheet.blocks, { id })
    const nextBlock = worksheet.blocks[blockIndex + 1]
    return nextBlock
  },
  editBlock(id, data) {
    const block = _.find(worksheet.blocks, { id })
    if (!block) return
    if (typeof data != 'undefined') block.data = { ...block.data, ...data }
    worksheet.save()
  },
  addValue(name = 'Value') {
    const id = shortid.generate()
    worksheet.values.push({ id, name })
    // Add score for each choice
    worksheet.choices.forEach(choice => {
      worksheet.rate(choice.id, id, 1, '', false)
    })
    worksheet.save()
    return id
  },
  editValue(id, name) {
    const value = _.find(worksheet.values, { id })
    if (!value) return
    if (typeof name != 'undefined') value.name = name
    worksheet.save()
  },
  removeValue(id) {
    if (!id) return
    const valueIndex = _.findIndex(worksheet.values, { id })
    _.remove(worksheet.values, { id })
    const previousValue = worksheet.values[valueIndex - 1]
    // Remove from scores
    Object.keys(worksheet.scores).forEach(choice => {
      if (worksheet.scores[choice][id]) delete worksheet.scores[choice][id]
    })
    worksheet.save()
    return previousValue && previousValue.id
  },
  moveValue({ oldIndex, newIndex }) {
    if (oldIndex < 1 || newIndex < 1) return
    worksheet.values = arrayMove(worksheet.values, oldIndex - 1, newIndex - 1)
    worksheet.save()
  },
  addChoice(name = 'Choice', color = randomColor({ luminosity: 'dark' })) {
    const id = shortid.generate()
    worksheet.choices.push({ id, name, color })
    // Add score for each value
    worksheet.values.forEach(value => {
      worksheet.rate(id, value.id, 1, '', false)
    })
    worksheet.save()
    return id
  },
  editChoice(id, name, color) {
    const choice = _.find(worksheet.choices, { id })
    if (!choice) return
    if (typeof name != 'undefined') choice.name = name
    if (typeof color != 'undefined') choice.color = color
    worksheet.save()
  },
  removeChoice(id) {
    if (!id) return
    const choiceIndex = _.findIndex(worksheet.choices, { id })
    _.remove(worksheet.choices, { id })
    // Remove from scores
    if (worksheet.scores[id]) delete worksheet.scores[id]
    worksheet.save()
    const previousChoice = worksheet.choices[choiceIndex - 1]
    return previousChoice && previousChoice.id
  },
  moveChoice({ oldIndex, newIndex }) {
    worksheet.choices = arrayMove(worksheet.choices, oldIndex, newIndex)
    worksheet.save()
  },
  rate(choiceId, valueId, score, comment, save = true) {
    if (!worksheet.scores[choiceId]) worksheet.scores[choiceId] = {}
    if (!worksheet.scores[choiceId][valueId]) worksheet.scores[choiceId][valueId] = {}
    worksheet.scores[choiceId][valueId] = {
      ...worksheet.scores[choiceId][valueId],
      ...(typeof score != 'undefined' ? { score } : {}),
      ...(typeof comment != 'undefined' ? { comment } : {})
    }
    if (save) {
      worksheet.save()
    }
  },
  save: _.debounce(async () => {
    // if (storage) {
    //   storage.worksheet = worksheet
    // }
    worksheet.isSaving = true
    await axios.put(`${SERVER_HOST}api/worksheet/${worksheet.id}`, {
      ...worksheet
    })
    worksheet.isSaving = false
  }, 500)
})

export default worksheet
