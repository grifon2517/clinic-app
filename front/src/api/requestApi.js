export async function createRequest(payload) {
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка отправки заявки");
  }

  return data;
}

export async function getRequests() {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки заявок");
  }

  return data;
}
