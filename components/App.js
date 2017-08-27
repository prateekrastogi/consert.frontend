import stylesheet from 'styles/semantic.min.css'

export default ({children}) => (
  <main>
    <div>
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />
      {children}</div>
  </main>
)
