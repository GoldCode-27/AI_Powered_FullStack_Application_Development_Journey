import { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";

export default function Login({ onAuthenticated }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const endpoint = isSignup ? "signup" : "login";
      const response = await axios.post(`/api/auth/${endpoint}`, form);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
      onAuthenticated(response.data.user);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to authenticate.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p>{isSignup ? "Sign up to start chatting." : "Log in to continue."}</p>
        {isSignup && (
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              required
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            minLength="6"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            required
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
        </button>
        <button
          type="button"
          className={styles.switchButton}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Need an account? Sign up"}
        </button>
      </form>
    </main>
  );
}
