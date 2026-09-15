import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

/**
 * No drag previews of pictures, anywhere.
 *
 * Every image and video is already `draggable={false}`, but a photograph inside
 * a link is dragged *as the link*, and the browser still paints the picture as
 * the preview. Cancelling the drag when it starts on, or on something holding,
 * a picture covers every case — current and future — in one place. Text and
 * links without pictures still drag normally.
 */
document.addEventListener('dragstart', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  if (target.closest('img, picture, video') || target.querySelector('img, picture, video')) {
    event.preventDefault()
  }
})

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found in index.html')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
