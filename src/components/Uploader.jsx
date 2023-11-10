import { useState } from "react";
import { get, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import iconoFoto from "../assets/img/icono-fotos.webp";
import { endPoint } from "../config/config";

export const Uploader = ({ getGaleria, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Selecciona tu fotografía");

  const getFile = () => {
    document.querySelector(".file-input").click();
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Subiendo Imagen",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const savedData = JSON.parse(localStorage.getItem("user"));

    const opciones = { timeZone: "America/Guatemala" };
    const fechaActual = new Date();
    const fechaGuatemala = fechaActual.toLocaleDateString("es-GT", opciones);

    const formData = new FormData();
    formData.append("imagen", data.imagen[0]);
    formData.append("comentario", data.comentario);
    formData.append("idUsuario", savedData.id);
    formData.append("fechaCreacion", fechaGuatemala);

    const response = await fetch(endPoint.baseURL + endPoint.subirImagen, {
      method: "POST",
      body: formData,
    });
    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Imagen Subida Exitosamente",
      });
      getGaleria();
      handleClose();
    } else {
      Swal.close();
      setShowLoader(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: dataResponse.error,
      });
    }
  };

  return (
    <>
      <div className="uploader">
        <form autoComplete="off">
          <div className="form-upload" onClick={getFile}>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="file-input"
              hidden
              {...register("imagen", { required: true })}
              onChangeCapture={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files) {
                  const imageSize = files[0].size;
                  const maxSize = 20 * 1024 * 1024;
                  if (imageSize <= maxSize) {
                    setImage(URL.createObjectURL(files[0]));
                  } else {
                    alert("Imagen muy pesada. Máximo 20MB");
                    setImage(null);
                    setFileName("Selecciona tu fotografía");
                    const fileInput = document.getElementById("file-input");
                    fileInput.value = "";
                  }
                }
              }}
            />
            {image ? (
              <>
                <img src={image} className="previsualizar-img" />
              </>
            ) : (
              <>
                <img src={iconoFoto} style={{ width: "15%" }} />
                <div className="text-center">
                  <p className="filename">{fileName}</p>
                </div>
              </>
            )}
            {errors.imagen?.type === "required" && (
              <p role="alert" className="error">
                Carga una imagen{" "}
              </p>
            )}
          </div>
          <label className="mt-2">Comentario</label>
          <input
            {...register("comentario", { required: true })}
            type="text"
            className="form-control"
          />
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
            >
              Subir Imagen
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
