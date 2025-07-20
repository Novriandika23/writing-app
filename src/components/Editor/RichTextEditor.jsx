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
    <div className="gothic-toolbar border-b-2 border-glitchRed/20 p-2 lg:p-4 flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-darkBg to-darkBg-soft overflow-x-auto">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('bold')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <BoldIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('italic')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <ItalicIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('strike')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <UnderlineIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>

      <div className="w-px h-4 lg:h-6 bg-glitchRed/30 mx-1 lg:mx-3 flex-shrink-0"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('bulletList')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <ListBulletIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('orderedList')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <NumberedListIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 lg:p-3 rounded-lg hover:bg-glitchRed/10 transition-all duration-300 border flex-shrink-0 ${
          editor.isActive('blockquote')
            ? 'active bg-glitchRed/20 text-glitchRed border-glitchRed/50'
            : 'text-slate-400 border-transparent hover:border-glitchRed/30'
        }`}
      >
        <ChatBubbleLeftIcon className="w-3 h-3 lg:w-4 lg:h-4" />
      </button>

      <div className="w-px h-4 lg:h-6 bg-glitchRed/30 mx-1 lg:mx-3 flex-shrink-0"></div>

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
        className="text-xs lg:text-sm border border-glitchRed/30 bg-darkBg text-slate-300 rounded-lg px-2 lg:px-3 py-1 lg:py-2 focus:outline-none focus:ring-2 focus:ring-glitchRed/50 focus:border-glitchRed ui-text min-w-0 flex-shrink-0"
      >
        <option value={0} className="bg-darkBg text-slate-300">Paragraph</option>
        <option value={1} className="bg-darkBg text-slate-300">Chapter</option>
        <option value={2} className="bg-darkBg text-slate-300">Section</option>
        <option value={3} className="bg-darkBg text-slate-300">Sub</option>
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
    <div className={`gothic-editor-container overflow-hidden ${className}`}>
      <MenuBar editor={editor} />
      <div className="relative bg-gradient-to-br from-darkBg/30 to-darkBg-soft/30 backdrop-blur-sm">
        <EditorContent
          editor={editor}
          className="gothic-prose prose prose-lg max-w-none focus:outline-none"
          style={{
            minHeight: '500px',
            backgroundColor: 'transparent',
            padding: '2rem',
            maxWidth: '100%'
          }}
        />
      </div>
      <div className="border-t-2 border-glitchRed/20 px-6 py-3 bg-gradient-to-r from-darkBg to-darkBg-soft text-sm text-slate-400 flex justify-between items-center">
        <span className="flex items-center space-x-3">
          <span className="text-glitchRed font-medium ui-text">
            {editor.storage.characterCount.words()}
          </span>
          <span className="ui-text">words,</span>
          <span className="text-glitchRed font-medium ui-text">
            {editor.storage.characterCount.characters()}
          </span>
          <span className="ui-text">characters</span>
        </span>
        <span className="text-xs text-slate-500 hidden sm:block ui-text">
          Press Ctrl+S to save
        </span>
      </div>
    </div>
  )
}
