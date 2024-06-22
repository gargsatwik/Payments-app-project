export default function Inputbox({ title, placeholder }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        <label>{title}</label>
      </div>
      <input
        className="w-full px-2 py-1 border"
        placeholder={placeholder}
      ></input>
    </div>
  );
}
