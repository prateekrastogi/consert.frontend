import stylesheet from 'styles/semantic.min.css'

export default ({children}) => (
  <main>
    <div>
      <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/components/icon.min.css' />
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />
      {children}</div>
  </main>
)
