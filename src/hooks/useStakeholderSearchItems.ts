import usePheicNames from 'queryHooks/usePheicNames'
import useStakeholders from 'queryHooks/useStakeholders'
import { useMemo } from 'react'
import simplifyForUrl from 'utilities/simplifyForUrl'

const useStakeholderSearchItems = () => {
  const stakeholders = useStakeholders()
  const pheics = usePheicNames()

  const items = useMemo(
    () =>
      [
        ...stakeholders.map(stakeholder => ({
          key: stakeholder.name ?? '',
          label: stakeholder.name ?? '',
          url: `/${stakeholder.slug}/${simplifyForUrl(stakeholder.name ?? '')}`,
        })),
        ...pheics.map(pheic => ({
          key: pheic.data?.PHEIC_name ?? '',
          label: pheic.data?.PHEIC_name ?? '',
          url: `/pheic/${simplifyForUrl(pheic.data?.PHEIC_name ?? '')}`,
        })),
      ].sort((a, b) => a.label.localeCompare(b.label)),
    []
  )

  return items
}

export default useStakeholderSearchItems
