import React from "react";
import LoadingGif from '../../assets/loadinglabeddit.gif'
import { StyleGif, Container } from "./style";

export const Loading = () => {
  return (
    <Container>
        <StyleGif src={LoadingGif}/>
    </Container>
  )
}
