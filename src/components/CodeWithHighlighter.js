import dynamic from 'next/dynamic';
import React from 'react'
import onelight from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light';
import onedark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';
import useDarkMode from './useDarkMode';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter/dist/cjs/prism'), { ssr: false });

function NewlineText(props) {
    const [colorTheme] = useDarkMode();
    let themes = colorTheme === 'dark' ? onelight : onedark
    const text = props.text;
    return (
        <SyntaxHighlighter
            language={'solidity'}
            className="my-0 code-snippet"
            style={themes}
            showLineNumbers={false}
            wrapLines={true}
        >
            {text}
        </SyntaxHighlighter>
    );
}

export const CodeWithHighlighter = ({ code }) => {
    return (
        <div className='w-full'>
            <NewlineText text={code} />
        </div>
    )
}
