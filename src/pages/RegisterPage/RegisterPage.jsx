import { useEffect, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Checkbox,
  TextContract,
  ContainerCheckButton,
  Text,
  CheckText,
  DivCheckText,
  InputContainer,
} from "./styled";
import { Header } from "../../components/Header/Header";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Buttons } from "../../components/Buttons";
import { useForm } from "../../hooks/useForm";
import { GoTo } from "../../functions/GoTo";
import { Separator } from "../../components/Separator";

export const RegisterPage = () => {
  const { form, onChange, cleanFields } = useForm({ username: "", email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      GoTo(navigate, "/feed");
    }
  }, []);

  const signup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://labeddit-2.herokuapp.com/users/signup",
        form
      );
      window.localStorage.setItem("token", response.data.token);
      window.alert("Cadastro realizado com sucesso.");
      GoTo(navigate, "/feed");
    } catch (error) {
      window.alert("Cadastro NÃO realizado.");
      cleanFields();
    }
  };

  return (
    <Container>
      <Header></Header>
      <Text>Olá, boas vindas ao LabEddit ;)</Text>
      <Separator height={196} />
      <Form onSubmit={signup}>
        <InputContainer>
          <Input
            name="username"
            value={form.username}
            onChange={onChange}
            required
            placeholder="Nome de usuário"
          ></Input>
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
            pattern="[0-9a-zA-Z]{8,30}"
            title=" A senha deve possuir no mínimo 8 e no máximo 30 caracteres"
          ></Input>
        </InputContainer>
        <Separator height={65} />
        <ContainerCheckButton>
          <TextContract>
            Ao continuar, você concorda com o nosso contrato de usuário e nossa
            Política de Privacidade
          </TextContract>
          <Separator height={17} />
          <DivCheckText>
            <Checkbox type="checkbox"></Checkbox>
            <CheckText>
              Eu concordo em receber emails sobre coisas legais no Labeddit
            </CheckText>
          </DivCheckText>
          <Separator height={28} />
          <Buttons
            color={"#FFF"}
            background={"linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"}
            border={"none"}
            borderRadius={27}
          >
            Cadastrar
          </Buttons>
        </ContainerCheckButton>
      </Form>
    </Container>
  );
};
