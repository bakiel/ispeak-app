'use client'
import { useState, useRef, useEffect } from 'react'

export default function RichTextEditor({ value, onChange, placeholder }) {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const editorRef = useRef(null)
  const [selectedText, setSelectedText] = useState('')
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [showToolbarTooltip, setShowToolbarTooltip] = useState(null)

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current.focus()
    handleContentChange()
  }

  const handleContentChange = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleLinkClick = () => {
    const selection = window.getSelection()
    setSelectedText(selection.toString())
    setShowLinkDialog(true)
  }

  const insertLink = () => {
    if (linkUrl) {
      if (selectedText) {
        handleFormat('createLink', linkUrl)
      } else {
        const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkUrl}</a>`
        document.execCommand('insertHTML', false, link)
        handleContentChange()
      }
    }
    setShowLinkDialog(false)
    setLinkUrl('')
    setSelectedText('')
  }

  const handleImageClick = () => {
    setShowImageDialog(true)
  }

  const insertImage = () => {
    if (imageUrl) {
      const img = `<img src="${imageUrl}" alt="${imageAlt || 'Image'}" style="max-width: 100%; height: auto;" />`
      document.execCommand('insertHTML', false, img)
      handleContentChange()
    }
    setShowImageDialog(false)
    setImageUrl('')
    setImageAlt('')
  }

  const handleKeyDown = (e) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          handleFormat('bold')
          break
        case 'i':
          e.preventDefault()
          handleFormat('italic')
          break
        case 'u':
          e.preventDefault()
          handleFormat('underline')
          break
        case 'k':
          e.preventDefault()
          handleLinkClick()
          break
      }
    }
  }

  const toolbar = [
    { icon: 'fas fa-bold', command: 'bold', title: 'Bold (Ctrl+B)', ariaLabel: 'Bold text' },
    { icon: 'fas fa-italic', command: 'italic', title: 'Italic (Ctrl+I)', ariaLabel: 'Italic text' },
    { icon: 'fas fa-underline', command: 'underline', title: 'Underline (Ctrl+U)', ariaLabel: 'Underline text' },
    { icon: 'fas fa-strikethrough', command: 'strikeThrough', title: 'Strikethrough', ariaLabel: 'Strikethrough text' },
    { divider: true },
    { icon: 'fas fa-heading', command: 'formatBlock', value: 'h2', title: 'Heading 2', ariaLabel: 'Format as heading 2' },
    { icon: 'fas fa-paragraph', command: 'formatBlock', value: 'p', title: 'Paragraph', ariaLabel: 'Format as paragraph' },
    { divider: true },
    { icon: 'fas fa-list-ul', command: 'insertUnorderedList', title: 'Bullet List', ariaLabel: 'Insert bullet list' },
    { icon: 'fas fa-list-ol', command: 'insertOrderedList', title: 'Numbered List', ariaLabel: 'Insert numbered list' },
    { divider: true },
    { icon: 'fas fa-link', command: 'link', title: 'Insert Link (Ctrl+K)', onClick: handleLinkClick, ariaLabel: 'Insert hyperlink' },
    { icon: 'fas fa-image', command: 'image', title: 'Insert Image', onClick: handleImageClick, ariaLabel: 'Insert image' },
    { icon: 'fas fa-quote-left', command: 'formatBlock', value: 'blockquote', title: 'Quote', ariaLabel: 'Format as quote' },
    { icon: 'fas fa-code', command: 'formatBlock', value: 'pre', title: 'Code Block', ariaLabel: 'Format as code block' },
    { divider: true },
    { icon: 'fas fa-align-left', command: 'justifyLeft', title: 'Align Left', ariaLabel: 'Align text left' },
    { icon: 'fas fa-align-center', command: 'justifyCenter', title: 'Align Center', ariaLabel: 'Align text center' },
    { icon: 'fas fa-align-right', command: 'justifyRight', title: 'Align Right', ariaLabel: 'Align text right' },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div 
        className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap items-center gap-1" 
        role="toolbar"
        aria-label="Text formatting toolbar">
        {toolbar.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />
          }
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                } else {
                  handleFormat(item.command, item.value)
                }
              }}
              className="p-2 hover:bg-gray-200 rounded transition-colors relative"
              title={item.title}
              aria-label={item.ariaLabel}
              onMouseEnter={() => setShowToolbarTooltip(index)}
              onMouseLeave={() => setShowToolbarTooltip(null)}
            >
              <i className={`${item.icon} text-gray-700`} aria-hidden="true"></i>
              {showToolbarTooltip === index && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap">
                  {item.title}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={handleContentChange}
        onBlur={handleContentChange}
        onKeyDown={handleKeyDown}
        role="textbox"
        aria-multiline="true"
        aria-label="Blog post content editor"
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="link-dialog-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 id="link-dialog-title" className="text-lg font-semibold mb-4">Insert Link</h3>
            <label htmlFor="link-url" className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              id="link-url"
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              autoFocus
              aria-required="true"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowLinkDialog(false)
                  setLinkUrl('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="image-dialog-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 id="image-dialog-title" className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="image-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  id="image-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  autoFocus
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="image-alt" className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (for accessibility)
                </label>
                <input
                  id="image-alt"
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  aria-describedby="alt-text-help"
                />
                <p id="alt-text-help" className="text-sm text-gray-500 mt-1">
                  Alt text helps screen readers describe images to visually impaired users
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowImageDialog(false)
                  setImageUrl('')
                  setImageAlt('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertImage}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}