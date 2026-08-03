import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandPanel from "../../components/authentication/BrandPanel";
import { signup } from "../../api/authApi";
import './auth.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts Malawian mobile formats: 0991234567 or +265991234567
const PHONE_RE = /^(\+265|0)(8|9)\d{8}$/;

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};

    if (!form.fullName.trim()) {
      next.fullName = "Enter your full name.";
    }

    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      next.phone = "Enter your phone number.";
    } else if (!PHONE_RE.test(form.phone.trim().replace(/\s+/g, ""))) {
      next.phone = "Use a Malawian number, e.g. 0991 234 567.";
    }

    if (!form.password) {
      next.password = "Choose a password.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords don't match.";
    }

    if (!form.agreedToTerms) {
      next.agreedToTerms = "You need to accept the terms to continue.";
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
      const data = await signup({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim().replace(/\s+/g, ""),
        password: form.password,
      });

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
        heading="Bring your neighborhood shops online."
        body="Create an account to browse shops around Lilongwe, pay for
        your order, and track it until it reaches your door."
      />

      <div className="auth-form-panel">
        <form className="auth-form-card" onSubmit={handleSubmit} noValidate>
          <p className="auth-form-card__eyebrow">Get started</p>
          <h2>Create your account</h2>
          <p className="auth-form-card__hint">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          {serverError && (
            <div className="form-banner form-banner--error" role="alert">
              {serverError}
            </div>
          )}

          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Chikondi Banda"
              value={form.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              autoComplete="name"
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0991 234 567"
              value={form.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <label className="checkbox-field" htmlFor="agreedToTerms">
            <input
              id="agreedToTerms"
              name="agreedToTerms"
              type="checkbox"
              checked={form.agreedToTerms}
              onChange={handleChange}
            />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="field-error" style={{ marginTop: "-14px", marginBottom: "16px" }}>
              {errors.agreedToTerms}
            </p>
          )}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
