import { AiTwotoneFileZip, AiFillFormatPainter, AiOutlineFullscreen, AiOutlineClear } from 'solid-icons/ai'
import { RiDocumentFileCopy2Fill } from 'solid-icons/ri'
import { TbDatabaseExport, TbDatabaseImport } from 'solid-icons/tb'

export function Toolbar (props: any) {
  return (
    <header class="bg-purple-100 dark:bg-slate-800 pl-4 pr-4">
        <div class="flex items-center gap-4 border-purple-200 pt-2 pb-2 pl-4 pr-4 border-b text-purple-500 dark:border-b-slate-900">
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="压缩">
            <AiTwotoneFileZip size={24} color="currentColor" onClick={ props.compress } />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="格式化">
            <AiFillFormatPainter size={24} color="currentColor" onClick={ props.format } />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="复制">
            <RiDocumentFileCopy2Fill size={24} color="currentColor" onClick={ props.copy } />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer relative overflow-hidden" title="导入">
            <input type="file" accept="application/JSON" onChange={ props.handleImport } class="absolute top-0 left-0 opacity-0" />
            <TbDatabaseImport size={24} color="currentColor" />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="导出">
            <TbDatabaseExport size={24} color="currentColor" onClick={ props.jsonExport } />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="全屏">
            <AiOutlineFullscreen size={24} color="currentColor" onClick={ props.toggleFullscreen } />
          </span>
          <span class="text-purple-500 hover:text-purple-700 cursor-pointer" title="清空">
            <AiOutlineClear size={24} color="currentColor" onClick={ props.clear } />
          </span>
        </div>
      </header>
  )
}