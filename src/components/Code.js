import dynamic from "next/dynamic";
import React from "react";
import onelight from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";
import onedark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import useDarkMode from "./useDarkMode";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/cjs/prism"),
  { ssr: false }
);

export const Code = ({ code, language }) => {
  const [colorTheme] = useDarkMode();
  let themes = colorTheme === "dark" ? onelight : onedark;
  return (
    <SyntaxHighlighter
      language={language}
      className="border border-dotted rounded-lg border-blackn-800 dark:border-gray-700 code-snippet"
      style={themes}
      showLineNumbers={true}
      wrapLines={true}
    >
      {code}
    </SyntaxHighlighter>
  );
};
