import { useEffect, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoLabeddit from "../../assets/logolabeddit.png";
import { Buttons } from "../../components/Buttons";
import { StyleLine } from "../../components/StyleLine";
import { Input } from "../../components/Input";
import { GoTo } from "../../functions/GoTo";
import { Separator } from "../../components/Separator";
import { Form } from "../../components/Form";
import { useForm } from "../../hooks/useForm";
import {
  Container,
  ButtonsContainer,
  LogoStyle,
  InputContainer,
  TextLogo,
  Title,
  Subtitle,
} from "./styled";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { form, onChange, cleanFields } = useForm({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      GoTo(navigate, "/feed");
    }
  }, []);

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://labeddit-2.herokuapp.com/users/login",
        form
      );
      window.localStorage.setItem("token", response.data.token);
      window.alert("Login realizado com sucesso.");
      GoTo(navigate, "/feed");
    } catch (error) {
      window.alert("Usuário NÃO encontrado.");
      cleanFields();
    }
  };

  return (
    <Container>
      <Separator height={133} />

      <LogoStyle src={LogoLabeddit} />

      <TextLogo>
        <Title>LabEddit</Title>
        <Subtitle>O projeto de rede social da Labenu</Subtitle>
      </TextLogo>

      <Separator height={107} />
      <Form onSubmit={login}>
        <InputContainer>
          <Input
            name="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="E-mail"
          ></Input>
          <Input
            name="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="Senha"
          ></Input>
        </InputContainer>

        <Separator height={56} />

        <ButtonsContainer>
          <Buttons
            color={"#FFF"}
            background={"linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"}
            border={"none"}
            borderRadius={27}
          >
            Continuar
          </Buttons>
          <StyleLine></StyleLine>
          <Buttons
            onClick={() => GoTo(navigate, "/register")}
            color={"#FE7E02"}
            background={"#FFF"}
            border={"1px solid #FE7E02"}
            borderRadius={27}
          >
            Crie uma conta!
          </Buttons>
        </ButtonsContainer>
      </Form>
    </Container>
  );
};
