import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import styles from "./signup.module.scss";
import Cookie from "js-cookie";

interface SignupForm extends HTMLFormControlsCollection {
  cnfrmpass: string;
  email: string;
  name: string;
  password: string;
}

interface SignupFormEl extends HTMLFormElement {
  readonly elements: SignupForm;
}

type signupTemplate = {
  cnfrmpass: string;
  email: string;
  name: string;
  password: string;
  user_type: string;
};

export default function Signup() {
  const router = useRouter();

  const styling = {
    username: React.useRef<HTMLInputElement>(null),
    warning: React.useRef<HTMLInputElement>(null),
    heading: React.useRef<HTMLHeadingElement>(null),
    cnfrmPass: React.useRef<HTMLInputElement>(null),
    email: React.useRef<HTMLInputElement>(null),
    password: React.useRef<HTMLInputElement>(null),
  };

  const [signupdet, Setsignupdet] = React.useState<signupTemplate>({
    cnfrmpass: "",
    name: "",
    email: "",
    password: "",
    user_type: "customer",
  });

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "cnfrmpass": {
        Setsignupdet({
          ...signupdet,
          cnfrmpass: target.value,
        });
        break;
      }
      case "username": {
        Setsignupdet({
          ...signupdet,
          name: target.value,
        });
        break;
      }
      case "email": {
        Setsignupdet({
          ...signupdet,
          email: target.value,
        });
        break;
      }
      case "password": {
        Setsignupdet({
          ...signupdet,
          password: target.value,
        });
        break;
      }
      default: {
        Setsignupdet({
          ...signupdet,
        });
        break;
      }
    }
  };

  const checkPasswordValidity = (value: string) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }

    const isValidLength = /^.{5,128}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 5 or more Characters Long.";
    }

    return null;
  };

  /* eslint-disable */

  const HandleSubmit = React.useCallback(
    (e: React.FormEvent<SignupFormEl>) => {
      e.preventDefault();
      let status = 201;
      let passIsValid = checkPasswordValidity(signupdet.password);
      if (signupdet.name.length == 0) {
        styling.warning.current!.style.display = "block";
        styling.username.current!.style.border = "0.05rem solid red";
        styling.heading.current!.style.marginBottom = "0.5rem";
        styling.warning.current!.innerHTML = "Invalid Username";
      } else if (signupdet.email.length == 0) {
        styling.warning.current!.style.display = "block";
        styling.email.current!.style.border = "0.05rem solid red";
        styling.heading.current!.style.marginBottom = "0.5rem";
        styling.warning.current!.innerHTML = "Invalid Email Address";
      } else if (passIsValid && passIsValid.length > 0) {
        styling.warning.current!.style.display = "block";
        styling.password.current!.style.border = "0.05rem solid red";
        styling.heading.current!.style.marginBottom = "0.5rem";
        styling.warning.current!.innerHTML = passIsValid;
      } else if (signupdet.password !== signupdet.cnfrmpass) {
        styling.warning.current!.style.display = "block";
        styling.cnfrmPass.current!.style.border = "0.05rem solid red";
        styling.heading.current!.style.marginBottom = "0.5rem";
        styling.warning.current!.innerHTML = "Passwords do not match";
      } else {
        fetch(
          `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER}/api/user/register`,
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(signupdet),
          }
        )
          .then((response) => {
            status = response.status;
            return response.json();
          })
          .then((resMessage) => {
            if (status === 201) {
              Cookie.set("currentLoggedIn", JSON.stringify(resMessage[0]), {
                expires: 0.125,
              });
              styling.warning.current!.style.display = "none";
              styling.username.current!.style.border = "transparent";
              styling.cnfrmPass.current!.style.border = "transparent";
              styling.email.current!.style.border = "transparent";
              styling.password.current!.style.border = "transparent";
              styling.heading.current!.style.marginBottom = "1rem";
              router.push(`/home`);
            } else {
              styling.warning.current!.style.display = "block";
              styling.warning.current!.innerHTML =
                resMessage.message === "User already exists"
                  ? `${resMessage.message}`
                  : `Failed To Create Your Account! Try Again in a Few Minutes.`;
              styling.username.current!.style.border = "0.05rem solid red";
              styling.cnfrmPass.current!.style.border = "0.05rem solid red";
              styling.email.current!.style.border = "0.05rem solid red";
              styling.password.current!.style.border = "0.05rem solid red";
              styling.heading.current!.style.marginBottom = "0.5rem";
            }
          });
      }
    },
    [signupdet]
  );

  React.useEffect(() => {
    router.prefetch("/home");
  }, []);

  /* eslint-enable */

  return (
    <main className={styles.signupWrapper}>
      <Head>
        <link rel="icon" href="/z.png" type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="E-commerce Web App" />
        <meta name="keywords" content="Fashion, Commerce, Clothing" />
        <meta name="author" content="Deep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zevon</title>
      </Head>
      <section></section>
      <section>
        <form onSubmit={HandleSubmit}>
          <h2 ref={styling.heading}>Signup</h2>
          <span className={styles.warning} ref={styling.warning}>
            Username Already Exists
          </span>
          <span>
            <label htmlFor="username">
              Username:
              <span className={styles.user}>
                <span />
                <input
                  ref={styling.username}
                  value={signupdet.name}
                  onChange={HandleChange}
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Enter your Username"
                />
              </span>
            </label>
          </span>
          <span>
            <label htmlFor="email">
              Email:
              <span className={styles.signupemail}>
                <span />
                <input
                  ref={styling.email}
                  value={signupdet.email}
                  onChange={HandleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                />
              </span>
            </label>
          </span>
          <span>
            <label htmlFor="password">
              Password:
              <span className={styles.pass}>
                <span />
                <input
                  ref={styling.password}
                  value={signupdet.password}
                  onChange={HandleChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                />
              </span>
            </label>
          </span>
          <span>
            <label htmlFor="cnfrmpass">
              Confirm Password:
              <span className={styles.pass}>
                <span />
                <input
                  ref={styling.cnfrmPass}
                  value={signupdet.cnfrmpass}
                  onChange={HandleChange}
                  name="cnfrmpass"
                  id="cnfrmpass"
                  type="password"
                  placeholder="Enter your Password Again"
                />
              </span>
            </label>
          </span>
          <input
            type="submit"
            placeholder="Sign Up"
            value="Sign Up"
            name="submit"
            className={styles.signInSubmit}
          />
          <span className={styles.tologin}>
            Already have an account?
            <Link href="/login" className={styles.loginLinks}>
              {"Login Here"}
            </Link>
          </span>
        </form>
      </section>
    </main>
  );
}
