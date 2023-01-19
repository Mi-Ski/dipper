import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { UserProvider as AtlasUserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SocialButterfly - MongoDB Atlas Data API Demo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
		<ThemeProvider>
      <UserProvider>
          <Component {...pageProps} />
      </UserProvider>
			</ThemeProvider>
    </>
  );
}
