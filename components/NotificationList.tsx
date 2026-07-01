export interface NotificationItem {
  id: string;
  message: string;
  time: string;
}

export default function NotificationList({ items }: { items: NotificationItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`flex items-center justify-between px-5 py-4 ${
            i !== items.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
            <p className="text-sm text-gray-700">{item.message}</p>
          </div>
          <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
        </div>
      ))}
    </div>
  );
}