import { getStyle } from '@coreui/utils';
import React from 'react';
import { useFetchBudgetMutation } from 'src/api/budget';

const random = () => Math.round(Math.random() * 100)
const defaultLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const defaultDatasets =  [
  {
    label: 'First Dataset',
    backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
    borderColor: getStyle('--cui-info'),
    pointHoverBackgroundColor: getStyle('--cui-info'),
    borderWidth: 2,
    fill: true,
    data: defaultLabels.map(() => random(50, 200)),
  },
  {
    label: 'Second Dataset',
    backgroundColor: 'transparent',
    borderColor: getStyle('--cui-success'),
    pointHoverBackgroundColor: getStyle('--cui-success'),
    borderWidth: 2,
    data: defaultLabels.map(() => random(50, 200)),

  },

  // Will represent the average/mean values
  {
    label: 'Average Values',
    backgroundColor: 'transparent',
    borderColor: getStyle('--cui-danger'),
    pointHoverBackgroundColor: getStyle('--cui-danger'),
    borderWidth: 1,
    borderDash: [8, 5],
    data: defaultLabels.map(() => 65),
  },
]
const defaultRates = [
    { title: 'Budget', value: '29.703', percent: 40, color: 'success' },
    { title: 'FUND01', value: '24.093', percent: 20, color: 'info' },
    { title: 'FUND02', value: '78.706', percent: 60, color: 'warning' },
]

const makeRates = (labels, values) => {
    let progressRates = labels.map((title, i) => {
      let color = 'warning';
      let value = parseFloat(values[i] *  100).toFixed(2);
      let percent = Math.round(value);
  

      if (percent > 50)
          color = 'info'
      else if (percent >= 100)
          color = 'success'

      return {
          title,
          value,
          percent,
          color,
      }
    })
    return progressRates;
}
const transformData = (data) => {
  const labels = [];
  const annualLabels = data[0].annual.map(a => a.year);

  const annualDatasets = data.map(item => {
    labels.push(item.name);
    return {
      name: item.name,
      labels: annualLabels,
      datasets: [
        {
          label: 'Allotment',
          backgroundColor: 'transparent',
          borderColor: getStyle('--cui-danger'),
          pointHoverBackgroundColor: getStyle('--cui-danger'),
          borderWidth: 1,
          borderDash: [8, 5],
          data: item.annual.map(a => a.Allotment)
        },
        {
          label: 'Obligated',
          backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          fill: true,
          data: item.annual.map(a => a.Obligated)
        },
        {
          label: 'Rate',
          backgroundColor: 'transparent',
          borderColor: getStyle('--cui-danger'),
          pointHoverBackgroundColor: getStyle('--cui-danger'),
          borderWidth: 0,
          borderDash: [8, 5],
          data: item.annual.map(a => a['Utilization Rate'])
        },
      ],
      maxAllotment: Math.max(...item.annual.map(a => a.Allotment)),
      meanValue: item.annual.map(a => (a.Allotment + a.Obligated) / 2),
      progressRates: makeRates(annualLabels, item.annual.map(a => a["Utilization Rate"]))
      
    }
  })

  let progressRates = {};
  annualDatasets.forEach(item => {
    progressRates[item.name] = item.progressRates
  })

  return {
    title: data?.title || 'Budget Overview',
    labels,
    annual: {
      labels: annualLabels,
      datasets: annualDatasets,
    },
    progressRates: progressRates,
  };
}



export const useBudgetCharting = (name) => {
  const [fetchBudget] = useFetchBudgetMutation();
  const [progressRates, setProgressRates] = React.useState(defaultRates);

  const [data, setData ] = React.useState({
    labels: [] || defaultLabels,
    datasets: [] || defaultDatasets,
  });
  
  

  const getBudgetData = async () => {
    const res = await fetchBudget(name).unwrap();
    if (res.data) {
        const formatted = transformData(res.data);
        setData(formatted)
        setProgressRates(formatted.progressRates)
    }
  }


  return {
    data,
    progressRates,
    getBudgetData,
  }
}