import { useEffect } from 'react'

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (
        handle: string,
        config: Record<string, string>,
        containerId?: string
      ) => void
    }
  }
}

const KO_FI_SCRIPT_ID = 'ko-fi-overlay-widget'
const KO_FI_CONTAINER_ID = 'kofi-support-widget'

export default function KofiSupportWidget() {
  useEffect(() => {
    const drawWidget = () => {
      if (!window.kofiWidgetOverlay) return

      const container = document.getElementById(KO_FI_CONTAINER_ID)
      if (!container || container.dataset.loaded === 'true') return

      window.kofiWidgetOverlay.draw(
        'rachelnocode',
        {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support Me',
          'floating-chat.donateButton.background-color': '#323842',
          'floating-chat.donateButton.text-color': '#fff',
        },
        KO_FI_CONTAINER_ID
      )

      container.dataset.loaded = 'true'
    }

    const existingScript = document.getElementById(KO_FI_SCRIPT_ID) as HTMLScriptElement | null

    if (existingScript) {
      drawWidget()
      return
    }

    const script = document.createElement('script')
    script.id = KO_FI_SCRIPT_ID
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.async = true
    script.onload = drawWidget
    document.body.appendChild(script)
  }, [])

  return <div id={KO_FI_CONTAINER_ID} />
}
