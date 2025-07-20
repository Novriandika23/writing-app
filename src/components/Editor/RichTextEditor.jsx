import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback, useEffect } from 'react'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  NumberedListIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'
import './RichTextEditor.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="editor-toolbar border-b border-slate-700/50 p-2 flex items-center space-x-1 bg-slate-800/30">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('bold') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <BoldIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('italic') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <ItalicIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('strike') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-600 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('bulletList') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <ListBulletIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('orderedList') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <NumberedListIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-slate-700/50 transition-all duration-200 ${
          editor.isActive('blockquote') ? 'active bg-purple-600/30 text-purple-300' : 'text-slate-300'
        }`}
      >
        <ChatBubbleLeftIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-600 mx-2"></div>

      <select
        onChange={(e) => {
          const level = parseInt(e.target.value)
          if (level === 0) {
            editor.chain().focus().setParagraph().run()
          } else {
            editor.chain().focus().toggleHeading({ level }).run()
          }
        }}
        value={
          editor.isActive('heading', { level: 1 }) ? 1 :
          editor.isActive('heading', { level: 2 }) ? 2 :
          editor.isActive('heading', { level: 3 }) ? 3 : 0
        }
        className="text-sm border border-slate-600 bg-slate-700/50 text-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value={0} className="bg-slate-800 text-slate-200">Paragraph</option>
        <option value={1} className="bg-slate-800 text-slate-200">Heading 1</option>
        <option value={2} className="bg-slate-800 text-slate-200">Heading 2</option>
        <option value={3} className="bg-slate-800 text-slate-200">Heading 3</option>
      </select>
    </div>
  )
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start writing your story...",
  className = ""
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const text = editor.getText()
      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
      const characterCount = text.length
      
      onChange({
        html,
        text,
        wordCount,
        characterCount
      })
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const handleKeyDown = useCallback((event) => {
    // Auto-save on Ctrl+S
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()
      // Trigger save callback if provided
      if (onChange) {
        const html = editor.getHTML()
        const text = editor.getText()
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        const characterCount = text.length
        
        onChange({
          html,
          text,
          wordCount,
          characterCount,
          shouldSave: true
        })
      }
    }
  }, [editor, onChange])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (!editor) {
    return null
  }

  return (
    <div className={`border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm bg-gradient-to-br from-slate-800/40 to-slate-900/40 ${className}`}>
      <MenuBar editor={editor} />
      <div className="relative">
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none prose-invert prose-headings:text-slate-100 prose-p:text-slate-200 prose-strong:text-purple-300 prose-em:text-purple-300 prose-blockquote:text-slate-300 prose-blockquote:border-purple-500"
          style={{
            minHeight: '400px',
            maxWidth: 'none',
            backgroundColor: 'transparent'
          }}
        />
      </div>
      <div className="border-t border-slate-700/50 px-4 py-2 bg-gradient-to-r from-slate-800/40 to-slate-700/40 text-sm text-slate-400 flex justify-between items-center">
        <span className="flex items-center space-x-2">
          <span className="text-purple-400 font-medium">
            {editor.storage.characterCount.words()}
          </span>
          <span>words,</span>
          <span className="text-purple-400 font-medium">
            {editor.storage.characterCount.characters()}
          </span>
          <span>characters</span>
        </span>
        <span className="text-xs text-slate-500 hidden sm:block">
          Press Ctrl+S to save
        </span>
      </div>
    </div>
  )
}
