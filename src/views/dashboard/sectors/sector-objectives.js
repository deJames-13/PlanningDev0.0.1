import { cilCheck, cilFlagAlt } from '@coreui/icons';
import React from 'react';
import ObjectivesOverview from '../objectives/index';

import { useDispatch, useSelector } from 'react-redux';
import { useGetObjMutation } from 'src/api/objective';
import {
  getObjectiveFailure,
  getObjectiveStart,
  getObjectiveSuccess,
  setSector,
} from 'src/slices/objective';

const transformData = (data) => {
  let totalAccomplished = data.reduce((acc, curr) => acc + curr.total.accomplishment, 0);
  let totalTarget = data.reduce((acc, curr) => acc + curr.total.target, 0);
  return {
    data,
    progressGroup: [
      { title: '', icon: cilCheck, value: parseFloat((totalAccomplished / totalTarget * 100).toFixed(2)),progress:true },
      { title: 'Total Acommplished', icon: cilFlagAlt, value: totalAccomplished,  },
      { title: 'Total Target', icon: cilFlagAlt, value: totalTarget, },
    ],
    last_updated: (new Date()).toLocaleString()
  }
}


export default function SectorObjectives({name}) {
  const dispatch = useDispatch();
  const objState = useSelector(s => s.objective);

  const [obj, setObj] = React.useState([]);
  const [progressGroup, setProgressGroup] = React.useState([]);
  const [getObj, {isLoading}] = useGetObjMutation();

  React.useEffect(() => {
    if (objState.sectorObjectives[name]){
      setObj(objState.sectorObjectives[name].data);
      setProgressGroup(objState.sectorObjectives[name].progressGroup);
    }

    dispatch(setSector(name));
    dispatch(getObjectiveStart());
    getObj(name).then((res) => {
      if (objState.currentSector && objState.currentSector !== name) return;
      if (res?.data){
        let {data} = res.data
        let formatted = transformData(data)
        setObj(formatted.data);
        setProgressGroup(formatted.progressGroup);
        dispatch(getObjectiveSuccess(
          {
            [name]: {
              ...formatted
            },
          }
        ));

      }
    }).catch(e=>{
      dispatch(getObjectiveFailure());
    });
  }, [name]);


  return (
    <div>
      <ObjectivesOverview loading={isLoading}
      data={{
        objectives: obj,
        progressGroup: progressGroup,
        last_updated: objState.sectorObjectives[name]?.last_updated || (new Date()).toLocaleString()
      }}
       />
    </div>
  )
}
