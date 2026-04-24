import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginOperator } from "../api/authApi";
import { validateLoginForm } from "../utils/validators";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await loginOperator(form);
      localStorage.setItem("token", data.token);
      navigate("/requests");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card auth-card">
      <h1 className="title">Вход для оператора</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="operator@clinic.ru"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Введите пароль"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {serverError && <div className="error-box">{serverError}</div>}

        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </button>
      </form>
    </section>
  );
}
