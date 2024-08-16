// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  function update(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newPerson = { ...form };

    await fetch("https://localhost:3001/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", password: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => update({ password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
