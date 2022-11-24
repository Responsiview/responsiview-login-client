import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { getRedirectResult } from "firebase/auth";

import Logo from "./assets/images/responsiview-logo.png";
import { provider, auth, googleSignIn } from "./service/firebase";

import { COLOR } from "./config/constants";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const redirectResult = await getRedirectResult(auth);

        setIsLoggedIn(redirectResult);

        if (redirectResult) {
          const data = JSON.stringify({
            result: "success",
            userEmail: redirectResult.user.email,
          });

          window.location.replace(`responsiview://${data}`);
        } else {
          googleSignIn(auth, provider);
        }
      } catch (error) {
        const data = JSON.stringify({
          result: "fail",
          code: error.code,
          message: error.message,
        });

        window.location.replace(`responsiview://${data}`);
      }
    })();
  }, []);

  return (
    <>
      <Global />
      <Container>
        {isLoggedIn && (
          <>
            <Image src={Logo}></Image>
            <Text>Responsiview 앱으로 이동 중입니다.</Text>
          </>
        )}
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
