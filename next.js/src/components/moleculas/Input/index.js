import styles from './styles.module.scss';
import Error from '../Error';

const Input = ({ register, label, errors, textarea=false, ...props }) => {
  return (
    <label className={styles.wrapper} aria-invalid={Boolean(errors[register.name])}>
      <p className={styles.label}>{label}</p>
      {textarea ? (
        <textarea
          {...register}
          name={register.name}
          {...props}
        />
      ) : (
        <input
          {...register}
          name={register.name}
          {...props}
        />
      )}
      <Error error={errors[register.name]} />
    </label>
  );
};

export default Input;