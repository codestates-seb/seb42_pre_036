import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { currentPage } from "../reducers/actions";
import Container from "../styles/Container";
import Wrapper from "../styles/Wrapper";
import Notice from "../styles/Notice";
import FormContainer from "../styles/FormContainer";
import Form from "../styles/Form";
import Label from "../styles/Label";
import Input from "../styles/Input";

const SignUpTitle = styled.div`
  font-size: 1.3rem;
  max-width: calc(var(--s-step) * 3.3);
  text-align: center;
  margin-bottom: var(--su24);
  margin-left: auto;
  margin-right: auto;
`;
const Select = styled.select`
  margin: calc(var(--su4) / 2);
  margin-right: 0;
  margin-left: 0;
  padding: 0.3em 0.5em;
  border: 1px solid var(--bc-darker);
  border-radius: var(--br-sm);
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;
  width: 100%;
`;
const Button = styled.button`
  margin: calc(var(--su16) / 2);
  margin-right: 0;
  margin-left: 0;
  background-color: var(--_bu-bg);
  border: var(--_bu-baw) solid var(--_bu-bc);
  border-radius: var(--_bu-br);
  box-shadow: var(--_bu-bs);
  color: white;
  font-size: var(--_bu-fs);
  padding: var(--_bu-p);
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: normal;
  line-height: var(--lh-sm);
  position: relative;
  width: 100%;
  --_bu-baw: var(--su-static1);
  --_bu-bc: transparent;
  --_bu-br: var(--br-sm);
`;
const LinkedWord = styled.a`
  color: var(--theme-link-color);
  cursor: pointer;
`;
const GuideWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center;
  font-size: var(--fs-body1);
  padding: 16px;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`;
const Caption = styled.a`
  font-size: var(--fs-caption);
  --_li-fc: var(--theme-link-color);
  --_li-fc-hover: var(--theme-link-color-hover);
  --_li-fc-visited: var(--theme-link-color-visited);
  color: var(--_li-fc);
  cursor: pointer;
  text-decoration: none;
  user-select: auto;
`;

function SignUp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPage("Users"));
  }, []);

  return (
    <Container pageName="SignUp">
      <Wrapper pageName="SignUp">
        <SignUpTitle>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </SignUpTitle>
        <FormContainer>
          <Form>
            <Label>Display name</Label>
            <Input type="text"></Input>
          </Form>
          <Form>
            <Label>Email</Label>
            <Input type="email"></Input>
          </Form>
          <Form>
            <Label>Password</Label>
            <Input type="password"></Input>
          </Form>
          <Form>
            <Label>Confirm password</Label>
            <Input type="password"></Input>{" "}
            <Notice color="var(--fc-light)">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </Notice>
          </Form>
          <Form>
            <Label>Password Finding Question</Label>
            <Select>
              <option value="">--Please choose an option--</option>
              <option>질문1</option>
            </Select>
          </Form>
          <Form>
            <Label>Password Finding Answer</Label>
            <Input type="text" placeholder="type your answer"></Input>
            <Notice color="var(--fc-light)">
              This Question and Answer are used to find the password
            </Notice>
          </Form>
          <Button>Sign up</Button>
          <Notice color="var(--fc-light)" marginTop="var(--su16)">
            By clicking “Sign up”, you agree to our{" "}
            <LinkedWord
              href="https://stackoverflow.com/legal/terms-of-service/public"
              target="_blank">
              terms of service
            </LinkedWord>
            ,{" "}
            <LinkedWord
              href="https://stackoverflow.com/legal/privacy-policy"
              target="_blank">
              privacy policy
            </LinkedWord>{" "}
            and
            <LinkedWord
              href="https://stackoverflow.com/legal/cookie-policy"
              target="_blank">
              cookie policy
            </LinkedWord>
          </Notice>
        </FormContainer>
        <GuideWrapper>
          Already have an account?&nbsp;
          <Caption href="/login">Log in</Caption>
        </GuideWrapper>
      </Wrapper>
    </Container>
  );
}

export default SignUp;
