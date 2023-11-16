import styles from './styles.module.scss';

const Chip = ({
  register,
  errors,
  children,
  ...props
}) => {
  return (
    <label
      className={styles.label}
      aria-invalid={Boolean(errors[register.name])}
    >
      <input
        type="radio"
        {...register}
        {...props}
      />
      {children}
    </label>
  );
};

export default Chip;