import React from "react";
import Select from "react-select";

const UserFilter = ({ filter, setFilter }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  const options = [
    { value: "", label: "Select Company" },
    { value: "Global Technologies", label: "Global Technologies" },
    { value: "Delta Infotech", label: "Delta Infotech" },
    { value: "Dreamguy's Technologies", label: "Dreamguy's Technologies" },
  ];

  const optionsTwo = [
    { value: "", label: "Select Role" },
    { value: "Client", label: "Client" },
    { value: "Admin", label: "Admin" },
    { value: "Employee", label: "Employee" },
    { value: "BD", label: "BD" },
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Division Lead", label: "Division Lead" },
  ];

  return (
    <div className="row filter-row ">
      <div className="col-sm-6 col-md-3">
        <div className="input-block mb-3 ">
          {/* <div
          className={`input-block mb-3 form-focus ${itemFocus ? "focused" : ""}`}
        > */}
          <input
            type="text"
            className="form-control floating"
            value={filter.name}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter Name"
            // <label className="focus-label">Name</label>
          />
        </div>
      </div>

      <div className="col-sm-6 col-md-3">
        <div className="input-block form-focus select-focus">
          <Select
            placeholder="Select Company"
            value={options.find((opt) => opt.value === filter.company)}
            onChange={(selected) =>
              setFilter((prev) => ({ ...prev, company: selected?.value || "" }))
            }
            options={options}
            className="select floating"
            styles={customStyles}
          />
          <label className="focus-label">Company</label>
        </div>
      </div>

      <div className="col-sm-6 col-md-3">
        <div className="input-block form-focus select-focus">
          <Select
            placeholder="Select Role"
            value={optionsTwo.find((opt) => opt.value === filter.role)}
            onChange={(selected) =>
              setFilter((prev) => ({ ...prev, role: selected?.value || "" }))
            }
            options={optionsTwo}
            className="select floating"
            styles={customStyles}
          />
          <label className="focus-label">Role</label>
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
