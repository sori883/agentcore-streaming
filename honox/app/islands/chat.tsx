import { useState } from 'hono/jsx'

export default function Chat() {
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setResponse('')

    const formData = new FormData(e.target as HTMLFormElement)
    const res = await fetch('/api/invoke', {
      method: 'POST',
      body: formData,
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let text = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value, { stream: true })
      setResponse(text)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
        />
        <button type="submit">送信</button>
      </form>
      <pre>{response}</pre>
    </div>
  )
}
