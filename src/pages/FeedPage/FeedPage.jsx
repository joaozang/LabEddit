import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../components/Header/Header";
import { TextArea } from "../../components/TextArea";
import { Buttons } from "../../components/Buttons";
import { StyleLine } from "../../components/StyleLine";
import { Card } from "../../components/Card/Card";
import { Loading } from "../../components/Loading/Loading";
import { Form } from "../../components/Form";
import {
  Container,
  ContainerTextAndButton,
  ContainerPosts,
  InputTitle,
} from "./styled";
import { GoTo } from "../../functions/GoTo";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { Separator } from "../../components/Separator";

export const FeedPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  // const [loading, setLoading] = useState(true)
  const { form, onChange, cleanFields } = useForm({ title: "", body: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      GoTo(navigate, "/");
    } else {
      getPosts();
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

  const createPost = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://labeddit-2.herokuapp.com/posts",
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.alert("Post realizado");
      cleanFields();
      getPosts();
    } catch (error) {
      console.log(error);
      cleanFields();
    }
  };

  const createPostVote = async (id, data) => {
    const token = localStorage.getItem("token");
    const body = {
      direction: data,
    };
    try {
      const response = await axios.post(
        `https://labeddit-2.herokuapp.com/posts/${id}/votes`,
        body,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("foi upvote");
      getPosts();
    } catch (error) {}
  };

  const deletePostVote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://labeddit-2.herokuapp.com/posts/${id}/votes`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getPosts();
    } catch (error) {
      
    }
  }

  console.log(posts);
  return (
    <Container>
      <Header />
      <Form onSubmit={createPost}>
        <ContainerTextAndButton>
          <InputTitle
            name="title"
            value={form.title}
            onChange={onChange}
            required
            placeholder="Título"
          ></InputTitle>
          <TextArea
            name="body"
            value={form.body}
            onChange={onChange}
            required
            placeholder={"Escreva seu post..."}
          ></TextArea>
          <Buttons
            color={"#FFF"}
            background={"linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"}
            border={"none"}
            borderRadius={12}
          >
            Postar
          </Buttons>

          <StyleLine />
        </ContainerTextAndButton>
      </Form>
      {/* <Separator height={26}/> */}
      <ContainerPosts>
        {posts &&
          posts?.map((data, index) => {
            return (
              <Card
                type={"posts"}
                deleteVote={deletePostVote}
                userVote={data.userVote}
                createVote={createPostVote}
                username={data.username}
                title={data.title}
                bodyText={data.body}
                voteSum={data.voteSum}
                commentCount={data.commentCount}
                id={data.id}
                key={index}
              />
            );
          })}
      </ContainerPosts>
    </Container>
  );
};
