import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandPanel from "../../components/authentication/BrandPanel";
import { login } from "../../api/authApi";
import './auth.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.identifier.trim()) {
      next.identifier = "Enter your email or phone number.";
    }
    if (!form.password) {
      next.password = "Enter your password.";
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await login({
        identifier: form.identifier.trim(),
        password: form.password,
      });

      // Store the session token for subsequent authenticated requests.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // send them to the shop listing / home feed
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-screen">
      <BrandPanel
        heading="Every shop in Lilongwe, one doorstep at a time."
        body="Order from the market stalls and shops you already trust, pay
        securely, and have it delivered straight to you."
      />

      <div className="auth-form-panel">
        <form className="auth-form-card" onSubmit={handleSubmit} noValidate>
          <p className="auth-form-card__eyebrow">Welcome back</p>
          <h2>Log in to your account</h2>
          <p className="auth-form-card__hint">
            New here? <Link to="/signup">Create an account</Link>
          </p>

          {serverError && (
            <div className="form-banner form-banner--error" role="alert">
              {serverError}
            </div>
          )}

          <div className="field">
            <label htmlFor="identifier">Email or phone number</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="you@example.com or 0991 234 567"
              value={form.identifier}
              onChange={handleChange}
              aria-invalid={Boolean(errors.identifier)}
              autoComplete="username"
            />
            {errors.identifier && (
              <p className="field-error">{errors.identifier}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <div className="field-row">
            <span />
            <Link to="/forgot-password" className="link-muted">
              Forgot password?
            </Link>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
