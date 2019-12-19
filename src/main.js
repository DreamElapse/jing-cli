const fs = require('fs')
const path = require('path')
const program = require('commander')
const handleBars = require('handlebars')
// 提问
const inquire = require('inquirer')
// 下载git项目
const download = require('download-git-repo')
// 下载时，有一个好看的交互动画
const ora = require('ora')

const packageJson = require('../package.json')
const questions = require('./questions')
const meta = require('./meta')



program.version(packageJson.version, '-V, --version')
program
  .command('init', 'Generate a new project from a template')
  .description('Generate a new project')
  .alias('new')
  .action(() => {
    ask()
})
const spinner = ora('downloading template ...')

help()

/**
 * help
 * @returns {never}
 */
function help() {
  program.parse(process.argv)
  if (program.args.length < 1) {
    return program.help()
  }
}

/**
 * cli
 */
function ask() {
  inquire
    .prompt(questions)
    .then((answers) => {
      const url = meta.template[answers.template] || answers.template
      meta.params = answers
      spinner.start()
      spinner.color = 'green'
      downloadTemplate({...answers, url})
  })
}

/**
 * load template
 * @param url: target url
 * @param filePath: target project dir
 * @param project: target project name
 */
function downloadTemplate({url, filePath, project}) {
  const dest = path.join(process.cwd(),  filePath, project)
  download(`direct:${url}`, dest,{clone: true}, (err) => {
    if (err) {
      spinner.fail('loading template failed, please check url or network')
      return
    }
    delete meta.params.filePath
    fileDisplay(dest, resolveFile)
    setTimeout(() => {
      spinner.succeed()
    }, 1000)
  })
}

/**
 * rebuild file content
 * @param filename
 */
function resolveFile(filename, index) {
  let flag = /(.js|.vue|.ts|.jsx|.html|.json|.md)$/.test(filename)
  if (!flag) return
  try {
    let source = fs.readFileSync(filename, 'utf-8')
    let tmp = handleBars.compile(source)
    let data = meta.params
    let result = tmp(data)
    fs.writeFileSync(filename, result)
  } catch (e) {
    console.log('rebuilt-error:', filename)
  }
}
/**
 * find any file
 * @param filePath
 */
function fileDisplay(filePath) {
  try {
    let files = fs.readdirSync(filePath)
    files.forEach((filename, index) => {
      const filedir = path.join(filePath, filename)
      const stats = fs.statSync(filedir)
      if (stats.isDirectory()) {
        fileDisplay(filedir)
      } else {
        resolveFile(filedir, index)
      }
    })
  } catch (e) {
    console.warn(e)
  }
}
