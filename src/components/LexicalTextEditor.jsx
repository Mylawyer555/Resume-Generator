import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { $getRoot } from "lexical";
import React from "react";


const theme = {}; // Add custom styles if needed

export default function LexicalEditor({ value, onChange }) {
  const initialConfig = {
    namespace: "CoverLetterEditor",
    theme,
    onError: (error) => console.error("Lexical Error:", error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded p-2 min-h-[150px] bg-white">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[120px] w-full p-2 text-sm" />
          }
          placeholder={
            <div className="text-gray-400 p-2">Start writing your letter...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const plainText = $getRoot().getTextContent();
              onChange(plainText);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
