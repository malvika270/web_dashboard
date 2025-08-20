"use client";
import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";


export default function AdminDashboard() {
  console.log("Admin Dashboard Loaded");
  const [time, setTime] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addUIDForm, setAddUIDForm] = useState(false);

  const toggleUIDForm = () => setAddUIDForm((prev) => !prev);

  const add_uid = async () => {
    if (!uid || !name || !time) {
      alert("Please fill in all fields");
      return;
    }
    const db_reference = ref(database, "logs");
    await push(db_reference, { uid, name, time });
    alert("UID added successfully");
    setUID("");
    setName("");
    setTime("");
  };

  const add_role = async () => {
    try {
      const res = await fetch("/api/addRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (res.ok) {
        alert("Role added successfully");
        setEmail("");
        setPassword("");
        setRole("");
      } else {
        alert("Error adding role"+data.error);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div>
      <button
        onClick={toggleUIDForm}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Toggle UID & Role Forms
      </button>

      {addUIDForm && (
        <div>
          {/* UID form */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Add UID</h2>
            <input
              type="text"
              placeholder="UID"
              value={uid}
              onChange={(e) => setUID(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button onClick={add_uid} className="bg-blue-500 text-white p-2 rounded">
              Add UID
            </button>
          </div>

          {/* Role form */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Add Role</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button onClick={add_role} className="bg-blue-500 text-white p-2 rounded">
              Add Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
