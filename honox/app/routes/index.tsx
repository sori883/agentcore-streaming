import { createRoute } from 'honox/factory'
import Chat from '../islands/chat'

export default createRoute((c) => {
  return c.render(
    <div class="py-8">
      <title>Chat</title>
      <h1 class="text-3xl font-bold text-center mb-4">Chat</h1>
      <Chat />
    </div>
  )
})
