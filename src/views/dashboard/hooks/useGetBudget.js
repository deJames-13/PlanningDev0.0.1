import React from 'react'
import { useBudgetCharting } from '../hooks/useBudgetCharter'

const selectTabs = ['Budget', 'FUND 01', 'FUND 02']

export default function useGetBudget({sector = null}) {
    const {data, getBudgetData, progressRates } = useBudgetCharting()
    const [rates, setRates] = React.useState([])
    const [tabs, setTabs] = React.useState()
    const [activeTab, setActiveTab] = React.useState(selectTabs[0])
    const [fund, setFund] = React.useState(null)
    const [updating, setUpdating] = React.useState(false)

    React.useEffect(() => {
        setUpdating(true)
        getBudgetData().then(() => setUpdating(false))
    }, [activeTab])

    

    React.useEffect(() => {
        if (sector) {
            setUpdating(true)
            getBudgetData(sector).then(() => setUpdating(false))
        }
        console.log(sector);
        
    }, [sector])


    React.useEffect(() => {
        const idx = data.labels.indexOf(activeTab) || 0
        setTabs(data.labels.slice(idx, idx + 2))
        if (data?.annual){
        const fund = data?.annual?.datasets?.find(item => item.name === activeTab)
        setFund(fund)
        setRates(data?.progressRates[activeTab])
        }
        console.log(data);
        console.table(data.progressRates)
        
    }, [data])


    const onTab = (tab, direction) => {
        const idx = data.labels.indexOf(tab)
        setActiveTab(tab)
        if (idx !== -1) {
        const nextTabs = data.labels.slice(idx, idx + 2)
        setTabs(nextTabs)
        }

        if (direction === 'prev') {
        const idx = data.labels.indexOf(tab)
        const nextTabs = data.labels.slice(idx - 1, idx + 1)
        setTabs(nextTabs)
        }

        if (direction === 'next') {
        const idx = data.labels.indexOf(tab)
        const nextTabs = data.labels.slice(idx, idx + 2)
        setTabs(nextTabs)
        }
    }

    return {
        onTab,
        data,
        tabs,
        activeTab,
        fund,
        rates,
        progressRates,
        updating

    }
}
