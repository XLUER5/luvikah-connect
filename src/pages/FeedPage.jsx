import { useState } from "react";
import { PrincipalLayout } from "../Layout/PrincipalLayout";
import { PostItem } from "../components/PostItem";
import "../assets/css/Feed/Feed.css";

export const FeedPage = () => {
  const [post, setPost] = useState([
    {
      id: 1,
      user: "lestrada",
      userImg: "https://randomuser.me/api/portraits/men/81.jpg",
      img: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 20,
      liked: true,
      fecha: "04/12/2023",
      comentario: "Mi primera Chamba",
      comentarios: [
        {
          id: 1,
          user: "varturo",
          comentario: "Bonita Foto",
          commentImg: "https://randomuser.me/api/portraits/men/81.jpg",
          fecha: "04/11/2023",
        },
        {
          id: 2,
          user: "kbarrera",
          comentario: "Bonito Paisaje",
          commentImg: "https://randomuser.me/api/portraits/men/81.jpg",
          fecha: "04/11/2023",
        }
      ],
    },
    {
      id: 2,
      user: "lestrada",
      userImg: "https://randomuser.me/api/portraits/men/81.jpg",
      img: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      likes: 20,
      liked: false,
      fecha: "04/12/2023",
      comentario: "Mi primera Chamba",
    },
  ]);

  return (
    <PrincipalLayout>
      <div className="post-container">
        {post.map((post) => (
          <PostItem
            key={post.id}
            user={post.user}
            userImg={post.userImg}
            fecha={post.fecha}
            img={post.img}
            comentario={post.comentario}
            likes={post.likes}
            liked={post.liked}
            comentarios={post.comentarios}
          />
        ))}
      </div>
    </PrincipalLayout>
  );
};
