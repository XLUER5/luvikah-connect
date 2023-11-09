import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { endPoint } from "../../config/config";

export const RegisterModal = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Registrando Usuario",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(endPoint.baseURL + endPoint.register, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      Swal.fire({
        title: "Registrado",
        text: "se ha registrado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: dataResponse.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="row">
              <div className="col-md-12">
                <label>Nombre*</label>
                <input
                  type="email"
                  placeholder="Ingresa tu nombre"
                  className="form-control"
                  {...register("nombre", {
                    required: true,
                    pattern: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s]{0,39}$/,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p role="alert" className="error">
                    Ingresa un nombre{" "}
                  </p>
                )}
                {errors.nombre?.type === "pattern" && (
                  <p role="alert" className="error">
                    Ingresa un nombre valido
                  </p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label>Apellido*</label>
                <input
                  type="text"
                  placeholder="Ingresa tu apellido"
                  className="form-control"
                  {...register("apellido", {
                    required: true,
                    pattern: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s]{0,39}$/,
                  })}
                />
                {errors.apellido?.type === "required" && (
                  <p role="alert" className="error">
                    Ingresa un apellido{" "}
                  </p>
                )}
                {errors.apellido?.type === "pattern" && (
                  <p role="alert" className="error">
                    Ingresa un apellido valido
                  </p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label>Correo Electronico*</label>
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
                <label>Contraseña*</label>
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
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label>Descripcion de tu perfil</label>
                <input
                  type="text"
                  placeholder="Ingresa tu contraseña"
                  className="form-control"
                  {...register("descripcion", {})}
                />
                {errors.descripcion?.type === "required" && (
                  <p role="alert" className="error">
                    Ingresá una contraseña{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label>Escoge tu nombre de usuario*</label>
                <input
                  type="text"
                  placeholder="Ingresa tu contraseña"
                  className="form-control"
                  {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p role="alert" className="error">
                    Ingresa un nombre de usuario{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-login"
                >
                  Registarse
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
