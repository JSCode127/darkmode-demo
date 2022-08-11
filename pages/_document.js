import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head></Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: themeInitializerScript,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
//関数はString型でないとだめ
const themeInitializerScript = `(function() {
  ${setInitialColorMode.toString()}
  setInitialColorMode();
})()`;

function setInitialColorMode() {
  //最初のpreferenceを確認して、darkかlightの文字列を返す関数
  function getInitialColorMode() {
    //ストレージからthemeを取得する
    const persistedPreferenceMode = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedPreferenceMode === "string";

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    //現在のpreference状態を確認する
    const preference = window.matchMedia("(prefers-color-scheme : dark)");
    const hasMediaQueryPreference = typeof preference.matches === "boolean";

    if (hasMediaQueryPreference) {
      return preference.matches ? "dark" : "light";
    }

    return "light";
  }
  const currentColorMode = getInitialColorMode();
  console.log(currentColorMode);
  if (currentColorMode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

export default MyDocument;
