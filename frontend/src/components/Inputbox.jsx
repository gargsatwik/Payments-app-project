export default function Inputbox({ title, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        <label>{title}</label>
      </div>
      <input
        onChange={onChange}
        className="w-full px-2 py-1 border"
        placeholder={placeholder}
      ></input>
    </div>
  );
}
