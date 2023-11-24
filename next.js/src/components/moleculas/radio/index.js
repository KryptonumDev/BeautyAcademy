import styles from './styles.module.scss';
import Error from '../Error';

const Radio = ({ register, label, errors, ...props }) => {
  return (
    <label className={styles.wrapper} aria-invalid={Boolean(errors[register.name])}>
      <input
        {...register}
        name={register.name}
        {...props}
        type='radio'
      />
      <span className={styles.checkmark} />
      <p className={styles.label}>{label}</p>
      <Error error={errors[register.name]} />
    </label>
  );
};

export default Radio;