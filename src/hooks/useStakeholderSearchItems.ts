import useStakeholders from "queryHooks/useStakeholders"
import { useMemo } from "react"
import simplifyForUrl from "utilities/simplifyForUrl"



const useStakeholderSearchItems = () => {
  const stakeholders = useStakeholders()

  const items = useMemo(() =>
    stakeholders.map(stakeholder => ({
      key: stakeholder.name ?? '',
      label: stakeholder.name ?? '',
      url: stakeholder.iso3 && stakeholder.iso3 !== ''
        ? `/countries/${simplifyForUrl(stakeholder.iso3)}`
        : `/organizations/${simplifyForUrl(stakeholder.name ?? '')}`
    })).sort((a, b) => a.label.localeCompare(b.label)),
    []
  )

  console.log(items)

  return items
}

export default useStakeholderSearchItems
