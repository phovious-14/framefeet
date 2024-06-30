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
  title:"hiell",
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'A245EBF6-D0B1-441C-B316-22606F5562CD' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/:id/:wallet', async (c) => {

    
  const { buttonValue, inputText, status, frameData } = c

  const data = c.req.raw.url.split("/")
  let id = data[data.length-2]

  const crypto = new NextCrypto('qwerty');
  let wallet = await crypto.decrypt(data[data.length-1])

  if(wallet != frameData.address) {
    return c.res({
      image: <Image src={product[0].image} alt="" height="100%" objectFit='cover' />
    })
  }

  const product = store.filter(item => item.id == id)

  const msg = ` hello ppl, just bought brand new 🤩 ${product[0].name} worth $${frameData.address} USDC`

  return c.res({
    image: (<div style={{display:"flex", justifyContent:"space-between", alignItems:"center", 
    backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',}}>
      <Image src={product[0].image} alt="" height="100%" objectFit='cover' />
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

app.frame('/desc/:id', (c) => {
  const { buttonValue, inputText, status, frameData } = c

  const data = c.req.raw.url.split("/")
  let id = data[data.length-1]
  const product = store.filter(item => item.id == id)
  console.log(product[0]);

  const fruit = inputText || buttonValue
  return c.res({
    action: '/submit',
    image: (
      <div
  style={{
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
    fontSize: 60,
    letterSpacing: -2,
    fontWeight: 700,
    textAlign: 'center',
  }}
  >
  <div
    style={{
      backgroundImage: 'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
      backgroundClip: 'text',
      '-webkit-background-clip': 'text',
      color: 'transparent',
    }}
  >
    Develop
  </div>
  <div
    style={{
      backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
      backgroundClip: 'text',
      '-webkit-background-clip': 'text',
      color: 'transparent',
    }}
  >
    Preview
  </div>
  <div
    style={{
      backgroundImage: 'linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))',
      backgroundClip: 'text',
      '-webkit-background-clip': 'text',
      color: 'transparent',
    }}
  >
   {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
  </div>
</div>

          
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button.Link href="https://google.com">Apples</Button.Link>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/submit', (c) => { 
  const { buttonValue, frameData } = c
  
  return c.res({
    image
: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Selected: {buttonValue}
      </div>
    )
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
