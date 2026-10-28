import React, { useState } from 'react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import {
  CPP_SOURCE_CODE,
  MAKEFILE_CONTENT,
  STANDALONE_HTML_CONTENT,
  STANDALONE_JS_CONTENT,
  STANDALONE_CSS_CONTENT,
  README_MD_CONTENT
} from '../data/cppEngineCode';
import { sound } from '../utils/soundEngine';
import {
  Download,
  Copy,
  Check,
  X,
  FileCode,
  Github,
  Terminal,
  FolderArchive
} from 'lucide-react';

interface GithubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FileKey = 'cpp' | 'html' | 'js' | 'css' | 'makefile' | 'readme';

export const GithubExportModal: React.FC<GithubExportModalProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<FileKey>('cpp');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  if (!isOpen) return null;

  const filesMap: Record<FileKey, { name: string; content: string; lang: string }> = {
    cpp: { name: 'uk_analyzer.cpp', content: CPP_SOURCE_CODE, lang: 'C++' },
    html: { name: 'index.html', content: STANDALONE_HTML_CONTENT, lang: 'HTML5' },
    js: { name: 'script.js', content: STANDALONE_JS_CONTENT, lang: 'JavaScript' },
    css: { name: 'styles.css', content: STANDALONE_CSS_CONTENT, lang: 'CSS3' },
    makefile: { name: 'Makefile', content: MAKEFILE_CONTENT, lang: 'Makefile' },
    readme: { name: 'README.md', content: README_MD_CONTENT, lang: 'Markdown' }
  };

  const handleCopy = (content: string, key: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    sound.playClick();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      sound.playClick();

      const zip = new JSZip();
      zip.file('uk_analyzer.cpp', CPP_SOURCE_CODE);
      zip.file('Makefile', MAKEFILE_CONTENT);
      zip.file('index.html', STANDALONE_HTML_CONTENT);
      zip.file('script.js', STANDALONE_JS_CONTENT);
      zip.file('styles.css', STANDALONE_CSS_CONTENT);
      zip.file('README.md', README_MD_CONTENT);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'uk-geotech-portal-serzhan-birzhan-ape2601.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsZipping(false);
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-800 text-sky-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Исходные файлы для выгрузки на GitHub</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 font-mono">
                  Serzhan Birzhan · APE2601
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Полный комплект: C++20, JavaScript (ES6), HTML5, CSS3, Makefile и README.md
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              <FolderArchive className="w-4 h-4" />
              <span>{isZipping ? 'Создание ZIP...' : 'Скачать все файлы (.zip)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left File List */}
          <div className="w-full md:w-56 shrink-0 border-r border-slate-800 bg-slate-950/60 p-3 space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
              Файлы репозитория (6)
            </div>
            {(Object.keys(filesMap) as FileKey[]).map((key) => {
              const file = filesMap[key];
              const isSelected = activeFile === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    sound.playClick();
                    setActiveFile(key);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans">{file.lang}</span>
                </button>
              );
            })}

            {/* Quick Git CLI cheat sheet */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 px-2 text-[11px] text-slate-400 space-y-2">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>Команды для терминала:</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-300 leading-relaxed select-all">
                git init<br />
                git add .<br />
                git commit -m "UK Portal"<br />
                git push
              </div>
            </div>
          </div>

          {/* Right Code Viewer */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#060a14]">
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-white">
                  {filesMap[activeFile].name}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{filesMap[activeFile].lang}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(filesMap[activeFile].content, activeFile)}
                  className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === activeFile ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Копировать файл</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed max-h-[500px]">
              <pre className="whitespace-pre-wrap">{filesMap[activeFile].content}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>
            Автор проекта: <strong className="text-white">Serzhan Birzhan</strong> · Группа <strong className="text-sky-400">APE2601</strong>
          </span>
          <span>Готово к загрузке в любой публичный репозиторий GitHub</span>
        </div>
      </div>
    </div>
  );
};
