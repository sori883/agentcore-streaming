import { createRoute } from 'honox/factory'
import { stream } from 'hono/streaming'

export const POST = createRoute(async (c) => {
  const body = await c.req.formData()
  const prompt = body.get('prompt')
  const res = await fetch(
    'https://APIGatewayID.execute-api.ap-northeast-1.amazonaws.com/v1/invoke',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    }
  )
  c.header('Content-Encoding', 'Identity')
  return stream(c, async (stream) => {
    await stream.pipe(res.body!)
  })
})
