import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const defaultProps = [
  {
    id: 0, label: 'Absorb', quarters: [
      {
        target: 10,
        accomplishment: 8,
      },
      {
        target: 10,
        accomplishment: 12,
      },
      {
        target: 10,
        accomplishment: 3,
      },
      {
        target: 10,
        accomplishment: 2,
      },
    ], goal: {
      target: 40,
      accomplishment: 25,
      progress: 62.5
    }
  },
];

const getBgColor = (progress = 0) => {
  let bgColor;
  if (progress <= 40) {
    bgColor = 'bg-red-400';
  } else if (progress <= 75) {
    bgColor = 'bg-yellow-400';
  } else if (progress >= 100) {
    bgColor = 'bg-teal-500'
  } else if (progress > 0) {
    bgColor = 'bg-blue-500';
  }

  return bgColor;
}

const ProgressBar = ({ idx, label, quarters, goal, onEdit, onDelete, onQuarterChange }) => {

  return (
    <div className="mb-4 flex items-center justify-between" >
      <div className='w-full flex flex-col gap-0'>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex flex-col w-full lg:flex-row justify-between mt-2">
          {quarters.map((progress, index) => {
            progress = Math.round(parseFloat(quarters[index].accomplishment / quarters[index].target * 100), 2) || 0;
            let bgColor = getBgColor(progress)

            return (
              <div key={`quarter-${index}`} className="w-full lg:w-1/4 text-left mb-1 text-xs">
                <div className="text-xs font-semibold text-gray-500">
                  Quarter {index + 1}
                </div>
                <div className='relative'>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={progress || 0}
                    // onChange={(e) => onQuarterChange(idx, index, e.target.value)}
                    className="w-full absolute top-0 left-0 opacity-0 cursor-pointer"
                  />
                  <div className="slider w-full bg-gray-200 mt-1">
                    <div
                      className={`h-full text-center font-semibold text-white full flex items-center justify-center ${bgColor}`}
                      style={{ width: `${progress > 100 ? '100' : progress}%` }}
                    >
                      {
                        progress >= 100 && <span className="h-full flex items-center justify-center"><FaCheckCircle /></span>
                      }
                      {`${quarters[index].accomplishment}/${quarters[index].target}`}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        <div className='relative w-full text-xs'>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={goal.progress || 0}
            disabled
            className="w-full absolute top-0 left-0 opacity-0 cursor-pointer"
          />
          <div className="relative slider w-full bg-gray-200">
            <div
              className={`relative h-full font-semibold full flex items-center ${getBgColor(goal.progress)}`}
              style={{ width: `${goal.progress > 100 ? '100' : goal.progress}%` }}
            >
              {
                goal.progress >= 100 && <span className="h-full flex items-center justify-center"><FaCheckCircle /></span>
              }
              <span>
                {`${goal.accomplishment}/${goal.target}`}
              </span>

            </div>

            {/* Scale indicator for each quarter based on their target values only */}
            {
              quarters.map((quarter, index) => {
                let quarterPos = quarter.target / goal.target * 100 + quarters.slice(0, index).reduce((acc, curr) => acc + (curr.target / goal.target) * 100, 0);


                return (
                  <span
                    key={`quarter-divider-${index}`}
                    className='border-r-2 border-gray-500/50 border-base-content'
                    style={{
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      width: `${quarterPos}%`
                    }}
                  >
                    &nbsp;
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 mr-2">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
  const labelRef = useRef(null);
  const goalRef = useRef(null);
  const quarterRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSave = () => {
    const label = labelRef.current.value;
    const goal = Number(goalRef.current.value);
    const quarters = quarterRefs.map(ref => Number(ref.current.value));
    onSave({ label, quarters, goal });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Objective' : 'Add Objective'}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            ref={labelRef}
            defaultValue={initialData ? initialData.label : ''}
            placeholder='Enter current objective.'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          {quarterRefs.map((ref, index) => (
            <div key={index} className="mb-4 w-1/4">
              <label className="block text-sm font-medium text-gray-700">Q{index + 1}</label>
              <input
                type="number"
                ref={ref}
                defaultValue={initialData ? initialData.quarters[index] : 0}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Goal</label>
          <input
            type="number"
            ref={goalRef}
            defaultValue={initialData ? initialData.goal : 100}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


const QualityObjectives = ({ objectives = defaultProps }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleQuarterChange = (objectiveIdx, quarterIdx, newValue) => {
    const updatedData = data.map((obj, idx) => {
      if (idx === objectiveIdx) {
        const updatedQuarters = obj.quarters.map((q, qIdx) => (qIdx === quarterIdx ? Number(newValue) : q));
        return { ...obj, quarters: updatedQuarters };
      }
      return obj;
    });
    setData(updatedData);
  };


  const handleAddObjective = (newObjective) => {
    if (editData) {
      const updatedData = data.map((obj) =>
        obj.label === editData.label ? newObjective : obj
      );
      setData(updatedData);
      setEditData(null);
    } else {
      setData([...data, newObjective]);
    }
  };

  const handleEditObjective = (objective) => {
    setEditData(objective);
    setIsModalOpen(true);
  };

  const handleDeleteObjective = (id) => {
    const updatedData = data.filter((obj) => obj.id !== id);
    setData(updatedData);
  };

  useEffect(() => {
    setData(objectives);
  }, [objectives]);

  return (
    <div className="w-full p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Quality Objectives</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FaPlus className="mr-2" />
            Add Objective
          </button>
        </div>
        <ol className="list-decimal">
          {data.map((d, index) => (
            <li key={d.id} className="mb-4">
              <ProgressBar
                key={`objective-${index}`}
                idx={index}
                label={d.label}
                quarters={d.quarters}
                goal={d.goal}
                onEdit={() => handleEditObjective(d)}
                onDelete={() => handleDeleteObjective(d.id)}
                onQuarterChange={handleQuarterChange}
              />
            </li>
          ))}
        </ol>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleAddObjective}
        initialData={editData}
      />
    </div>
  );
};

export default QualityObjectives;