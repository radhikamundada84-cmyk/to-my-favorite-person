import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Heart, ChevronDown, Music, Pause, X, Sparkles, ArrowRight, Mail, Star } from 'lucide-react'
import { content } from './content'
import './styles.css'
import './touches.css'
import './timeline-premium.css'
import './gallery-premium.css'

const hearts = Array.from({ length: 20 }, (_, index) => ({ id: index, left: `${(index * 19 + 4) % 98}%`, delay: `${(index % 7) * .7}s`, size: 12 + (index % 4) * 5 }))

function App() {
  const [opened, setOpened] = useState(false)
  const [flipped, setFlipped] = useState<number[]>([])
  const [extra, setExtra] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [love, setLove] = useState(0)
  const [answer, setAnswer] = useState('')
  const [finale, setFinale] = useState(false)
  const [music, setMusic] = useState(false)
  const [musicUnavailable, setMusicUnavailable] = useState(false)
  const toggleMusic = async () => {
    const player = document.getElementById('love-song') as HTMLAudioElement | null
    if (!player) return
    if (music) {
      player.pause()
      setMusic(false)
      return
    }
    try {
      await player.play()
      setMusic(true)
    } catch {
      setMusic(false)
      setMusicUnavailable(true)
    }
  }
  useEffect(() => { if (opened) setTimeout(() => document.getElementById('universe')?.scrollIntoView({ behavior: 'smooth' }), 450) }, [opened])
  const toggleCard = (index: number) => setFlipped(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index])
  return <main>
    <div className="grain" />
    <audio id="love-song" src="/music/pyar-ho.mp3" loop preload="none" onEnded={() => setMusic(false)} />
    <button className="music" onClick={toggleMusic} aria-label={music ? 'Pause Pyar Ho' : 'Play Pyar Ho'}><Music size={16}/>{music ? <Pause size={14}/> : 'Pyar Ho'}</button>
    {musicUnavailable && <div className="music-note" role="status">Add the Hindi song file at <code>public/music/pyar-ho.mp3</code> to play it.</div>}
    <section className={`hero ${opened ? 'hero-opened' : ''}`}>
      <div className="aurora a1"/><div className="aurora a2"/>
      {hearts.map(h => <Heart key={h.id} className="float-heart" fill="currentColor" style={{ left: h.left, animationDelay: h.delay, width: h.size, height: h.size }} />)}
      <div className="hero-content">
        <div className="hero-heart"><Heart fill="currentColor"/><span className="heart-glow"/></div>
        <p className="eyebrow">A little universe, made just for you</p>
        <h1>Hey, My<br/><em>Favorite Human</em> <span>♥</span></h1>
        <p className="hero-copy">I made something special for you, because you mean more to me than words can explain.</p>
        <button className="primary-btn" onClick={() => setOpened(true)}>Open Your Surprise <Mail size={17}/></button>
      </div>
      <div className="scroll-hint"><span>scroll to unfold</span><ChevronDown size={18}/></div>
    </section>
    <div className={`site ${opened ? 'revealed' : ''}`}>
      <nav><span className="nav-mark">for <em>{content.recipient}</em></span><a href="#letter">a note from my heart</a></nav>
      <section id="universe" className="section universe">
        <SectionIntro overline="01 — OUR STORY" title={<>Our Little <em>Universe</em> <Sparkles/></>} copy="A few pages from the story I never want to stop writing with you."/>
        <div className="timeline">{content.timeline.map((item, index) => <article className={`memory memory-${index + 1}`} key={item.title}><div className="memory-dot"><span>{index + 1}</span></div><div className="memory-card"><div className="card-sparkle">✦</div><div className="memory-image"><span>{item.image}</span><small>chapter {String(index + 1).padStart(2, '0')}</small></div><div className="memory-copy"><p className="date">{item.date}</p><h3>{item.title}</h3><p>{item.text}</p><span className="memory-whisper">a little piece of us <Heart size={11} fill="currentColor"/></span></div></div></article>)}</div>
      </section>
      <section className="section reasons">
        <SectionIntro overline="02 — THE LITTLE THINGS" title={<>Reasons Why You’re <em>Special</em> to Me <Heart fill="currentColor"/></>} copy="Tap a card. Every one holds a small truth I wanted you to know."/>
        <div className="reason-grid">{content.reasons.map(([title, text], index) => <button key={title} className={`flip ${flipped.includes(index) ? 'is-flipped' : ''}`} onClick={() => toggleCard(index)}><span className="flip-inner"><span className="flip-face flip-front"><Heart size={21} fill="currentColor"/><strong>{title}</strong><small>tap to unfold</small></span><span className="flip-face flip-back"><span>{text}</span></span></span></button>)}</div>
        <div className="extra-reason"><button className="text-btn" onClick={() => setExtra(extra + 1)}>One More Reason <ArrowRight size={16}/></button>{extra > 0 && <p key={extra}>“{content.extraReasons[(extra - 1) % content.extraReasons.length]}”</p>}</div>
      </section>
      <section className="section gallery-section">
        <SectionIntro overline="03 — OUR MEMORIES" title={<>Little Moments, <em>Forever Memories</em> <span>📸</span></>} copy="A gallery waiting for all the moments that made us smile."/>
        <div className="gallery">{content.gallery.map((item, index) => <button className={`gallery-card g${index}`} key={item.title} onClick={() => setLightbox(index)} aria-label={`View ${item.title}`}><img className="gallery-photo" src={item.photo} alt={item.title}/><span className="photo-wash"/><span className="tape"/><span className="gallery-title">{item.title}</span><span className="view-memory">view memory</span></button>)}</div>
      </section>
      <section id="letter" className="section letter-section">
        <SectionIntro overline="04 — A NOTE FOR YOU" title={<>Words My Heart Wants You to <em>Know</em> <span>💌</span></>} copy="There is something I have been meaning to tell you."/>
        <button className={`envelope ${letterOpen ? 'letter-open' : ''}`} onClick={() => setLetterOpen(!letterOpen)} aria-label="Open love letter"><div className="envelope-flap"/><div className="envelope-body"><Heart fill="currentColor" size={31}/><span>{letterOpen ? 'close the letter' : 'open me'}</span></div></button>
        {letterOpen && <article className="love-letter"><Star size={18} fill="currentColor"/><p>Dear {content.letterRecipient},</p><blockquote>{content.letter.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</blockquote><p className="signed">From<br/><em>{content.letterSignature}</em></p></article>}
      </section>
      <section className="section question"><div className="question-card"><p className="eyebrow">A VERY IMPORTANT QUESTION</p><h2>Do you know how much<br/>I <em>love</em> you?</h2><div className="answer-row"><button className="primary-btn" onClick={() => setAnswer('Of course you do — but I hope I still get to show you in a thousand little ways, every day. ❤️')}>Of Course <Heart size={16} fill="currentColor"/></button><button className="outline-btn" onClick={() => setAnswer('More than the stars, more than all the soft mornings, more than words were ever meant to hold. 🥹')}>Tell Me More</button></div>{answer && <p className="answer">{answer}</p>}<button className="love-counter" onClick={() => setLove(love + 1)}><Heart fill="currentColor" size={19}/> Send a little love <b>{love}</b></button></div></section>
      <section className="section dreams"><SectionIntro overline="05 — WHAT’S AHEAD" title={<>A Thousand Tomorrows <em>With You</em> <span>🌙</span></>} copy="My favorite future is every version of it that has you beside me."/><div className="dream-grid">{content.dreams.map((dream, index) => <article key={dream} className="dream"><span>{['✦','☾','❋','♡','☁','✧'][index]}</span><p>{dream}</p></article>)}</div></section>
      <footer><div className="finale-ornament">✦</div><p className="eyebrow">THE END? NEVER.</p><h2>You’ve reached the end of this little website,<br/>but my love for you has <em>no ending.</em> <Heart fill="currentColor" size={24}/></h2><button className="primary-btn" onClick={() => setFinale(true)}>One Last Surprise <Sparkles size={17}/></button>{finale && <div className="final-message"><div className="burst">{hearts.slice(0, 12).map(h => <Heart key={h.id} fill="currentColor" style={{ '--angle': `${h.id * 30}deg` } as React.CSSProperties}/>)}</div><p>If I had to choose all over again, I’d still want to know you, choose you, and create a thousand beautiful memories with you.</p><small>Made with all my love, just for you. ❤️</small></div>}</footer>
    </div>
    {lightbox !== null && <div className="modal" role="dialog" aria-modal="true"><button className="close" onClick={() => setLightbox(null)} aria-label="Close"><X/></button><img className="modal-photo" src={content.gallery[lightbox].photo} alt={content.gallery[lightbox].title}/><h3>{content.gallery[lightbox].title}</h3><p>{content.gallery[lightbox].note}</p></div>}
  </main>
}
function SectionIntro({ overline, title, copy }: { overline: string, title: React.ReactNode, copy: string }) { return <header className="section-intro"><p className="eyebrow">{overline}</p><h2>{title}</h2><p>{copy}</p></header> }
createRoot(document.getElementById('root')!).render(<App />)
