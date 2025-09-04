import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
// import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [

    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },

    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },

  ];

  return (
    <div className="z-50 justify-end flex pt-2 px-2">
      {Options.map((option, index) => (
        <Toggle
          className="hover:bg-white cursor-pointer"
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
          size='xs'
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}




// {
//   icon: <Heading1 className="size-4" />,
//   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
//   preesed: editor.isActive("heading", { level: 1 }),
// },
// {
//   icon: <Heading2 className="size-4" />,
//   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
//   preesed: editor.isActive("heading", { level: 2 }),
// },
// {
//   icon: <Heading3 className="size-4" />,
//   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//   preesed: editor.isActive("heading", { level: 3 }),
// },
// {
//   icon: <Strikethrough className="size-4" />,
//   onClick: () => editor.chain().focus().toggleStrike().run(),
//   preesed: editor.isActive("strike"),
// },
// {
//   icon: <List className="size-4" />,
//   onClick: () => editor.chain().focus().toggleBulletList().run(),
//   preesed: editor.isActive("bulletList"),
// },
// {
//   icon: <ListOrdered className="size-4" />,
//   onClick: () => editor.chain().focus().toggleOrderedList().run(),
//   preesed: editor.isActive("orderedList"),
// },
// {
//   icon: <Highlighter className="size-4" />,
//   onClick: () => editor.chain().focus().toggleHighlight().run(),
//   preesed: editor.isActive("highlight"),
// },