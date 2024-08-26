import { useState } from "react";

const Task = () => {
  const [checkedA, setCheckedA] = useState([false, false, false, false]);
  const [checkedB, setCheckedB] = useState([false, false, false, false]);

  const allChecked = (group) => group.every((item) => item);

  const handleGroupChange = (index, group, setGroup) => {
    const newGroup = [...group];
    newGroup[index] = !newGroup[index];
    setGroup(newGroup);
  };

  const handleSuperToggle = (group, setGroup) => {
    const allTrue = allChecked(group);
    setGroup(group.map(() => !allTrue));
  };

  const checkedSuperA = allChecked(checkedA);
  const checkedSuperB = allChecked(checkedB);
  const checkedSuper = checkedSuperA && checkedSuperB;

  return (
    <div className="flex flex-col gap-10 mt-10 text-white">
      <div>
        <input
          type="radio"
          value="one"
          onClick={() => {
            handleSuperToggle([...checkedA, ...checkedB], (group) => {
              setCheckedA(group.slice(0, 4));
              setCheckedB(group.slice(4, 8));
            });
          }}
          checked={checkedSuper}
        />
        Super
      </div>

      <div>
        <input
          type="radio"
          value="one"
          onClick={() => handleSuperToggle(checkedA, setCheckedA)}
          checked={checkedSuperA}
        />
        Super A
      </div>
      <div className="flex">
        {checkedA.map((checked, i) => (
          <input
            key={`A${i + 1}`}
            type="radio"
            value={`A${i + 1}`}
            onClick={() => handleGroupChange(i, checkedA, setCheckedA)}
            checked={checked}
          />
        ))}
      </div>

      <div>
        <input
          type="radio"
          value="one"
          onClick={() => handleSuperToggle(checkedB, setCheckedB)}
          checked={checkedSuperB}
        />
        Super B
      </div>
      <div className="flex">
        {checkedB.map((checked, i) => (
          <input
            key={`B${i + 1}`}
            type="radio"
            value={`B${i + 1}`}
            onClick={() => handleGroupChange(i, checkedB, setCheckedB)}
            checked={checked}
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
