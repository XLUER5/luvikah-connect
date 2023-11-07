import {
  ChatBubbleOutline,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useState } from "react";

export const PostItem = ({
  user,
  img,
  likes,
  fecha,
  userImg,
  comentario,
  liked,
  comentarios,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <div className="card mt-3 mx-auto single-post">
      <div className="card-header">
        <div className="row">
          <div className="col-2 col-sm-1">
            <img className="avatar-img" src={userImg} />
          </div>
          <div className="col-8 col-sm-9">
            <h4 className="card-header-title m-0">{user}</h4>
            <small className="text-muted card-header-subTitle">{fecha}</small>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text mb-1">{comentario}</p>
        <img src={img} alt="post img" className="post-img" />
        <ul className="list-group">
          <li className="list-group-item text-muted">
            {`A ${likes} personas le gusta tu post`}
          </li>
          {commentsVisible && (
            <div className="comentarios-container">
              <div className="row mt-3 mb-3">
                <div className="col-md-12">
                  <input type="text" className="form-control" />
                  <button className="btn btn-info mt-2">Comentar</button>
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
                <button className="btn d-flex justify-content-center align-items-center gap-2 px-0">
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
  );
};
