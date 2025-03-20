import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./registerForm.module.scss";
import { useState } from "react";
import { Done, Error, Eye, Closed } from "../assets";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const inputFields = [
  { name: "username", type: "text", label: "Имя пользователя" },
  { name: "email", type: "string", label: "Email" },
  { name: "password", type: "password", label: "Пароль" },
  {
    name: "confirmPassword",
    type: "password",
    label: "Повторите пароль",
  },
];

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      terms: false,
    },
  });

  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClick = (val: boolean) => {
    setCheckboxValue(!val);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert("Регистрация успешна!");
    console.log(data);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Тренажер формы ввода</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type={inputFields[0].type}
              id={inputFields[0].name}
              placeholder=' '
              {...register("username", {
                required: "Имя пользователя обязательно",
                minLength: {
                  value: 3,
                  message: `${inputFields[0].label} должно быть не менее 3 символов`,
                },
              })}
              className={`${styles.input} ${
                errors["username"] ? styles.inputError : ""
              }`}
            />
            <label
              htmlFor={inputFields[0].name}
              className={`${styles.floatingLabel} ${
                errors["username"] ? styles.floatingLabelError : ""
              }`}
            >
              {inputFields[0].label}
            </label>
            {watch("username")?.toString().length && !errors["username"] ? (
              <div className={styles.inputDone}>
                <img src={Done} className={styles.inputDone_icon} />
              </div>
            ) : undefined}
          </div>
          {errors["username"] && (
            <p className={styles.errorText}>
              <img src={Error} />
              {errors["username"]?.message}
            </p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type={inputFields[1].type}
              id={inputFields[1].name}
              placeholder=' '
              {...register("email", {
                required: "Почта обязательна",
                minLength: {
                  value: 3,
                  message: `${inputFields[0].label} должна быть не менее 3 символов`,
                },
              })}
              className={`${styles.input} ${
                errors["email"] ? styles.inputError : ""
              }`}
            />
            <label
              htmlFor={inputFields[0].name}
              className={`${styles.floatingLabel} ${
                errors["email"] ? styles.floatingLabelError : ""
              }`}
            >
              {inputFields[0].label}
            </label>
            {watch("email")?.toString().length && !errors["email"] ? (
              <div className={styles.inputDone}>
                <img src={Done} className={styles.inputDone_icon} />
              </div>
            ) : undefined}
          </div>
          {errors["email"] && (
            <p className={styles.errorText}>
              <img src={Error} />
              {errors["email"]?.message}
            </p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id={inputFields[2].name}
              placeholder=' '
              {...register("password", {
                required: `${inputFields[2].label} обязателен`,
                minLength: {
                  value: 3,
                  message: `${inputFields[2].label} должен быть не менее 3 символов`,
                },
              })}
              className={`${styles.input} ${
                errors["password"] ? styles.inputError : ""
              }`}
            />
            <label
              htmlFor={inputFields[2].name}
              className={`${styles.floatingLabel} ${
                errors["password"] ? styles.floatingLabelError : ""
              }`}
            >
              {inputFields[2].label}
            </label>
            <button
              type='button'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isPasswordVisible ? <img src={Eye} /> : <img src={Closed} />}
            </button>
          </div>
          {errors["password"] && (
            <p className={styles.errorText}>
              <img src={Error} />
              {errors["password"]?.message}
            </p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type={inputFields[3].type}
              id={inputFields[3].name}
              placeholder=' '
              {...register("confirmPassword", {
                required: `${inputFields[3].label} обязателен`,

                validate: (value: string | boolean) =>
                  value === watch("password") || "Пароли не совпадают",

                minLength: {
                  value: 3,
                  message: `${inputFields[3].label} должен быть не менее 3 символов`,
                },
              })}
              className={`${styles.input} ${
                errors["confirmPassword"] ? styles.inputError : ""
              }`}
            />
            <label
              htmlFor={inputFields[3].name}
              className={`${styles.floatingLabel} ${
                errors["confirmPassword"] ? styles.floatingLabelError : ""
              }`}
            >
              {inputFields[3].label}
            </label>
            {watch("confirmPassword")?.toString().length &&
            !errors["confirmPassword"] ? (
              <div className={styles.inputDone}>
                <img src={Done} className={styles.inputDone_icon} />
              </div>
            ) : undefined}
          </div>
          {errors["confirmPassword"] && (
            <p className={styles.errorText}>
              <img src={Error} />
              {errors["confirmPassword"]?.message}
            </p>
          )}
        </div>

        <div className='checkboxContainer'>
          <div className={styles.checkboxContainer}>
            <input
              type='checkbox'
              id='terms'
              {...register("terms", {
                required: "Необходимо согласие с условиями",
              })}
              className={styles.checkboxInput}
            />
            <label
              htmlFor='terms'
              className={styles.checkboxLabel}
              onClick={() => handleClick(checkboxValue)}
            >
              {checkboxValue ? (
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3.04497 4.73005C2.5 5.79961 2.5 7.19974 2.5 10V14C2.5 16.8003 2.5 18.2004 3.04497 19.27C3.52433 20.2108 4.28924 20.9757 5.23005 21.455C6.29961 22 7.69974 22 10.5 22H14.5C17.3003 22 18.7004 22 19.77 21.455C20.7108 20.9757 21.4757 20.2108 21.955 19.27C22.5 18.2004 22.5 16.8003 22.5 14V10C22.5 7.19974 22.5 5.79961 21.955 4.73005C21.4757 3.78924 20.7108 3.02433 19.77 2.54497C18.7004 2 17.3003 2 14.5 2H10.5C7.69974 2 6.29961 2 5.23005 2.54497C4.28924 3.02433 3.52433 3.78924 3.04497 4.73005ZM16.2071 10.5253C16.5976 10.1348 16.5976 9.5016 16.2071 9.11107C15.8166 8.72055 15.1834 8.72055 14.7929 9.11107L11.1364 12.7676L10.2071 11.8383C9.81658 11.4478 9.18342 11.4478 8.79289 11.8383C8.40237 12.2289 8.40237 12.862 8.79289 13.2526L10.4293 14.8889C10.6168 15.0765 10.8711 15.1818 11.1364 15.1818C11.4016 15.1818 11.6559 15.0765 11.8435 14.8889L16.2071 10.5253Z'
                    fill='#0032E5'
                  />
                </svg>
              ) : (
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M14.5 4H10.5C9.06687 4 8.1123 4.00156 7.37887 4.06148C6.6688 4.11949 6.34387 4.2221 6.13803 4.32698C5.57354 4.6146 5.1146 5.07354 4.82698 5.63803C4.7221 5.84387 4.61949 6.1688 4.56148 6.87887C4.50156 7.6123 4.5 8.56687 4.5 10V14C4.5 15.4331 4.50156 16.3877 4.56148 17.1211C4.61949 17.8312 4.7221 18.1561 4.82698 18.362C5.1146 18.9265 5.57354 19.3854 6.13803 19.673C6.34387 19.7779 6.6688 19.8805 7.37887 19.9385C8.1123 19.9984 9.06687 20 10.5 20H14.5C15.9331 20 16.8877 19.9984 17.6211 19.9385C18.3312 19.8805 18.6561 19.7779 18.862 19.673C19.4265 19.3854 19.8854 18.9265 20.173 18.362C20.2779 18.1561 20.3805 17.8312 20.4385 17.1211C20.4984 16.3877 20.5 15.4331 20.5 14V10C20.5 8.56687 20.4984 7.6123 20.4385 6.87887C20.3805 6.1688 20.2779 5.84387 20.173 5.63803C19.8854 5.07354 19.4265 4.6146 18.862 4.32698C18.6561 4.2221 18.3312 4.11949 17.6211 4.06148C16.8877 4.00156 15.9331 4 14.5 4ZM3.04497 4.73005C2.5 5.79961 2.5 7.19974 2.5 10V14C2.5 16.8003 2.5 18.2004 3.04497 19.27C3.52433 20.2108 4.28924 20.9757 5.23005 21.455C6.29961 22 7.69974 22 10.5 22H14.5C17.3003 22 18.7004 22 19.77 21.455C20.7108 20.9757 21.4757 20.2108 21.955 19.27C22.5 18.2004 22.5 16.8003 22.5 14V10C22.5 7.19974 22.5 5.79961 21.955 4.73005C21.4757 3.78924 20.7108 3.02433 19.77 2.54497C18.7004 2 17.3003 2 14.5 2H10.5C7.69974 2 6.29961 2 5.23005 2.54497C4.28924 3.02433 3.52433 3.78924 3.04497 4.73005Z'
                    fill='#5A5A5A'
                  />
                </svg>
              )}
              Я согласен с{" "}
              <span className={styles.link}>Условиями использования</span>
            </label>
          </div>{" "}
          {errors.terms && (
            <p className={styles.errorText}>
              <img src={Error} />
              {errors.terms.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className={styles.button}
          disabled={!watch("terms")}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
