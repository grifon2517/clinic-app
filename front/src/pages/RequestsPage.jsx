import { useEffect, useState } from "react";
import RequestsTable from "../components/RequestsTable";
import { getRequests } from "../api/requestApi";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequests()
      .then((data) => setRequests(data.requests))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="card">
      <h1 className="title">Таблица заявок</h1>

      {isLoading && <div className="info">Загрузка...</div>}
      {error && <div className="error-box">{error}</div>}
      {!isLoading && !error && <RequestsTable requests={requests} />}
    </section>
  );
}
