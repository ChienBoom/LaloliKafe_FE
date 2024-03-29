import { useCallback, useEffect, useState } from 'react'
import { Select, SelectProps, Spin } from 'antd'
import Api from '../../apis/Api'

interface Props extends SelectProps {
  apiParam?: any
  apiName?: string
  width?: string
  isLazy?: boolean
  isLoadFirst?: boolean
  displayField?: string
  valueField?: string
}

export default function ChSelect({
  apiName,
  apiParam,
  width,
  displayField = 'name',
  valueField = 'id',
  options = [],
  isLazy = false,
  isLoadFirst = false,
  ...props
}: Props) {
  const [apiOptions, setApiOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const pageSize = isLazy ? 20 : 99999

  const mappingData = useCallback(
    (data: any[]) => {
      return data?.map((m: any) => ({ label: m[displayField] ?? '', value: m[valueField], ...m })) ?? []
    },
    [displayField, valueField]
  )

  const fetchApis = useCallback(
    async (pageIndex: number) => {
      if (!apiName) return
      setLoading(true)
      const response = await Api[apiName]
        .get({ ...apiParam, pageIndex, pageSize })
        .then((response: any) => response)
        .catch((e: any) => console.log(e))
      if (isLazy) {
        setApiOptions([...apiOptions, ...mappingData(response?.data ?? [])])
      } else {
        setApiOptions(mappingData(response?.data ?? []))
      }
      setLoading(false)
      return response
    },
    [apiName, apiOptions, apiParam, isLazy, mappingData, pageSize]
  )

  const onPopupScroll = async (e: any) => {
    const { target } = e
    if (!apiName || options.length > 0) return
    if (!loading && isLazy && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (totalCount <= apiOptions.length) {
        return
      }
      const pageUp = pageIndex + 1
      setPageIndex(pageUp)
      await fetchApis(pageUp)
    }
  }

  const onDropdownVisibleChange = async (open: boolean) => {
    if (!open || apiOptions.length > 0 || !apiName || options.length > 0) return
    const response = await fetchApis(1)
    setTotalCount(response?.totalCount)
  }

  useEffect(() => {
    if (isLoadFirst) onDropdownVisibleChange(true)
  }, [])

  return (
    <Select
      {...props}
      style={{ width: width }}
      allowClear
      showSearch
      loading={loading}
      optionFilterProp="children"
      notFoundContent={loading ? <Spin className="block left-5 top-5" size="small" /> : null}
      filterOption={(input, option) => ((option?.label ?? '') as string).toLowerCase().includes(input.toLowerCase())}
      options={options?.length > 0 ? options : apiOptions}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onPopupScroll={onPopupScroll}
    />
  )
}
