import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent, ReactNode } from 'react'
import { Send } from 'lucide-react'
import { useSendMessageMutation } from '@/services/assistantApi'
import { Dialog, ExternalLink } from '@/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addMessage, clearMessages } from './assistantSlice'

const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Good morning! ☀️'
  }

  if (hour < 18) {
    return 'Good afternoon! 🌤️'
  }

  return 'Good evening! 🌙'
}

const BOLD_PATTERN = /\*\*[^*]+\*\*/g
const LINK_PATTERN = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|((?:https?:\/\/|mailto:)[^\s]+)/g
const MESSAGE_TOKEN_PATTERN = new RegExp(`(${BOLD_PATTERN.source}|${LINK_PATTERN.source})`, 'g')
const renderMessageContent = (content: string): ReactNode[] => {
  const renderedContent: ReactNode[] = []
  let lastIndex = 0

  for (const match of content.matchAll(MESSAGE_TOKEN_PATTERN)) {
    const matchIndex = match.index ?? 0
    const matchedText = match[0]

    if (matchIndex > lastIndex) {
      renderedContent.push(content.slice(lastIndex, matchIndex))
    }

    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      renderedContent.push(
        <strong key={`${matchedText}-${matchIndex}`}>{matchedText.slice(2, -2)}</strong>
      )
    } else {
      const linkText = match[1] ?? match[3]
      const linkUrl = match[2] ?? match[3]

      renderedContent.push(
        <ExternalLink href={linkUrl} text={linkText} key={`${linkUrl}-${matchIndex}`} />
      )
    }

    lastIndex = matchIndex + matchedText.length
  }

  if (lastIndex < content.length) {
    renderedContent.push(content.slice(lastIndex))
  }

  return renderedContent
}

export const Assistant = () => {
  const dispatch = useAppDispatch()
	const [message, setMessage] = useState('')
  const messages = useAppSelector((state) => state.assistant.messages)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [sendMessage, { isLoading }] = useSendMessageMutation()
  const [isSlowLoading, setIsSlowLoading] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading) {
      setIsSlowLoading(false)
      return
    }

    const slowLoadingTimer = window.setTimeout(() => {
      setIsSlowLoading(true)
    }, 5000)

    return () => window.clearTimeout(slowLoadingTimer)
  }, [isLoading])

  useEffect(() => {
    const chatContainer = chatContainerRef.current

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages.length, isLoading, errorMessage])

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const trimmedMessage = message.trim()

		if (!trimmedMessage || isLoading) {
			return
		}

		setMessage('')
		setErrorMessage(null)
    dispatch(addMessage({ role: 'user', content: trimmedMessage }))

		try {
			const response = await sendMessage({ message: trimmedMessage }).unwrap()
      dispatch(addMessage({ role: 'assistant', content: response.answer }))
		} catch {
			setErrorMessage('The assistant could not respond. Please try again.')
		}
	}

  const handleClearMessages = () => {
    dispatch(clearMessages())
    setErrorMessage(null)
  }

  const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

	return (
		<div className="flex flex-col justify-center align-middle w-full h-full">
      <header className='text-center pb-2'>
        <h1>{("AI Assistant").toUpperCase()}</h1>
        <div className="mini-menu">
          <button disabled={messages.length == 0} onClick={handleClearMessages}>
            Clear Messages
          </button>
          |
          <button onClick={() => dialogRef.current?.showModal()}>About</button>
        </div>
      </header>
      <div className="chat-box-container">
        <div
          className="chat-box"
          aria-live="polite"
          ref={chatContainerRef}
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center opacity-50">
              <p className="self-center text-center">{getGreeting()}</p>
            </div>
          )}
          {messages.map((chatMessage) => (
            <div
              className={`message-container flex ${chatMessage.role === 'user' ? 'justify-end' : 'justify-start'} text-left`}
              key={chatMessage.id}
            >
              <p className={`message ${chatMessage.role === 'user' ? 'bg-black/20' : 'bg-white/20'}`}>
                {renderMessageContent(chatMessage.content)}
              </p>
            </div>
          ))}
          {isLoading && (
            <p className="text-left opacity-60">
              {isSlowLoading
                ? 'Cold starting API...'
                : 'Thinking...'}
            </p>
          )}
          {errorMessage && <p className="text-center text-red-700">{errorMessage}</p>}
        </div>

        <form className="flex items-end gap-2" onSubmit={handleSubmit}>
          <textarea
            className="min-h-1 flex-1 resize-none rounded-xl bg-white/25 px-3 py-2 outline-none placeholder:opacity-50"
            id="assistant-message"
      			onKeyDown={handleMessageKeyDown}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask questions about Edmark..."
            rows={1}
            value={message}
          />
          <button
            aria-label="Send message"
            className="rounded-full bg-black/15 p-3 disabled:opacity-40 cursor-pointer"
            disabled={isLoading || !message.trim()}
            title="Send message"
            type="submit"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      <Dialog dialogRef={dialogRef}>
        <div className='text-center'>
          <h4 className='pb-2'>Created with</h4>
          <ul className='flex flex-wrap gap-1 justify-center'>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://groq.com/' text='Groq' />
            </li>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://www.python.org/' text='Python' />
            </li>
          </ul>
        </div>
      </Dialog>
		</div>
	)
}