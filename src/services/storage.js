
export const getListByKey = (listKey) => JSON.parse(localStorage.getItem(listKey) ?? '[]')
export const setListByKey = (listKey, items) => localStorage.setItem(listKey,
  JSON.stringify(Array.isArray(items) ? items : [])
)