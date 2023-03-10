import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { UserProvider as AtlasUserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";
import { WebsocketProvider } from "../context/WebsocketContext";
import "../styles/globals.css";
import { PostsProvider } from "../context/PostContext";
import { RouteProvider } from "../context/RouteContext";

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
                <WebsocketProvider>
                  <RouteProvider>
                    <Component {...pageProps} />
                  </RouteProvider>
                </WebsocketProvider>
              </UserProvider>
            </PostsProvider>
          </ThemeProvider>
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
