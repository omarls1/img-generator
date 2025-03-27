/*eslint-disable*/

import styles from "./FormGroup.module.css";
function FormGroup({
  type,
  id,
  placeholder,
  name = id,
  value,
  onChange,
  label = name,
  required = true,
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label} :
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        required={required}
      />
    </div>
  );
}

export default FormGroup;
