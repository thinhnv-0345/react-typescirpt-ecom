const generateFetchUrl = (
  {
    page = 1,
    limit = 16,
    sortField = 'brand',
    order = 'ASC'
  }: { page?: number; limit?: number; sortField?: string; order?: 'ASC' | 'DESC' } = {},
  currBrands?: string[] | undefined,
  option?: any,
  searchKeyword: string = ''
): string => {
  let fetchUrl: string = '/products?'
  // paginate
  fetchUrl = fetchUrl + `_page=${page}&_limit=${limit}`

  // sort
  if (sortField) {
    fetchUrl = fetchUrl + `&_sort=${sortField}&_order=${order}`
  }

  // operators
  if (option) {
    for (const key in option) {
      if (option[key]) {
        const encodeValue = encodeURIComponent(option[key])
        fetchUrl = fetchUrl + `&${key}=${encodeValue}`
      }
    }
  }

  // brands
  if (currBrands && currBrands.length > 0) {
    currBrands.forEach(val => {
      const encodeValue = encodeURIComponent(val)
      fetchUrl = fetchUrl + `&brand=${encodeValue}`
    })
  }

  //search keyword
  if (searchKeyword.trim()) {
    const encodevalue = encodeURIComponent(searchKeyword)
    fetchUrl = fetchUrl + `&name_like=${encodevalue}`
  }

  return fetchUrl
}

export default generateFetchUrl
