import React from 'react';

import { getStyle } from '@coreui/utils';
import { useDispatch, useSelector } from 'react-redux';
import DetailedToast from 'src/components/toast/detail';
import { useGetBudgetMutation } from 'src/states/api/charts';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getBudgetFailure,
  getBudgetStart,
  getBudgetSuccess,
  setSector,
} from 'src/states/slices/budget';

const random = () => Math.round(Math.random() * 100)
const defaultLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const defaultDatasets = [
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
    data: defaultLabels.map(() => 0.65),
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
    let value = parseFloat((parseFloat(values[i]) || 0) * 100).toFixed(2);
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
  if (!data?.length) return null;
  const labels = [];
  const keys = ['year', 'allotment', 'obligated', 'utilization_rate'];

  const annualDatasets = data.map(item => {
    labels.push(item.name || item.title);
    let allotement = item.annual.map(a => parseFloat(a[keys[1]] || 0));
    let obligated = item.annual.map(a => parseFloat(a[keys[2]] || 0));
    let rate = item.annual.map(a => {
      let val = parseFloat(parseFloat(a[keys[2]] || 0) / parseFloat(a[keys[1]] || 0)).toFixed(2);
      return isNaN(val) ? 0 : val * 100;
    });
    let annualLabels = item.annual.map(a => a.year);
    return {
      name: item.name || item.title,
      labels: annualLabels,
      datasets: [
        {
          label: keys[1] || 'Allotment',
          backgroundColor: 'transparent',
          borderColor: getStyle('--cui-danger'),
          pointHoverBackgroundColor: getStyle('--cui-danger'),
          borderWidth: 2,
          data: allotement,
        },
        {
          label: keys[2] || 'Obligated',
          backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          fill: true,
          data: obligated,
        },
        {
          label: keys[3] || 'Rate',
          backgroundColor: 'transparent',
          borderColor: getStyle('--cui-danger'),
          pointHoverBackgroundColor: getStyle('--cui-danger'),
          borderWidth: 1,
          borderDash: [8, 5],
          yAxisID: 'y1',
          data: rate,
        },
      ],
      maxAllotment: Math.max(...item.annual.map(a => parseFloat(a[keys[1]] || 0))),
      meanValue: item.annual.map(a => (parseFloat(a[keys[2]] || 0) + parseFloat(a[keys[1]] || 0)).toFixed(2) / 2),
      progressRates: makeRates(annualLabels, rate)

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
      labels: labels,
      datasets: annualDatasets,
    },
    progressRates: progressRates,
    last_updated: (new Date()).toLocaleString()
  };
}

const getFundFromYear = (data, year) => {
  if (!data?.length) return null;
  const yearData = data.find(d => d.year == year);
  if (!yearData?.quarters) return null;
  const quarterLabels = yearData.quarters.map(q => `Q${q.quarter}`);
  return {
    labels: quarterLabels,
    datasets: [
      {
        label: 'Allotment',
        backgroundColor: 'transparent',
        borderColor: getStyle('--cui-danger'),
        pointHoverBackgroundColor: getStyle('--cui-danger'),
        borderWidth: 1,
        borderDash: [8, 5],
        data: yearData.quarters.map(q => parseFloat(q.allotment || 0)),
      },
      {
        label: 'Obligated',
        backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
        borderColor: getStyle('--cui-info'),
        pointHoverBackgroundColor: getStyle('--cui-info'),
        borderWidth: 2,
        fill: true,
        data: yearData.quarters.map(q => parseFloat(q.obligated || 0)),
      },
      {
        label: 'Rate',
        backgroundColor: 'transparent',
        borderColor: getStyle('--cui-danger'),
        pointHoverBackgroundColor: getStyle('--cui-danger'),
        borderWidth: 0,
        yAxisID: 'y1',
        data: yearData.quarters.map(q => parseFloat(q.utilization_rate || 0)),
      },
    ],
    maxAllotment: Math.max(...yearData.quarters.map(q => parseFloat(q.allotment || 0))),
    meanValue: yearData.quarters.map(q => (parseFloat(q.obligated || 0) + parseFloat(q.allotment || 0)).toFixed(2) / 2),
    progressRates: makeRates(quarterLabels, yearData.quarters.map(q => parseFloat(q.utilization_rate || 0)))
  }
}



export const useBudgetCharting = (name) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const budgetState = useSelector(s => s.budget);
  const [getBudget] = useGetBudgetMutation();
  const [progressRates, setProgressRates] = React.useState(defaultRates);

  const [data, setData] = React.useState({
    labels: [] || defaultLabels,
    datasets: [] || defaultDatasets,
  });
  const [rawData, setRawData] = React.useState(null);



  const getBudgetData = async (name) => {
    if (budgetState.sectorBudgets[name]) {
      setData(budgetState.sectorBudgets[name])
      setProgressRates(budgetState.sectorBudgets[name].progressRates)
    }

    dispatch(setSector(name))
    dispatch(getBudgetStart())
    return getBudget(name).unwrap().then(res => {
      if (res.data) {
        const formatted = transformData(res.data);
        if (!formatted) {
          setData(null)
          return;
        }
        if (budgetState.currentSector && budgetState.currentSector === name) {
          setData(formatted)
          setRawData(res.data)
          setProgressRates(formatted.progressRates)
        };
        dispatch(getBudgetSuccess({
          [name || 'all']: formatted,
        }))
        return formatted;
      }
    }).catch(e => {
      dispatch(getBudgetFailure(e))
      console.error(e)
    });
  }



  return {
    data,
    rawData,
    progressRates,
    getBudgetData,
    getFundFromYear,
  }
}