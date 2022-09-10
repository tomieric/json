import { createEffect, createMemo, createSignal } from 'solid-js'
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { Compartment, EditorState, Extension, StateEffect } from '@codemirror/state'
import { linter } from '@codemirror/lint'
import { json as jsonPlugin, jsonParseLinter } from '@codemirror/lang-json'
import { dracula, noctisLilac } from 'thememirror'
import FileSaver from 'file-saver'
import confetti from 'canvas-confetti';

const jsonFormat = (json: string, tabSize = 4) => {
  return JSON.stringify(json, null, tabSize)
}

const createEditorCompartment = (view: EditorView) => {
  const compartment = new Compartment()
  const run = (extension: Extension) => {
    compartment.get(view.state)
      ? view.dispatch({ effects: compartment.reconfigure(extension) })
      : view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension))})
  }

  return { compartment, run }
}

export function useCodeMirror(theme: 'dracula' | 'noctisLilac' = 'dracula') {
  let editorView: EditorView
  const [curTheme, setCurTheme] = createSignal(theme)
  const [editorIsReady, setEditorIsReady] = createSignal(false)
  
  const extensions = createMemo(() => {
    return [
      basicSetup,
      curTheme() === 'dracula' ? dracula : noctisLilac,
      jsonPlugin(),
      linter(jsonParseLinter()),
    ]
  })

  function init(editorRef: HTMLElement) {
    if (!editorRef || editorIsReady()) {
      return
    }

    const state = EditorState.create({
      doc: '',
      extensions: extensions()
    })

    editorView = new EditorView({
      parent: editorRef,
      state
    })

    setEditorIsReady(true)
  }

  function getCode () {
    return editorView.state.doc.toString()
  }

  function setCode (code: string) {
    if (!editorView) {
      return
    }

    const prevCode = getCode()
    editorView.dispatch({
      changes: {
        from: 0,
        to: prevCode.length,
        insert: code
      }
    })
  }

  function copy() {
    const code = getCode()
    try {
      navigator.clipboard.writeText(code)
      confetti()
    } catch (e) {

    }
  }

  function fileExport(name: string) {
    const code = getCode()
    const blob = new Blob([code], { type: '' })
    FileSaver(blob, `${name}.json`)
    confetti()
  }

  async function fileImport(file: File) {
    const response = await new Response(file).json()
    setCode(jsonFormat(response))
    confetti()
  }

  function compress() {
    const code = getCode()
    setCode(JSON.stringify(JSON.parse(code)))
    confetti()
  }

  function format() {
    const code = getCode()
    setCode(jsonFormat(JSON.parse(code)))
    confetti()
  }

  function clear() {
    setCode('')
  }

  function themeSwitch (theme: 'dracula' | 'noctisLilac') {
    setCurTheme(theme)
    
    const { run } = createEditorCompartment(editorView!)
    run(extensions())
  }

  createEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)')) {
      themeSwitch('dracula')
    } else if (window.matchMedia('(prefers-color-scheme: light)')) {
      themeSwitch('noctisLilac')
    }
  })

  return {
    init,
    copy,
    getCode,
    setCode,
    format,
    clear,
    compress,
    fileExport,
    fileImport,
    themeSwitch,
  }
}