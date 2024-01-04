interface FormRowProps {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: any) => void;
}

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  required = false,
  onChange,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
