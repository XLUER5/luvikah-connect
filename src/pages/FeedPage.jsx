import { useEffect, useState } from "react";
import { PrincipalLayout } from "../Layout/PrincipalLayout";
import { PostItem } from "../components/PostItem";
import "../assets/css/Feed/Feed.css";
import { endPoint } from "../config/config";
import Swal from "sweetalert2";
import { UploadModal } from "../components/Modal/UploadModal";

export const FeedPage = () => {
  const [post, setPost] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    getGaleria();
  }, []);

  const getGaleria = async () => {
    const savedData = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      endPoint.baseURL + endPoint.getGaleria + "/" + savedData.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const dataResponse = await response.json();

    if (response.ok) {
      setPost(dataResponse);
    } else {
      Swal.fire({
        title: "Error",
        text: "Ocurrio un error al descargar fotos",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <PrincipalLayout>
      <div className="post-container">
        <button onClick={() => handleShow()} className="btn btn-primary mt-2">
          NUEVO POST
        </button>

        {post.map((post) => (
          <PostItem
            key={post.id}
            getGaleria={getGaleria}
            idGaleria={post.id}
            user={post.user}
            userImg={post.userImg}
            fecha={post.fecha}
            img={"http://localhost:8000/imagenes/" + post.img}
            comentario={post.comentario}
            likes={post.likes}
            liked={post.liked}
            comentarios={post.comentarios}
          />
        ))}
      </div>
      <UploadModal
        handleClose={handleClose}
        show={show}
        getGaleria={getGaleria}
      />
    </PrincipalLayout>
  );
};
