import React from 'react'
import { Container, DivButton, LogoStyle, Ximg, Teste } from './style'
import LogoLabeddit from "../../assets/logolabeddit.png";
import { GoTo } from '../../functions/GoTo';
import { useNavigate } from "react-router";

export const Header = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.setItem("token", "");
    window.alert("Você deslogou.");
    GoTo(navigate,"/");
  };

  return (
    <Container>
      <Ximg onClick={()=> GoTo(navigate, "/feed")} src={props.src} />
      <Teste>
        <LogoStyle src={LogoLabeddit} />
        {token ? (
          <DivButton onClick={logout}>Logout</DivButton>
        ) : (
          <DivButton onClick={() => GoTo(navigate, "/")}>Entrar</DivButton>
        )}
      </Teste>
    </Container>
  );
}
