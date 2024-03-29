export default function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full`}
    >
      <span className="text-xs text-gray-600 ">{name[0]}</span>
    </div>
  );
}
