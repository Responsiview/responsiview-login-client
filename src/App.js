import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { getRedirectResult } from "firebase/auth";

import Logo from "./assets/images/responsiview-logo.png";
import { provider, auth, googleSignIn } from "./service/firebase";

import { COLOR } from "./config/constants";

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log(result);
          window.location.replace(
            `responsiview://result=success/userEmail=${result.user.email}`,
          );
        } else {
          googleSignIn(auth, provider);
        }
      } catch (error) {
        window.location.replace(
          `responsiview://result=fail/code=${error.code}/message=${error.message}`,
        );
      }
    })();
  }, []);

  return (
    <>
      <Global />
      <Container>
        <Image src={Logo}></Image>
        <Text>Responsiview 앱으로 이동 중입니다.</Text>
      </Container>
    </>
  );
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    user-select: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;
