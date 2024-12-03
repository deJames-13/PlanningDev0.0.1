import { cilCheck, cilFlagAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react';
import { useGetObjMutation } from 'src/api/objective';
import ObjectivesOverview from '../objectives/index';

export default function SectorObjectives({name}) {
  const [obj, setObj] = React.useState([]);
  const [progressGroup, setProgressGroup] = React.useState([]);
  const [getObj, {isLoading}] = useGetObjMutation();

  React.useEffect(() => {
    getObj(name).then((res) => {
      let {data} = res.data
      // accumulated progress base on data[n].total.accomplishement and data[n].total.target
      let totalAccomplished = data.reduce((acc, curr) => acc + curr.total.accomplishment, 0);
      let totalTarget = data.reduce((acc, curr) => acc + curr.total.target, 0);
      setObj(data);
      setProgressGroup([
        { title: '', icon: cilCheck, value: parseFloat((totalAccomplished / totalTarget * 100).toFixed(2)),progress:true },
        { title: 'Total Acommplished', icon: cilFlagAlt, value: totalAccomplished,  },
        { title: 'Total Target', icon: cilFlagAlt, value: totalTarget, },
      ]);

      
    });
  }, [name]);


  return (
    <div>
      <ObjectivesOverview loading={isLoading}
      data={{
        objectives: obj,
        progressGroup: progressGroup
      }}
       />
    </div>
  )
}
