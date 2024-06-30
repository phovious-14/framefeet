/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import store from '../../../store';
import { createSystem } from 'frog/ui'
import NextCrypto from 'next-crypto';

const { Image } = createSystem()

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: "FrameFeet",
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'A245EBF6-D0B1-441C-B316-22606F5562CD' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/promote/:id', (c) => {
  const { buttonValue, inputText, status } = c

  const id = c.req.param("id")
  const url = `https://framefeet.vercel.app/product/${id}`
  const product = store.filter(item => item.id == id)
  return c.res({
    image: <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)', fontSize: 60
    }}
    >
      <Image src={product[0]?.image} alt="" height="100%" objectFit='cover' />
      Brand new Sneaker <br />launched! 🔥
    </div>,
    intents: [
      <Button.Link href={url}>But now</Button.Link>
    ]
  })
})

app.frame('/share/:id', async (c) => {

  const { buttonValue, inputText, status, frameData } = c

  let id = c.req.param("id")

  const url = `https://api.commerce.coinbase.com/charges/${id}`;
  const payload = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CC-Api-Key': "73d2658d-6e70-4500-b555-3274c499f73f",//API key from Commerce
    }
  };

  const response = await fetch(url, payload);
  if (!response.ok) {
    throw new Error(`HTTP error Status: ${response.status}`);
  }
  const res = await response.json()
  console.log(res.data.metadata.cust_name);

  const product = store.filter(item => item.id == res?.data?.metadata?.product_id)

  const msg = `hello ppl, ${frameData?.address} ${res?.data?.metadata?.cust_name} just bought brand new 🤩 ${product[0]?.name}`

  return c.res({
    image: (<div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
    }}>
      <Image src={product[0]?.image} alt="" height="100%" objectFit='cover' />
      <div style={{
        backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        color: 'transparent',
        fontSize: 60
      }}>{msg}</div>
    </div>)
  })
})



devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
