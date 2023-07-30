import React, { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TextArea({ value, onChange, placeholder = "Description" }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "flex flex-col w-full h-28 p-2 resize-none scroll overflow-x-hidden overflow-y-scroll focus:outline-none",
      },
    },
  });

  //on value change update editor
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div
      className={`w-full h-32 flex relative px-3 py-2 leading-tight border rounded shadow border-stone-600 text-stone-100 bg-stone-700 focus:outline-none focus:shadow-outline`}
    >
      <span className="absolute text-xs -top-2.5 text-stone-300 left-1">
        {placeholder}
      </span>
      <EditorContent className="w-full" editor={editor} />
    </div>
  );
}

export default TextArea;
