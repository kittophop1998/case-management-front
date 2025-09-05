import { Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import AlignCenter from '@/public/icons/editor/AlignJustify.svg'
import AlignLeft from '@/public/icons/editor/AlignLeft.svg'
import AlignRight from '@/public/icons/editor/AlignRight.svg'
import Bold from '@/public/icons/editor/Bold.svg'
import Clip from '@/public/icons/editor/Clip.svg'
import Link from '@/public/icons/editor/Link.svg'
import Underline from '@/public/icons/editor/Underline.svg'
import Italic from '@/public/icons/editor/Italic.svg'

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
      icon: <Underline className="size-4" />,
      // onClick: () => editor.chain().focus().toggleUnderline().run(),
      // onClick: () => editor.chain().focus().toggle
      onClick: () => { },
      pressed: editor.isActive("underline"),
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
    {
      icon: <Link className="size-4" />,
      onClick: () => {
        const url = window.prompt("Enter a URL:");
        if (url) {
          // editor.chain().focus().setLink({ href: url }).run();
        }
      },
      // pressed: editor.isActive("link"),
      pressed: false, // ยังไม่รองรับ
    },
    {
      icon: <Clip className="size-3" />,
      onClick: () => { },
      pressed: false, // ยังไม่รองรับ

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