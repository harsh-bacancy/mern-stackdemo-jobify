interface FormRowSelectProps {
  name: string;
  labelText?: string;
  list: any;
  defaultValue?: string;
  onChange?: (e: any) => void;
}
const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}: FormRowSelectProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue: string) => {
          return (
            <option value={itemValue} itemID={itemValue} key={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
