import styled from "styled-components";

export const Buttons = styled.button`
display: flex;
align-items: center;
justify-content: center;
font-size: 18px;
font-weight: bold;
width: 100%;
height: 51px;
color: ${(props) => props.color};
background: ${(props) => props.background} ;
border: ${(props) => props.border};
border-radius: ${(props) => props.borderRadius}px;
cursor: pointer;
`