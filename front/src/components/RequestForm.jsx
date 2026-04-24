import { useState } from "react";
import { createRequest } from "../api/requestApi";
import { normalizePhone, validateRequestForm } from "../utils/validators";

const initialState = {
  fullName: "",
  phone: "",
  problem: "",
};

export default function RequestForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setServerError("");

    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? normalizePhone(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateRequestForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createRequest(form);
      setForm(initialState);
      setIsSuccess(true);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="card form-card">
        <h1 className="title">Заявка отправлена</h1>
        <p className="subtitle">
          Оператор клиники свяжется с вами в ближайшее время, чтобы подобрать
          врача и согласовать дату приёма.
        </p>

        <div className="success-block">
          <div className="success">
            Спасибо, ваша заявка успешно отправлена.
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => setIsSuccess(false)}
          >
            Отправить ещё одну заявку
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card form-card">
      <h1 className="title">Оставить заявку</h1>
      <p className="subtitle">
        Заполните форму, и оператор клиники свяжется с вами для подбора врача и
        согласования времени приёма.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="fullName">ФИО *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Иванов Иван Иванович"
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Номер телефона *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="problem">Опишите вашу проблему</label>
          <textarea
            id="problem"
            name="problem"
            rows="5"
            value={form.problem}
            onChange={handleChange}
            placeholder="Кратко опишите жалобы или причину обращения"
          />
          {errors.problem && <span className="error">{errors.problem}</span>}
        </div>

        {serverError && <div className="error-box">{serverError}</div>}

        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>
    </section>
  );
}
