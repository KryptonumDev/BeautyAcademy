import Error from '../Error';
import styles from './styles.module.scss';

const Checkbox = ({ register, label, errors, ...props }) => {
  return (
    <label className={styles.label} aria-invalid={Boolean(errors[register.name])}>
      <Error error={errors[register.name]} />
      <div className={styles.icon}>
        <input
          {...register}
          name={register.name}
          type="checkbox"
          {...props}
        />
        <Check />
      </div>
      <p className="label">{label}</p>
    </label>
  );
};

export default Checkbox;

const Check = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='39' height='38' viewBox='0 0 39 38' fill='none'>
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M28.277 14.425l-8.957 8.957a3.167 3.167 0 01-4.478 0l-2.799-2.799'
    ></path>
  </svg>
)