export const normalizePhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";

  let normalized = digits;

  if (normalized[0] === "8") {
    normalized = `7${normalized.slice(1)}`;
  }

  const d = normalized;

  if (d.length <= 1) return `+${d}`;
  if (d.length <= 4) return `+${d[0]} (${d.slice(1)}`;
  if (d.length <= 7) return `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4)}`;
  if (d.length <= 9)
    return `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;

  return `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
};

export const validateRequestForm = ({ fullName, phone, problem }) => {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = "Введите ФИО";
  } else if (fullName.trim().length < 5) {
    errors.fullName = "ФИО должно быть не короче 5 символов";
  }

  const digits = phone.replace(/\D/g, "");
  if (!digits) {
    errors.phone = "Введите номер телефона";
  } else if (digits.length !== 11) {
    errors.phone = "Введите корректный номер телефона";
  }

  if (problem.trim().length > 1000) {
    errors.problem = "Описание слишком длинное";
  }

  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Введите email";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Введите корректный email";
  }

  if (!password.trim()) {
    errors.password = "Введите пароль";
  } else if (password.length < 6) {
    errors.password = "Пароль должен быть не короче 6 символов";
  }

  return errors;
};
