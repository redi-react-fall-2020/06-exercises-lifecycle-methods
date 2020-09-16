import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import team from "./team";
import {
  sortMembers,
  getStudents,
  getTeachers,
  getMemberAnimalsWithUrls,
  getAnimals,
  filterByAnimal,
} from "./student.js";

function App() {
  const [showRole, setShowRole] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showAnimal, setShowAnimal] = useState("all");
  const [members, setMembers] = useState(team);

  useEffect(() => {
    let filteredMembers = [];
    if (showRole === "teachers") {
      filteredMembers = getTeachers(team);
    } else if (showRole === "students") {
      filteredMembers = getStudents(team);
    } else {
      filteredMembers = team;
    }
    if (showAnimal !== "all") {
      filteredMembers = filterByAnimal(filteredMembers, showAnimal);
    }
    const sortedAndFilteredMembers = sortMembers(
      filteredMembers,
      sortBy,
      sortDirection
    );

    setMembers(sortedAndFilteredMembers);
  }, [showAnimal, showRole, sortBy, sortDirection]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Redi React Fall 2020 Team</h1>
      </header>
      <main>
        <div className="filters-area">
          <label>
            <span>Sort by:</span>
            <select
              id="select-sortby"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
            </select>
          </label>
          <label>
            <span>Sort Direction:</span>
            <select
              id="select-role"
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value)}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </label>
          <label>
            <span>Show Role:</span>
            <select
              id="select-role"
              value={showRole}
              onChange={(event) => setShowRole(event.target.value)}
            >
              <option value="all">All Members</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
            </select>
          </label>
          <label>
            <span>Filter by animals:</span>
            <select
              id="select-animal"
              value={showAnimal}
              onChange={(event) => setShowAnimal(event.target.value)}
            >
              <option value="all">All Animals</option>
              {getAnimals(team).map((animal) => {
                return (
                  <option
                    value={animal}
                    key={`${animal}-option`}
                  >{`${animal.slice(0, 1).toUpperCase()}${animal.slice(
                    1
                  )}`}</option>
                );
              })}
            </select>
          </label>
        </div>
        <table className="members-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Animals</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr className="member-row" key={member.name}>
                <td className="avatar-cell">
                  <img src={member.image} />
                </td>
                <td className="name-cell">{member.name}</td>
                <td className="role-cell">{member.role}</td>
                <td className="animals-cell">
                  {getMemberAnimalsWithUrls(member).map((animal) => (
                    <div>
                      <img
                        src={animal.url}
                        alt={animal.name}
                        title={animal.name}
                        key={`${animal.name}-${member.name}`}
                      />
                      <span>{animal.name}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
