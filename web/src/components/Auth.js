import React, { useState } from "react";
import FormStatus from "./FormStatus";
import FormField from "./FormField";
import SectionButton from "./SectionButton";
import { Link } from "./../util/router.js";
import { createAccount } from "../util/http.js";
import "./Auth.scss";

function Auth(props) {
  // State for all inputs
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newAccount, setNewAccount] = useState(null);

  // Whether to show errors
  // We set to true if they submit and there are errors.
  // We only show errors after they submit because
  // it's annoying to see errors while typing.
  const [showErrors, setShowErrors] = useState(false);

  // Error array we'll populate
  let errors = [];

  // Function for fetching error for a field
  const getError = (field) => {
    return errors.find((e) => e.field === field);
  };

  // Function to see if field is empty
  const isEmpty = (val) => val.trim() === "";

  // Add error if email empty
  if (["signin", "signup", "forgotpass"].includes(props.mode)) {
    if (isEmpty(email) && isEmpty(account)) {
      errors.push({
        field: "email",
        message: "Please enter an account or email",
      });
    }
  }

  // Add error if password empty
  if (["signin", "signup", "changepass"].includes(props.mode)) {
    if (isEmpty(pass)) {
      errors.push({
        field: "pass",
        message: "Please enter a key",
      });
    }
  }

  // Add error if confirmPass empty or
  // if it doesn't match pass.
  // Only for signup and changepass views.
  if (["signup", "changepass"].includes(props.mode)) {
    if (isEmpty(confirmPass)) {
      errors.push({
        field: "confirmPass",
        message: "Please confirm password",
      });
    } else if (pass !== confirmPass) {
      errors.push({
        field: "confirmPass",
        message: `This doesn't match your password`,
      });
    }
  }

  async function createAcc(e) {
    e.preventDefault();
    try {
      const response = await createAccount();
      console.log(response.data);
      setNewAccount(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // If field errors then show them
    if (errors.length) {
      setShowErrors(true);
    } else {
      // Otherwise call onSubmit with email/pass
      if (props.onSubmit) {
        props.onSubmit({
          email: email || account,
          pass,
        });
      }
    }
  };

  return (
    <div className="Auth">
      {props.status && props.status.message && (
        <FormStatus type={props.status.type} message={props.status.message} />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* {["signup", "signin", "forgotpass"].includes(props.mode) && (
          <FormField
            value={email}
            type="email"
            placeholder="Email"
            error={showErrors && getError("email")}
            onChange={(value) => setEmail(value)}
          />
        )} */}

        {["signup", "signin", "changepass"].includes(props.mode) && (
          <FormField
            value={account}
            type="text"
            placeholder="Account ID"
            error={showErrors && getError("account")}
            onChange={setAccount}
          />
        )}

        {["signup", "signin", "changepass"].includes(props.mode) && (
          <FormField
            value={pass}
            type="password"
            placeholder="Account Key"
            error={showErrors && getError("pass")}
            onChange={(value) => setPass(value)}
          />
        )}

        {["signup", "changepass"].includes(props.mode) && (
          <FormField
            value={confirmPass}
            type="password"
            placeholder="Confirm Password"
            error={showErrors && getError("confirmPass")}
            onChange={(value) => setConfirmPass(value)}
          />
        )}

        <div className="field">
          <p className="control ">
            <SectionButton
              parentColor={props.parentColor}
              size="medium"
              fullWidth={true}
              state={
                props.status && props.status.type === "pending"
                  ? "loading"
                  : "normal"
              }
            >
              {props.buttonText}
            </SectionButton>
          </p>
        </div>

        {["signup", "signin"].includes(props.mode) && (
          <div className="Auth__bottom-link has-text-centered">
            {props.mode === "signup" && (
              <>
                Have an account already?
                <Link to="/signin">Sign in</Link>
              </>
            )}

            {props.mode === "signin" && (
              <>
                <a
                  href="https://portal.hedera.com/register"
                  onClick={createAcc}
                  target="_blank"
                >
                  Create an account
                </a>
                {/* <Link to="/forgotpass">Forgot password</Link> */}
              </>
            )}
          </div>
        )}
      </form>
      {newAccount && (
        <div>
          <hr />
          <p>Save this information, this is your new Vocal account: </p>
          Account: {newAccount.accountId}
          <br />
          Public key: {newAccount.publicKey}
          <br />
          Private key: {newAccount.privateKey}
        </div>
      )}
    </div>
  );
}

export default Auth;
