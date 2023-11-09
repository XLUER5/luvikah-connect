import React, { useEffect, useState } from "react";
import { PrincipalLayout } from "../Layout/PrincipalLayout";
import { Card } from "react-bootstrap";

import "../assets/css/Profile/Profile.css";
import { endPoint } from "../config/config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { get, useForm } from "react-hook-form";

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useParams();

  const [userData, setUser] = useState({});

  const [savedData, setSavedData] = useState({});

  const [newImage, setNewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfile();
    const savedData = JSON.parse(localStorage.getItem("user"));
    setUser(savedData);
  }, []);

  const getProfile = async () => {
    const data = { username: user };

    const response = await fetch(endPoint.baseURL + endPoint.register, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      setSavedData(dataResponse.user);
      setValue("nombre", dataResponse.user.nombre);
      setValue("apellido", dataResponse.user.apellido);
      setValue("descripcion", dataResponse.user.descripcion);
      setValue("username", dataResponse.user.username);
    } else {
      Swal.fire({
        title: "Usuario no encontrado",
        html: "Recargue la pagina",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    }
  };

  const handleImageChange = () => {
    setUser({ ...user, profileImage: newImage });
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Actualizando Perfil",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(endPoint.baseURL + endPoint.updatePerfil, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      Swal.fire({
        title: "Operacion Exitosa",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      getProfile();
    } else {
      Swal.fire({
        title: "Error",
        text: dataResponse.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <PrincipalLayout>
      <Card className="w-75">
        <Card.Body>
          <div className="text-center">
            <h2>Mi Perfil</h2>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <div className="text-center d-flex justify-content-center align-items-center flex-column">
                <img
                  src="https://randomuser.me/api/portraits/men/81.jpg"
                  alt=""
                  style={{ width: "50%" }}
                />
                {savedData.username === userData.username ? (
                  <button className="btn btn-primary mt-2">
                    Cambiar Imagen
                  </button>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
              <form className="" action="">
                <label className="mt-3 label-profile">Username</label>
                <input
                  type="text"
                  placeholder="nombreUsuario"
                  className="form-control"
                  disabled
                  value={savedData.username}
                />
                <label className="mt-3 label-profile">Nombre</label>
                {savedData.username === userData.username ? (
                  <>
                    <input
                      type="text"
                      placeholder="nombre"
                      className="form-control"
                      {...register("nombre", {
                        required: true,
                      })}
                    />
                    {errors.nombre?.type === "required" && (
                      <p role="alert" className="error">
                        Ingresa un nombre
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      disabled
                      placeholder="nombre"
                      className="form-control"
                      value={savedData.nombre}
                    />
                  </>
                )}
                <label className="mt-3 label-profile">Apellido</label>
                {savedData.username === userData.username ? (
                  <>
                    <input
                      type="text"
                      placeholder="nombre"
                      className="form-control"
                      {...register("apellido", {
                        required: true,
                      })}
                    />
                    {errors.apellido?.type === "required" && (
                      <p role="alert" className="error">
                        Ingresa un apellido
                      </p>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    disabled
                    placeholder="nombre"
                    className="form-control"
                    value={savedData.apellido}
                  />
                )}

                <label className="mt-3 label-profile">Descripcion</label>
                {savedData.username === userData.username ? (
                  <>
                    <input
                      type="text"
                      placeholder="descripcion"
                      className="form-control"
                      {...register("descripcion", {
                        required: true,
                      })}
                    />
                    {errors.descripcion?.type === "required" && (
                      <p role="alert" className="error">
                        Ingresa una descripcion
                      </p>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    disabled
                    placeholder="descripcion"
                    className="form-control"
                    value={savedData.descripcion}
                  />
                )}

                <div className="text-center">
                  {savedData.username === userData.username ? (
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="btn btn-primary mt-2"
                    >
                      Guardar
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </PrincipalLayout>
  );
};
