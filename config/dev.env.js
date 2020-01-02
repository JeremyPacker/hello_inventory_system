'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AIRTABLE_API_KEY: '"keyysM2h2Va9vpmru"',
  AIRTABLE_BASE: '"appH4DsvAZMNZ3VJU"'
})
