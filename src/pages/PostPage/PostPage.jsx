import { useEffect, React } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoTo } from "../../functions/GoTo";
import { Header } from "../../components/Header/Header";
import { Container, ContainerPostPrincipal, ContainerComments } from "./styled";
import back from "../../assets/x2.png";
import { useParams } from "react-router-dom";
import { Separator } from "../../components/Separator";
import { Card } from "../../components/Card/Card";
import { TextArea } from "../../components/TextArea";
import { Form } from "../../components/Form";
import { Buttons } from "../../components/Buttons";
import { useForm } from "../../hooks/useForm";
import { StyleLine } from "../../components/StyleLine";

export const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const { form, onChange, cleanFields } = useForm({body: "" });
  const params = useParams();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      GoTo(navigate, "/");
    } else {
      getPosts();
      getPostComments()
    }
  }, []);

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://labeddit-2.herokuapp.com/posts",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getPostComments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://labeddit-2.herokuapp.com/posts/${params.id}/comments`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setComments(response.data)
    } catch (error) {}
  };

  const createComment = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://labeddit-2.herokuapp.com/posts/${params.id}/comments`, form,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.alert("Comentário criado")
    } catch (error) {
      console.log(error)
    }
  }

  const postPrincipal = posts?.map((data, index) => {
    if (data.id === params.id) {
      return (
        <Card
          type={"postsPrincipal"}
          username={data.username}
          title={data.title}
          bodyText={data.body}
          voteSum={data.voteSum}
          commentCount={data.commentCount}
          key={index}
        />
      );
    }
  });

    const createCommentVote = async (id, data) => {
      const token = localStorage.getItem("token");
      const body = {
        direction: data,
      };
      try {
        const response = await axios.post(
          `https://labeddit-2.herokuapp.com/comments/${id}/votes`,
          body,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("foi upvote");
        getPostComments();
      } catch (error) {}
    };

    const deleteCommentVote = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `https://labeddit-2.herokuapp.com/comments/${id}/votes`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        getPostComments();
      } catch (error) {}
    };
    console.log(comments)
  
  return (
    <Container>
      {console.log(form)}
      <Header src={back} />
      <Separator height={28} />
      <ContainerPostPrincipal>
        {postPrincipal}
        <Separator height={12} />
        <Form onSubmit={createComment}>
          <TextArea
            name="body"
            value={form.body}
            onChange={onChange}
            required
            placeholder={"Adicionar comentário"}
          ></TextArea>
          <Separator height={8} />
          <Buttons
            color={"#FFF"}
            background={"linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"}
            border={"none"}
            borderRadius={12}
          >
            Responder
          </Buttons>
          <Separator height={16} />
          <StyleLine />
        </Form>
      </ContainerPostPrincipal>
      <Separator height={26}/>
      <ContainerComments>
        {comments &&
          comments?.map((item, index) => {
            return (
              <Card
                deleteVote={deleteCommentVote}
                createVote={createCommentVote}
                userVote={item.userVote}
                title={item.title}
                username={item.username}
                bodyText={item.body}
                voteSum={item.voteSum}
                id={item.id}
                key={index}
              />
              
            );
          })}
      </ContainerComments>
    </Container>
  );
};
