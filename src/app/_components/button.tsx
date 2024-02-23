export default function Button({
  value,
  onClick,
  type = "submit",
}: {
  value: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mb-2 mr-2 w-full rounded-lg bg-gray-800 px-3 py-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
    >
      {value}
    </button>
  );
}
