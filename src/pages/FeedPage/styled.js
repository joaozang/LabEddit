import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContainerTextAndButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
width: 100%;
padding: 0 34px;
padding-top: 30px;
padding-bottom: 36px;
`
export const ContainerPosts = styled.div `
width: 100%;
padding: 0 32px;
/* overflow : auto; */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
`
export const InputTitle = styled.input`
  padding-left: 17px;
  font-size: 18px;
  width: 100%;
  height: 44px;
  background-color: #ededed;
  border: none;
  border-radius: 4px;
`;

