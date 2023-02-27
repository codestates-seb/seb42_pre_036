import React, { useState } from "react";
import styled from "styled-components";
import LoginPopup from "../LoginPopup";
import Comment from "../Comment";
import axios from "axios";
import {
  BsBookmarkCheck,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";

const DetailContainer = styled.div`
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;
const QuestionDetail = styled.div`
  font-size: medium;
  white-space: pre-wrap;
`;

const SideMenu = styled.div`
  width: 55px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: var(--black-300);
  > * {
    margin-top: 20px;
  }
`;
const RecoContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 35px;
  > b {
    color: var(--black);
    font-size: 25px;
  }
`;

const MainMenu = styled.div`
  width: 100%;
`;
const UserBoxContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const UserAddOn = styled.div`
  font-size: small;
  margin: 10px 0;
  color: var(--black-300);
  li {
    display: inline;
    margin-right: 5px;
  }
`;
const UserInfoConainer = styled.div`
  margin: 10px 0 30px 0;
  display: flex;
`;
const UserInfo = styled.div`
  width: 200px;
  background-color: var(--blue-100);
  border-radius: var(--br-sm);
  padding: 5px 6px 7px 7px;
`;
const UserName = styled.div`
  margin: 2px 10px 0 0;
  text-align: end;
  font-weight: 500;
  color: var(--black-500);
`;

const CreatedAt = styled.div`
  font-size: small;
  color: var(--black-200);
`;
const CommentAddBtn = styled.button`
  color: var(--black-200);
  margin-top: 10px;
`;
const AddCommentContainer = styled.div`
  display: flex;
`;

const AddCommentForm = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  width: 93%;
  height: 60px;
  border: 1px solid var(--black-100);
  border-radius: var(--br-sm);
`;

const SubmitCommentBtn = styled.button`
  margin-left: 5px;
  margin-top: 10px;
  text-align: center;
  height: 60px;
  border: 1px solid var(--black-100);
  border-radius: var(--br-sm);
  padding: 5px;
`;

function Detail({ QorA, data, idValue, loginMemberId }) {
  const [isOpenLoginPopup, setisOpenLoginPopup] = useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const userAddOnArr = ["Share", "Edit", "Follow"];
  const openLoginPopupHandler = () => {
    setisOpenLoginPopup(!isOpenLoginPopup);
  };
  const openCommentHandler = () => {
    setIsOpenCommentForm(!isOpenCommentForm);
  };
  const commentValueHandler = (e) => {
    setCommentValue(e.target.value);
  };
  const commentSubmitHandler = () => {
    axios
      .post(
        `/api/questions/${idValue}/answers`,
        {
          memberId: loginMemberId,
          content: commentValue,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => err);
  };

  return (
    <DetailContainer key={data.QorA}>
      <SideMenu>
        <RecoContianer>
          <BsFillCaretUpFill />
          <b>0</b>
          <BsFillCaretDownFill />
        </RecoContianer>
        <BsBookmarkCheck />
        <BsArrowCounterclockwise />
      </SideMenu>
      <MainMenu>
        <QuestionDetail>{data.content}</QuestionDetail>
        <UserBoxContainer>
          <UserAddOn>
            <ul>
              {userAddOnArr.map((el) => {
                return <li onClick={openLoginPopupHandler}>{el}</li>;
              })}
            </ul>
          </UserAddOn>
          <UserInfoConainer>
            <UserInfo>
              <CreatedAt>
                asked {new Date(data.createdAt).toDateString()}
              </CreatedAt>
              <UserName>{data.member}</UserName>
            </UserInfo>
          </UserInfoConainer>
        </UserBoxContainer>
        {data.comments.map((el) => {
          return <Comment comments={el}></Comment>;
        })}
        {isOpenCommentForm ? (
          <AddCommentContainer>
            <AddCommentForm
              value={commentValue}
              onChange={(e) => commentValueHandler(e)}
              placeholder="Enter Your Commnet"
            />
            <SubmitCommentBtn
              onClick={() => {
                commentSubmitHandler();
                openCommentHandler();
              }}
            >
              Submit
            </SubmitCommentBtn>
          </AddCommentContainer>
        ) : (
          <CommentAddBtn onClick={openCommentHandler}>
            Add a comment
          </CommentAddBtn>
        )}
        {isOpenLoginPopup ? (
          <LoginPopup
            openLoginPopupHandler={openLoginPopupHandler}
          ></LoginPopup>
        ) : null}
      </MainMenu>
    </DetailContainer>
  );
}

export default Detail;
