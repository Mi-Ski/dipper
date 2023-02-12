import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { UserProvider as AtlasUserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import { PostsProvider } from "../context/PostContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dipper</title>
      </Head>
      <UserProvider>
        <AtlasUserProvider>
          <ThemeProvider>
            <PostsProvider>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </PostsProvider>
          </ThemeProvider>
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
