import dynamic from "next/dynamic";

const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    { ssr: false }
);

export default function CodeFunctionSummary({ functionList }) {
    return (
        <div className="overflow-x-scroll">
            <CodeEditor
                value={functionList}
                data-color-mode="dark"
                language="js"
                placeholder="Please enter JS code."
                padding={15}
                style={{
                    fontSize: 12,
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                }}
            />
        </div>
    )
}
