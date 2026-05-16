import React, { useState } from "react";
import axios from "axios";

function App() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (mode === "register") {
        const res = await axios.post("/api/register", {
          name,
          email,
          password
        });
        setMessage(res.data.message);
        setMode("login");
      } else {
        const res = await axios.post("/api/login", {
          email,
          password
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  if (user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button
            style={styles.button}
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={submitHandler}>
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

        {mode === "register" && (
          <input
            style={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <p>{message}</p>

        <p>
          {mode === "login" ? "No account?" : "Already have account?"}{" "}
          <button
            type="button"
            style={styles.link}
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f4f8"
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  link: {
    border: "none",
    background: "none",
    color: "#2563eb",
    cursor: "pointer"
  }
};

export default App;
