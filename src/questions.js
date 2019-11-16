const meta = require('./meta')
const choices = []
const SELF_TEMPLATE = 'self template'
for (let key in meta.template) {
  choices.push(key)
}
choices.push(SELF_TEMPLATE)
module.exports = [
  {
    name: 'project',
    message: 'Project Name:',
    validate(val) {
      if (!val.trim()) {
        return 'Project name is required!'
      }
      return true
    }
  },
  {
    type: 'rawlist',
    name: 'template',
    message: 'Select template:',
    choices,
  },
  {
    type: 'input',
    name: 'template',
    message: 'input your template URL',
    when(val) {
      return val.template === SELF_TEMPLATE
    },
    validate(val) {
      if (!val.trim()) {
        return 'template URL is required!'
      }
      return true
    }
  },
  {
    name: 'description',
    message: 'Project Description:',
    default: 'A description of project!'
  },
  {
    name: 'port',
    message: 'Server Port',
    default: ~~(Math.random() * (10000 - 3000)) + 3000,
    validate(val) {
      if (val < 1 || isNaN(val)) {
        val = ''
        return 'Server Port is Number!'
      }
      return true
    }
  },
  {
    name: 'filePath',
    message: 'Where to init the project:',
    default: './',
    validate(val) {
      if (!val.trim()) {
        return 'Project path is required!'
      }
      return true
    }
  },
]
