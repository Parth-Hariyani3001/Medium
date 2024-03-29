type InputTypes = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export default function InputBox({
  label,
  placeholder,
  onChange,
  value,
  type,
}: InputTypes) {
  return (
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm text-black font-extrabold"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
