import React from "react";
import api from "../api";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const renderPhrase = (numberOfUsers) => {
    if (numberOfUsers === 1) {
      return "person";
    } else {
      return "people";
    }
  };
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  return (
    <>
      <h4>
        <span
          className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(
                users.length
              )} ready to hang out with you today`
            : "nobody will hang out with you today"}
        </span>
      </h4>
      {users.length > 0 && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Qualities</th>
              <th scope="col">Profession</th>
              <th scope="col">Completed meetings</th>
              <th scope="col">Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      className={"badge m-1 bg-" + quality.color}
                      key={quality._id}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className={"btn btn-danger"}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
