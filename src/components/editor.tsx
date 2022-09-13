

import { useCodeMirror, useFullScreen } from '../hooks'
import { Toolbar } from './toolbar'

interface EditorProps {
  placeholder: string
}

export default function Editor(props: EditorProps) {
  const { init, copy, format, clear, compress, fileExport, fileImport } = useCodeMirror()
  const { toggleFullscreen } = useFullScreen()

  const jsonExport = () => {
    const fileName = btoa(Date.now().toString())
    fileExport(fileName)
  }

  const handleImport = (e: any) => {
    fileImport(e.currentTarget.files[0])
  }

  return (
    <main class="flex-1 flex flex-col min-h-0">
      <Toolbar {...{copy, format, clear, compress, jsonExport, handleImport, toggleFullscreen }} />
      <section class="flex-1 min-h-0">
        <div
          ref={ el => init(el) } 
          class="
            w-full h-full outline-none bg-purple-100 dark:bg-gray-300
            text-gray-600
            resize-none
            json-editor
          "
        ></div>
      </section>
    </main>
  )
}