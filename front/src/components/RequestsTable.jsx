export default function RequestsTable({ requests }) {
  if (requests.length === 0) {
    return <div className="empty">Заявок пока нет.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Проблема</th>
            <th>Дата и время отправки</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.fullName}</td>
              <td>{request.phone}</td>
              <td>{request.problem || "—"}</td>
              <td>{new Date(request.createdAt).toLocaleString("ru-RU")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
