import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import siteMetadata from "../utils/siteMetaData";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content="your, keywords, here" />
        <meta name="author" content={siteMetadata.author} />
        <title>{siteMetadata.title}</title>
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.socialBanner} />
        <meta property="og:url" content={siteMetadata.siteUrl} />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
