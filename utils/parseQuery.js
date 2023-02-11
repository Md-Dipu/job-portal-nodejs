const renameMongoOperatorsKeys = (obj) => {
  const operators = 'all and elemMatch eq exists expr gt gte in jsonSchema lt lte meta mod ne nin nor not or regex size slice text type where'
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') renameMongoOperatorsKeys(obj[key])
      if (operators.split(' ').includes(key)) {
        const newKey = `$${key}`
        obj[newKey] = obj[key]
        delete obj[key]
      }
    }
  }
}

module.exports = (query) => {
  let { fields, limit, page, sortby, ...filters } = query

  // processing queries object
  renameMongoOperatorsKeys(filters)

  // processing queries object
  const queries = {}

  if (fields) {
    fields = fields.split(',').join(' ')
    queries.fields = fields
  }

  queries.limit = parseInt(limit) || 10
  queries.skip = queries.limit * ((parseInt(page) || 1) - 1)

  if (sortby) {
    sortby = sortby.split(',').join(' ')
    queries.sortby = sortby
  }

  return { filters, queries }
}
