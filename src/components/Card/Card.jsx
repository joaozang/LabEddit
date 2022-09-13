import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  UserP,
  NumbVoteStyle,
  CommentsIconStyle,
  TitleP,
  TextP,
  Bar,
  UpDown,
  CommentsDiv,
  NumbCommentStyle,
  VoteStyle,
} from "./style";
import UpVoteIcon from "../../assets/upvote.png";
import DownVoteIcon from "../../assets/downvote.png";
import UpGreen from "../../assets/upgreen.png"
import DownRed from '../../assets/downred.png'
import CommentsIcon from "../../assets/comments.png";
import { GoTo } from "../../functions/GoTo";
import { Separator } from "../../components/Separator";

export const Card = (props) => {
  const navigate = useNavigate();
  console.log(props.userVote)
  return (
    <Container>
      <UserP>Enviado por: {props.username}</UserP>
      <Separator height={18} />
      {props.type === "posts" && props.title.length > 20 ? (
        <TitleP>{props.title.slice(0, 20) + "..."}</TitleP>
      ) : (
        <TitleP>{props.title}</TitleP>
      )}

      <Separator height={9} />
      {props.bodyText.length > 40 ? (
        <TextP>{props.bodyText.slice(0, 40) + "..."}</TextP>
      ) : (
        <TextP>{props.bodyText}</TextP>
      )}

      <Separator height={22} />
      <Bar>
        <UpDown>
          {props.userVote !== 1 && (
            <VoteStyle
              src={UpVoteIcon}
              onClick={() => props.createVote(props.id, 1)}
            />
          )}
          {props.userVote === 1 && (
            <VoteStyle
              src={UpGreen}
              onClick={() => props.deleteVote(props.id)}
            />
          )}
          <NumbVoteStyle>{props.voteSum ? props.voteSum : "0"}</NumbVoteStyle>
          {props.userVote !== -1 && (
            <VoteStyle
              src={DownVoteIcon}
              onClick={() => props.createVote(props.id, -1)}
            />
          )}
          {props.userVote === -1 && (
            <VoteStyle
              src={DownRed}
              onClick={() => props.deleteVote(props.id)}
            />
          )}
        </UpDown>
        {props.type === "posts" && (
          <CommentsDiv onClick={() => GoTo(navigate, `/post/${props.id}`)}>
            <CommentsIconStyle src={CommentsIcon} />
            <NumbCommentStyle>
              {props.commentCount ? props.commentCount : "0"}
            </NumbCommentStyle>
          </CommentsDiv>
        )}
        {props.type === "postsPrincipal" && (
          <CommentsDiv>
            <CommentsIconStyle src={CommentsIcon} />
            <NumbCommentStyle>
              {props.commentCount ? props.commentCount : "0"}
            </NumbCommentStyle>
          </CommentsDiv>
        )}
      </Bar>
    </Container>
  );
};
