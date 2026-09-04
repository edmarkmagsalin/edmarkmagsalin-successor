import { useEffect, useState } from 'react'
import type { FormEvent, KeyboardEvent, ReactNode } from 'react'
import { Send } from 'lucide-react'
import { useSendMessageMutation } from '@/services/assistantApi'
import { ExternalLink } from '@/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addMessage, clearMessages } from './assistantSlice'

const LINK_PATTERN = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|((?:https?:\/\/|mailto:)[^\s]+)/g

const renderMessageContent = (content: string): ReactNode[] => {
  const renderedContent: ReactNode[] = []
  let lastIndex = 0

  for (const match of content.matchAll(LINK_PATTERN)) {
    const matchIndex = match.index ?? 0
    const linkText = match[1] ?? match[3]
    const linkUrl = match[2] ?? match[3]

    if (matchIndex > lastIndex) {
      renderedContent.push(content.slice(lastIndex, matchIndex))
    }

    renderedContent.push(
      <ExternalLink href={linkUrl} text={linkText} key={`${linkUrl}-${matchIndex}`} />
    )
    lastIndex = matchIndex + match[0].length
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
      <div className='text-center pb-2'>
        <h1>{("AI Assistant").toUpperCase()}</h1>
        <button aria-label="Clear messages" onClick={handleClearMessages} title="Clear messages" type="button">
          Clear messages
        </button>
      </div>
      
      <div className="flex flex-col justify-center w-full h-full mb-10 px-4">
        <div className="flex-1 max-h-50 space-y-3 px-4 pb-4 overflow-y-scroll" aria-live="polite">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center opacity-50">
              <small className="self-center text-center opacity-60">Ask my AI assistant about me.</small>
            </div>
          )}
          {messages.map((chatMessage) => (
            <div
              className={`flex ${chatMessage.role === 'user' ? 'justify-end' : 'justify-start'} text-left`}
              key={chatMessage.id}
            >
              <p className={`max-w-[85%] rounded-xl px-3 py-2 ${chatMessage.role === 'user' ? 'bg-black/20' : 'bg-white/20'}`}>
                {renderMessageContent(chatMessage.content)}
              </p>
            </div>
          ))}
          {isLoading && (
            <p className="text-left opacity-60">
              {isSlowLoading
                ? 'Waking up freemium API...'
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
            placeholder="Ask a question me..."
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
		</div>
	)
}