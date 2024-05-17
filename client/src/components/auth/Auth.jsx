import { Container, Button, Form, InputGroup } from "react-bootstrap";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signup, signin } from "../../actions/auth";

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const passwordValue = useRef({});
  passwordValue.current = watch("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (userData) => {
    if (isSignUp) {
      dispatch(signup(userData, navigate));
    } else {
      dispatch(signin(userData, navigate));
    }
  };

  const switchMode = () => {
    reset();
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center bg-white mt-5 py-3"
      style={{ maxHeight: "fit-content", maxWidth: "fit-content" }}
    >
      <span className="text-center">
        <h5 className="h3 pt-2 heading">{isSignUp ? "Sign up" : "Sign in"}</h5>
      </span>

      <Form className="" onSubmit={handleSubmit(handleOnSubmit)}>
        {isSignUp && (
          <>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                autoFocus={true}
                {...register("firstName")}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                {...register("lastName")}
                required
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email address"
            {...register("email")}
            required
          />
        </Form.Group>

        <InputGroup className="mb-2">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            required
          />
          <InputGroup.Text id="basic-addon2" onClick={togglePasswordVisibility}>
            <i
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
          </InputGroup.Text>
        </InputGroup>

        {errors.password && (
          <p className="text-danger mb-2">{errors.password.message}</p>
        )}

        {isSignUp && (
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === passwordValue.current ||
                  "The passwords do not match",
              })}
              required
            />
          </Form.Group>
        )}

        {errors.confirmPassword && (
          <p className="text-danger mb-2">{errors.confirmPassword.message}</p>
        )}

        <Button
          variant=""
          type="submit"
          className="w-100 mb-2 login-btn heading"
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </Button>

        <Button
          variant=""
          className="w-100 fs-6 text-dark heading toggle-btn"
          onClick={switchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign up"}
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;
