import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext"; // ✅ Corrected named import

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUsername: setLoggedUsername, setId } = useContext(UserContext);

  async function register(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/register", { username, password });
      setLoggedUsername(username);
      setId(response.data.id); // ✅ fixed access to id
      console.log("User registered:", response.data);
      setMessage("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setMessage("Registration failed.");
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default Register;
