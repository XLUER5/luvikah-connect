import {
  ChatBubbleOutline,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowImage } from "./Modal/ShowImage";
import { get, useForm } from "react-hook-form";
import { endPoint } from "../config/config";
import Swal from "sweetalert2";

export const PostItem = ({
  idGaleria,
  user,
  img,
  likes,
  fecha,
  userImg,
  comentario,
  liked,
  comentarios,
  getGaleria,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleOpen = () => setShow(true);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const redirectProfle = (user) => {
    navigate("/profile/" + user);
  };

  const newLike = () => {
    alert("Nuevo Like para el post " + idGaleria + "");
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Por favor espere",
      html: "Agregando Comentario",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const savedData = JSON.parse(localStorage.getItem("user"));
    const fechaActual = new Date();
    const opciones = { timeZone: "America/Guatemala" };

    const fechaGuatemala = fechaActual.toLocaleDateString("es-GT", opciones);
    const idUsuario = savedData.id;
    const comentario = data.comentario;

    const payload = {
      fechaComentario: fechaGuatemala,
      idUser: idUsuario,
      idGaleria: idGaleria,
      comentario: comentario,
    };

    const response = await fetch(endPoint.baseURL + endPoint.newComentario, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.status === 200) {
      Swal.close();
      getGaleria();
      reset();
    } else {
      Swal.fire({
        title: "Error",
        text: dataResponse.mensaje,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="card mt-3 mx-auto single-post">
        <div className="card-header">
          <div className="row">
            <div className="col-2 col-sm-1">
              <img className="avatar-img" src={userImg} />
            </div>
            <div className="col-8 col-sm-9">
              <h4
                className="card-header-title m-0 header-h4"
                onClick={() => redirectProfle(user)}
              >
                {user}
              </h4>
              <small className="text-muted card-header-subTitle">{fecha}</small>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text mb-1">{comentario}</p>
          <div className="text-center">
            <img
              onClick={() => handleOpen()}
              src={img}
              alt="post img"
              className="post-img"
            />
          </div>
          <ul className="list-group">
            <li className="list-group-item text-muted">
              {`A ${likes} personas le gusta tu post`}
            </li>
            {commentsVisible && (
              <div className="comentarios-container">
                <div className="row mt-3 mb-3">
                  <div className="col-md-12">
                    <form autoComplete="off">
                      <input
                        {...register("comentario", {
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                      />
                      {errors.comentario?.type === "required" && (
                        <p role="alert" className="error">
                          Ingresa un comentario
                        </p>
                      )}
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="btn btn-info mt-2"
                      >
                        Comentar
                      </button>
                    </form>
                  </div>
                </div>

                {comentarios &&
                  comentarios.length > 0 &&
                  comentarios.map((comment) => (
                    <div className="row mb-3">
                      <div className="col-2 col-sm-1">
                        <img className="avatar-img" src={comment.commentImg} />
                      </div>
                      <div className="col-8 col-sm-9">
                        <h6 className="">
                          {comment.user}
                          <small
                            className="text-muted"
                            style={{ fontSize: "10px", marginLeft: "2%" }}
                          >
                            {comment.fecha}
                          </small>
                        </h6>
                        <p>{comment.comentario}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <li className="list-group-item">
              <div className="row">
                <div className="col d-grid">
                  <button
                    onClick={() => newLike()}
                    className="btn d-flex justify-content-center align-items-center gap-2 px-0"
                  >
                    <span className="material-icons-round">
                      {liked === true ? <ThumbUpAltOutlined /> : <ThumbUp />}
                    </span>
                    Me gusta
                  </button>
                </div>
                <div className="col d-grid">
                  <button
                    onClick={toggleComments}
                    className="btn d-flex justify-content-center align-items-center gap-2 px-0"
                  >
                    <span className="material-icons-round">
                      <ChatBubbleOutline />
                    </span>
                    Comentar
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ShowImage show={show} handleClose={handleClose} imageURL={img} />
    </>
  );
};
