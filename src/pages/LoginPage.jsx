import "../assets/css/Login/Login.css";
import Logo from "../assets/img/Login/logo.jpeg";
import svgGoogle from "../assets/img/google.png";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { endPoint } from "../config/config";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { RegisterModal } from "../components/Modal/RegisterModal";

export const LoginPage = () => {
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));

    savedData && navigate("/posts");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const [googleData, setGoogleData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Iniciando Sesion",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(endPoint.baseURL + endPoint.login, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      Swal.fire({
        title: "Bienvenido",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      const userData = dataResponse.user;
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/posts");
    } else {
      Swal.fire({
        title: "Error",
        text: "Ocurrio un error al iniciar sesion",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  function handleCallBackResponse(response) {
    const userObject = jwt_decode(response.credential);
    setGoogleData(userObject);
    setShow(true);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "24376355745-ab9ku5834kc8u5rrhnv9apstl7gne4er.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="app">
      <section className="principal-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-cont text-center">
                <img alt="Luvikah Logo" src={Logo} className="img-logo" />
                <h2 className="text-center text-lg-start">
                  Con Luvikah Connect, conecta con lo que amas de manera
                  sencilla y rápida.
                </h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form autoComplete="off" action="">
                    <div className="row ">
                      <div className="col-md-12">
                        <input
                          type="email"
                          placeholder="Ingresa tu correco electrónico"
                          className="form-control"
                          {...register("email", {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          })}
                        />
                        {errors.email?.type === "required" && (
                          <p role="alert" className="error">
                            Ingresá un correo electrónico{" "}
                          </p>
                        )}
                        {errors.email?.type === "pattern" && (
                          <p role="alert" className="error">
                            Ingresa un correo electrónico válido
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <input
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          className="form-control"
                          {...register("password", {
                            required: true,
                          })}
                        />
                        {errors.password?.type === "required" && (
                          <p role="alert" className="error">
                            Ingresá una contraseña{" "}
                          </p>
                        )}
                      </div>
                    </div>{" "}
                    <div className="row mt-3">
                      <div className="col-md-12 text-center">
                        <button
                          onClick={handleSubmit(onSubmit)}
                          className="btn btn-login"
                        >
                          Iniciar Sesion
                        </button>
                        <div className="d-flex justify-content-center align-items-center mt-2">
                          <div id="google"></div>
                        </div>
                        <p className="mt-1">
                          ¿No tienes cuenta?{" "}
                          <span
                            onClick={() => handleShow()}
                            style={{ textDecoration: "underline" }}
                          >
                            Regístrate
                          </span>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RegisterModal show={show} handleClose={handleClose} setGoogleData={googleData} />
    </div>
  );
};
