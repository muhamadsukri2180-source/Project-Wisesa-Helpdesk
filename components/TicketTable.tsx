export interface TicketRow {
  id: string;
  title: string;
  category: string;
  status: "Waiting" | "Working" | "Resolved";
  timer: string;
}

const statusStyles: Record<TicketRow["status"], string> = {
  Waiting: "bg-yellow-200 text-gray-800",
  Working: "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

export default function TicketTable({ rows }: { rows: TicketRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500">
            <th className="px-5 py-3 font-medium">Ticket</th>
            <th className="px-5 py-3 font-medium">Information</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 text-right font-medium">Timer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.id}-${i}`}
              className={i !== rows.length - 1 ? "border-b border-gray-100" : ""}
            >
              <td className="px-5 py-4 font-medium text-gray-900">{row.id}</td>
              <td className="px-5 py-4">
                <p className="text-gray-700">{row.title}</p>
                <p className="mt-0.5 text-xs font-semibold text-gray-500">
                  Category: {row.category}
                </p>
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-5 py-4 text-right text-gray-500">{row.timer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}