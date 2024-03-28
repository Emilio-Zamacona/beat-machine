import Grid from './components/Grid/Grid'

function App() {
  const sounds =[
    'bongo','clack','hh','kick','kick2','pot','rim','snap'
  ]
  const beats = 16

  const time = 500

  return (
    <>
      <Grid sounds={sounds} beats={beats}/>
    </>
  )
}

export default App
