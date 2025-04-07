import dynamic from "next/dynamic";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/cjs/prism"),
  { ssr: false }
);
import onelight from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";
import onedark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import useDarkMode from "./useDarkMode";

export const CodeAnimation = ({ code, language = "solidity" }) => {
  const [colorTheme] = useDarkMode();

  let themes = colorTheme === "dark" ? onelight : onedark;

  let snippets = code;
  const result = snippets
    .replace(/&nbsp;/g, " ")
    .replace(/<br>/g, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<\/?p>/g, "");

  return (
    <>
      <SyntaxHighlighter
        language={language}
        className="border border-blackn-400 border-dotted rounded-lg code-snippet"
        style={themes}
        showLineNumbers={true}
        wrapLines={true}
      >
        {result}
      </SyntaxHighlighter>
    </>
  );
};
