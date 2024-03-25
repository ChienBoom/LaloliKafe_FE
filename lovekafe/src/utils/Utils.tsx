export const sleep = (time?: number) => new Promise((resolve) => setTimeout(resolve, time ?? 500))

export function isDate(dateString: string) {
  return !isNaN(Date.parse(dateString))
}

export function getAxiosParams(params: any): URLSearchParams {
  if (!params) return new URLSearchParams()
  const { pageIndex, pageSize, orderBy, ...customParams } = params

  const axiosParam = new URLSearchParams()
  const top = pageSize ?? 20
  const skip = ((pageIndex ?? 1) - 1) * top

  axiosParam.append('skip', skip.toString())
  axiosParam.append('top', top.toString())
  if (orderBy) axiosParam.append('order', orderBy) //(name|asc) hoặc (name|desc)

  if (!customParams) return axiosParam
  for (const key of Object.keys(customParams)) {
    axiosParam.append(key, params[key])
  }
  return axiosParam
}
