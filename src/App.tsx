/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Volume2, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Zap,
  Music,
  Info,
  ArrowLeft,
  X
} from 'lucide-react';
import { KANA_DATA, KanaCategory, KanaItem } from './data/kanaData';
import { generateSpeech } from './services/geminiService';
import { cn } from './lib/utils';

const ROW_HEADERS = ['あ行', 'か行', 'さ行', 'た行', 'な行', 'は行', 'ま行', 'や行', 'ら行', 'わ行', 'ん'];
const COL_HEADERS = ['あ段', 'い段', 'う段', 'え段', 'お段'];

export default function App() {
  const [viewState, setViewState] = useState<'home' | 'category' | 'practice'>('home');
  const [selectedCategory, setSelectedCategory] = useState<KanaCategory>(KANA_DATA[0]);
  const [selectedItem, setSelectedItem] = useState<KanaItem | null>(null);
  const [showRomaji, setShowRomaji] = useState(true);
  const [scriptMode, setScriptMode] = useState<'hiragana' | 'katakana' | 'both'>('both');
  const [practiceQuestion, setPracticeQuestion] = useState<{ word: string, options: string[], answer: string } | null>(null);
  const [practiceResult, setPracticeResult] = useState<'correct' | 'incorrect' | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handlePlayAudio = async (text: string) => {
    setLoadingAudio(text);
    const audioUrl = await generateSpeech(text);
    setLoadingAudio(null);
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      } else {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };

  const startPractice = () => {
    const allItems = KANA_DATA.flatMap(cat => cat.items);
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
    const answer = randomItem.kana;
    
    const otherOptions = allItems
      .filter(i => i.kana !== answer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(i => i.kana);
    
    const options = [answer, ...otherOptions].sort(() => 0.5 - Math.random());
    
    setPracticeQuestion({
      word: randomItem.romaji,
      options,
      answer
    });
    setPracticeResult(null);
  };

  // Scroll to the selected item when detail view opens
  useEffect(() => {
    if (selectedItem && scrollContainerRef.current) {
      const index = selectedCategory.items.findIndex(i => i.kana === selectedItem.kana);
      if (index !== -1) {
        const container = scrollContainerRef.current;
        container.scrollTo({
          left: index * container.clientWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedItem]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    const newItem = selectedCategory.items[index];
    if (newItem && newItem.kana !== selectedItem?.kana) {
      setSelectedItem(newItem);
    }
  };

  const renderGojuonGrid = () => {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] p-3 md:p-6 border border-black/5 shadow-xl shadow-black/5">
          {/* Column Headers */}
          <div className="grid grid-cols-[30px_repeat(5,1fr)] gap-1 md:gap-2 mb-2">
            <div />
            {COL_HEADERS.map(header => (
              <div key={header} className="text-center font-bold text-[#FF6321] text-[9px] md:text-[10px] py-1 bg-[#FF6321]/5 rounded-md">
                {header[0]}
              </div>
            ))}
          </div>

          {/* Rows */}
          {ROW_HEADERS.map((rowHeader, rowIndex) => (
            <div key={rowHeader} className="grid grid-cols-[30px_repeat(5,1fr)] gap-1 md:gap-2 mb-1 items-center">
              <div className="text-center font-bold text-black/20 text-[8px] md:text-[9px] py-0.5 border-r border-black/5">
                {rowHeader[0]}
              </div>
              {[0, 1, 2, 3, 4].map(colIndex => {
                const item = selectedCategory.items.find(i => i.row === rowIndex && i.col === colIndex);
                if (!item) return <div key={colIndex} className="aspect-square" />;
                
                const isPlaying = loadingAudio === item.kana;

                return (
                  <motion.div
                    key={item.kana}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative aspect-square rounded-lg md:rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer group",
                      isPlaying 
                        ? "bg-[#FF6321] border-[#FF6321] text-white shadow-lg shadow-[#FF6321]/30" 
                        : "bg-white border-black/5 hover:border-[#FF6321]/30 hover:shadow-md"
                    )}
                    onClick={() => handlePlayAudio(item.kana)}
                  >
                    <div className="flex items-baseline gap-0.5">
                      {(scriptMode === 'hiragana' || scriptMode === 'both') && (
                        <span className={cn(
                          "text-lg md:text-2xl font-bold transition-transform",
                          !isPlaying && "group-hover:scale-110"
                        )}>
                          {item.kana}
                        </span>
                      )}
                      {(scriptMode === 'katakana' || scriptMode === 'both') && (
                        <span className={cn(
                          "font-medium",
                          scriptMode === 'both' ? "text-xs md:text-sm" : "text-lg md:text-2xl",
                          isPlaying ? "text-white/70" : "text-black/10"
                        )}>
                          {item.katakana}
                        </span>
                      )}
                    </div>
                    {showRomaji && (
                      <span className={cn(
                        "text-[7px] md:text-[9px] font-bold uppercase tracking-tighter mt-0.5",
                        isPlaying ? "text-white/60" : "text-black/20"
                      )}>
                        {item.romaji}
                      </span>
                    )}
                    
                    {/* Detail Interaction Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className={cn(
                        "absolute top-0.5 right-0.5 p-0.5 rounded-full transition-all opacity-0 group-hover:opacity-100",
                        isPlaying ? "bg-white/20 text-white" : "bg-black/5 text-black/20 hover:bg-[#FF6321] hover:text-white"
                      )}
                    >
                      <Info size={8} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (viewState === 'practice') {
      startPractice();
    }
  }, [viewState]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#FF6321]/20 overflow-x-hidden">
      <audio ref={audioRef} hidden />
      
      {/* Header */}
      <header className="border-b border-black/5 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => {
              setViewState('home');
              setSelectedItem(null);
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-[#FF6321] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#FF6321]/20 group-hover:rotate-6 transition-transform">
              K
            </div>
            <h1 className="text-2xl font-bold tracking-tight">KANA-Logic</h1>
          </button>
          
          <nav className="flex items-center gap-1 bg-black/5 p-1 rounded-full">
            <button 
              onClick={() => {
                setViewState('home');
                setSelectedItem(null);
              }}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                viewState !== 'practice' ? "bg-white text-black shadow-sm" : "text-black/60 hover:text-black"
              )}
            >
              学习模式
            </button>
            <button 
              onClick={() => setViewState('practice')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                viewState === 'practice' ? "bg-white text-black shadow-sm" : "text-black/60 hover:text-black"
              )}
            >
              练习模式
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {viewState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-5xl font-black tracking-tight mb-6">掌握日语拼读的逻辑</h2>
                <p className="text-xl text-black/50 font-serif italic">选择一个模块开始您的探索之旅</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {KANA_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setViewState('category');
                    }}
                    className="group relative bg-white p-10 rounded-[3rem] border border-black/5 shadow-xl hover:shadow-2xl transition-all text-left overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-[#FF6321] uppercase tracking-[0.3em] mb-4">Module</div>
                      <h3 className="text-4xl font-black mb-4 group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                      <p className="text-black/40 text-lg leading-relaxed max-w-xs">{cat.description}</p>
                    </div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-[#FF6321]/5 rounded-full flex items-center justify-center text-[#FF6321] group-hover:scale-125 transition-transform">
                      <ChevronRight size={32} />
                    </div>
                    <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-black/[0.02] select-none group-hover:text-black/[0.05] transition-colors">
                      {cat.items[0]?.kana}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {viewState === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setViewState('home')}
                    className="p-1.5 text-black/40 hover:text-black transition-colors bg-black/5 rounded-lg"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h2 className="text-2xl font-black tracking-tight">{selectedCategory.name}</h2>
                </div>
                
                <div className="flex items-center gap-1 bg-black/5 p-0.5 rounded-lg self-start md:self-auto">
                  <button 
                    onClick={() => setScriptMode('hiragana')}
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold transition-all",
                      scriptMode === 'hiragana' ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"
                    )}
                  >
                    平
                  </button>
                  <button 
                    onClick={() => setScriptMode('katakana')}
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold transition-all",
                      scriptMode === 'katakana' ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"
                    )}
                  >
                    片
                  </button>
                  <button 
                    onClick={() => setScriptMode('both')}
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold transition-all",
                      scriptMode === 'both' ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"
                    )}
                  >
                    全
                  </button>
                  <div className="w-px h-3 bg-black/10 mx-0.5" />
                  <button 
                    onClick={() => setShowRomaji(!showRomaji)}
                    className={cn(
                      "px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1",
                      showRomaji ? "bg-white text-black shadow-sm" : "text-black/40 hover:text-black"
                    )}
                  >
                    {showRomaji ? <Eye size={12} /> : <EyeOff size={12} />}
                    Ro
                  </button>
                </div>
              </div>

              {selectedCategory.id === 'pure' ? (
                renderGojuonGrid()
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {selectedCategory.items.map((item) => (
                    <motion.div
                      key={item.kana}
                      className="relative aspect-square bg-white rounded-[2rem] border border-black/5 flex flex-col items-center justify-center transition-all hover:shadow-2xl hover:border-[#FF6321]/30 group cursor-pointer"
                      onClick={() => handlePlayAudio(item.kana)}
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold group-hover:scale-110 transition-transform">{item.kana}</span>
                        <span className="text-xl font-medium text-black/20">{item.katakana}</span>
                      </div>
                      {showRomaji && (
                        <span className="text-xs font-bold uppercase tracking-widest text-black/30">
                          {item.romaji}
                        </span>
                      )}
                      
                      {/* Detail Interaction Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/5 text-black/20 hover:bg-[#FF6321] hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Info size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {viewState === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto py-12"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6321]/10 text-[#FF6321] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                  <Zap size={16} /> 自主练习
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">听觉与视觉反射</h2>
                <p className="text-black/50">根据罗马字提示，选择正确的假名。</p>
              </div>

              <AnimatePresence mode="wait">
                {practiceQuestion && (
                  <motion.div
                    key={practiceQuestion.word}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[3rem] p-12 border border-black/5 shadow-2xl shadow-black/5 text-center"
                  >
                    <div className="text-xs font-bold text-black/30 uppercase tracking-[0.3em] mb-4">
                      ROMANIZATION
                    </div>
                    <div className="text-8xl font-black tracking-tighter mb-16 text-[#FF6321]">
                      {practiceQuestion.word}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {practiceQuestion.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            if (practiceResult) return;
                            if (opt === practiceQuestion.answer) {
                              setPracticeResult('correct');
                              setTimeout(startPractice, 1500);
                            } else {
                              setPracticeResult('incorrect');
                            }
                          }}
                          className={cn(
                            "py-8 rounded-3xl text-4xl font-bold transition-all border-2",
                            practiceResult === 'correct' && opt === practiceQuestion.answer 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20" 
                              : practiceResult === 'incorrect' && opt !== practiceQuestion.answer
                              ? "bg-white border-black/5 opacity-50"
                              : practiceResult === 'incorrect' && opt === practiceQuestion.answer
                              ? "bg-white border-emerald-500 text-emerald-500"
                              : "bg-white border-black/5 hover:border-[#FF6321] hover:text-[#FF6321]"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {practiceResult === 'incorrect' && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={startPractice}
                        className="mt-8 flex items-center gap-2 mx-auto text-sm font-bold text-[#FF6321] hover:underline"
                      >
                        <RefreshCw size={16} /> 再试一次
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sub-page Detail View with Horizontal Swiper */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed inset-0 bg-[#FDFCFB] z-[100] flex flex-col"
          >
            {/* Detail Header */}
            <div className="h-20 border-b border-black/5 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
              <button 
                onClick={() => setSelectedItem(null)}
                className="flex items-center gap-2 text-black/40 hover:text-black transition-colors group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-xs">关闭详情</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-black/20 uppercase tracking-widest">左右滑动切换</span>
                <div className="w-px h-4 bg-black/10 mx-2" />
                <div className="text-sm font-black text-[#FF6321]">
                  {selectedCategory.items.findIndex(i => i.kana === selectedItem.kana) + 1} / {selectedCategory.items.length}
                </div>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth no-scrollbar"
            >
              {selectedCategory.items.map((item) => (
                <div 
                  key={item.kana}
                  className="w-full h-full shrink-0 snap-center overflow-y-auto"
                >
                  <div className="max-w-4xl mx-auto px-6 py-12">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[3rem] p-8 md:p-16 border border-black/5 shadow-2xl shadow-black/5"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16">
                        <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                          <div className="w-40 h-40 bg-[#FF6321]/5 rounded-[2.5rem] flex items-center justify-center text-8xl font-bold text-[#FF6321] shadow-inner relative">
                            {item.kana}
                            <span className="absolute bottom-2 right-4 text-3xl text-black/10">{item.katakana}</span>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-black/30 uppercase tracking-[0.4em] mb-2">
                              {item.romaji}
                            </div>
                            <h3 className="text-5xl font-black tracking-tight">发音详情</h3>
                          </div>
                        </div>
                        <button 
                          onClick={() => handlePlayAudio(item.kana)}
                          disabled={loadingAudio === item.kana}
                          className="w-24 h-24 bg-[#FF6321] text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-[#FF6321]/40 disabled:opacity-50"
                        >
                          {loadingAudio === item.kana ? (
                            <RefreshCw className="animate-spin" size={32} />
                          ) : (
                            <Volume2 size={32} />
                          )}
                        </button>
                      </div>

                      <div className="space-y-10">
                        <div className="flex items-center gap-4">
                          <div className="h-px flex-1 bg-black/5" />
                          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-black/30 flex items-center gap-2">
                            <Music size={16} /> 经典词例
                          </h4>
                          <div className="h-px flex-1 bg-black/5" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {item.examples.map((ex, idx) => (
                            <div 
                              key={idx}
                              className="p-8 rounded-[2rem] bg-black/[0.02] border border-black/5 group hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                              <div className="flex items-center justify-between mb-6">
                                <div className="text-4xl font-bold tracking-tight">{ex.word}</div>
                                <button 
                                  onClick={() => handlePlayAudio(ex.word)}
                                  disabled={loadingAudio === ex.word}
                                  className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#FF6321] hover:text-white transition-all group-hover:scale-110"
                                >
                                  {loadingAudio === ex.word ? (
                                    <RefreshCw className="animate-spin" size={20} />
                                  ) : (
                                    <Volume2 size={20} />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg font-bold text-black/70">{ex.reading}</span>
                                <span className="text-xs text-black/20 font-black uppercase tracking-widest">({ex.romaji})</span>
                              </div>
                              <div className="text-lg font-serif italic text-black/40 leading-relaxed">{ex.meaning}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-[10px] font-bold text-black/30 uppercase tracking-widest">基础音</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center">
              <div className="text-2xl font-bold">20%</div>
              <div className="text-[10px] font-bold text-black/30 uppercase tracking-widest">拗音</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-black/40 text-sm font-medium">
            <BookOpen size={18} />
            <span>KANA-Logic: 掌握日语拼读的逻辑</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
