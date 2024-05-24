import React, { useState } from "react";

const projectStatus = [
  { label: "All", value: "All" },
  { label: "Completed", value: "Completed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Pending", value: "Pending" },
];

const ProjectFilter = ({ handleStatusFilter, searchEvent }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(projectStatus.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    // Create an array of selected status values
    const selectedStatus = updatedCheckedState
      .map((isChecked, index) =>
        isChecked ? projectStatus[index].value : null
      )
      .filter(Boolean);

    handleStatusFilter(selectedStatus);
  };

  return (
    <div className="filter-page">
      <div className="search-box">
        <div className="search">
          <h3>Search projects</h3>
          <div className="job-search">
            <input
              type="text"
              className="search-term"
              placeholder="Search Here"
              onChange={searchEvent}
            />
          </div>
        </div>
        <div className="filter">
          <div className="job-category">
            <h4>Status</h4>
            <ul className="checkbox">
              {projectStatus.map((filter, index) => (
                <li key={index}>
                  <input
                    name={filter.value}
                    type="checkbox"
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  {filter.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
