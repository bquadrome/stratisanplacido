import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { navLinks, features, timeline, viviImages } from './data.js';
import { useReveal, useSmoothScroll, useTimelineSpine, useTimelineStack } from './motion.js';

function SectionHead({ kicker, title, children, narrow }) {
  return (
    <header className="sec-head" data-reveal>
      <p className="kicker">{kicker}</p>
      <h2 className="sec-title">
        <span className="rule" aria-hidden />
        <span>{title}</span>
        <span className="rule" aria-hidden />
      </h2>
      <p className={`sec-lead${narrow ? ' narrow' : ''}`}>{children}</p>
    </header>
  );
}

function Select({ name, label, options, defaultValue }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const btn = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e) => !root.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const pick = (i) => {
    setValue(options[i]);
    setOpen(false);
    btn.current?.focus();
  };
  const onKey = (e) => {
    const k = e.key;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(k)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (k === 'ArrowDown') setActive((a) => Math.min(options.length - 1, a + 1));
    else if (k === 'ArrowUp') setActive((a) => Math.max(0, a - 1));
    else if (k === 'Home') setActive(0);
    else if (k === 'End') setActive(options.length - 1);
    else if (k === 'Enter' || k === ' ') pick(active);
    else if (k === 'Escape' || k === 'Tab') {
      if (k === 'Escape') e.stopPropagation();
      setOpen(false);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div className={`field select${open ? ' open' : ''}`} ref={root}>
      <span id={`${id}-l`}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        ref={btn}
        className="select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-l ${id}-v`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span id={`${id}-v`}>{value}</span>
        <svg width="15" height="8" viewBox="0 0 15 8" aria-hidden>
          <path d="M1 1l6.5 6L14 1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <ul className="select-list" id={`${id}-list`} role="listbox" aria-labelledby={`${id}-l`}>
        {options.map((o, i) => (
          <li
            key={o}
            id={`${id}-${i}`}
            role="option"
            aria-selected={o === value}
            className={i === active ? 'active' : undefined}
            onPointerEnter={() => setActive(i)}
            onClick={() => pick(i)}
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const closeBtn = useRef(null);
  const prev = useRef(open);

  useEffect(() => {
    if (prev.current === open) return;
    prev.current = open;
    const html = document.documentElement;
    if (open) {
      window.__lenis?.stop();
      html.classList.add('menu-open');
      closeBtn.current?.focus();
    } else {
      window.__lenis?.start();
      html.classList.remove('menu-open');
      toggle.current?.focus({ preventScroll: true });
    }
  }, [open]);

  // close if resized to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 801px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // restart scroll before the anchor handler runs, then close
  const go = () => {
    window.__lenis?.start();
    document.documentElement.classList.remove('menu-open');
    setOpen(false);
  };

  return (
    <nav className="site-header" aria-label="Principale">
      <a href="#home" aria-label="San Placido, home">
        <img src="/img/logo.svg" alt="San Placido" className="logo" />
      </a>
      <button
        type="button"
        ref={toggle}
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Apri menu"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden />
        <span aria-hidden />
      </button>
      <ul className="nav">
        {navLinks.map((l) => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      {createPortal(
        <div
          id="mobile-menu"
          className={`m-menu${open ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
          <div className="m-menu-top">
            <a href="#home" aria-label="San Placido, home" onClick={go}>
              <img src="/img/logo.svg" alt="San Placido" className="logo" />
            </a>
            <button
              type="button"
              ref={closeBtn}
              className="m-close"
              aria-label="Chiudi menu"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden />
              <span aria-hidden />
            </button>
          </div>
          <ul className="m-links">
            {navLinks.map((l, i) => (
              <li key={l.label} style={{ '--i': i }}>
                <a href={l.href} onClick={go}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="m-foot" style={{ '--i': navLinks.length }}>
            <a href="#prenota" className="m-book" onClick={go}>
              Prenota la visita
            </a>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img src="/img/hero.webp" alt="Chiostro del Monastero di San Placido con la Cuba" className="hero-bg" />
      <div className="hero-text">
        <h1>
          Monastero
          <br />
          di san placido
          <br />
          calonerò
        </h1>
        <p>
          Luogo di profonda spiritualità, architettura d'eccellenza e formazione agraria, la nostra
          struttura testimonia oltre sette secoli di storia e stratificazione culturale nel territorio
          messinese.
        </p>
      </div>
    </section>
  );
}

function Storia() {
  return (
    <section className="storia" id="storia">
      <SectionHead kicker="Monastero di San Placido Calonerò" title="La storia">
        Dalle prime origini anacoretiche medievali tra le rigogliose colline di Calonerò fino ai moderni
        interventi di restauro e valorizzazione sostenuti dall'Unione Europea (PNRR), il Monastero di San
        Placido Calonerò rappresenta una straordinaria sintesi tra memoria, arte e innovazione.
      </SectionHead>
      <div className="storia-grid" data-reveal>
        <img className="g1" src="/img/storia-1.png" alt="Chiostro con colonne, foto storica" />
        <img className="g2" src="/img/storia-3.png" alt="Veduta del monastero sulla collina" />
        <img className="g3" src="/img/storia-2.png" alt="Cortile interno, foto storica" />
        <img className="g4" src="/img/storia-4.png" alt="Galleria voltata con macchinari agricoli" />
        <img className="g5" src="/img/storia-5.png" alt="Facciata con impalcature" />
      </div>
    </section>
  );
}

function Monastero() {
  return (
    <section className="monastero" id="monastero">
      <SectionHead kicker="Complesso Monumentale" title="Il monastero">
        L'anima del monastero attraverso i suoi tratti distintivi: l'eredità gotica delle origini,
        l'eleganza classica del Cinquecento e il profondo legame con la terra e il paesaggio circostante.
      </SectionHead>
      <div className="cards">
        {features.map((f, i) => (
          <article className="card" key={f.title[0]} data-reveal style={{ '--d': `${i * 120}ms` }}>
            <img src={f.icon} alt="" style={{ width: f.iconW, height: 74 }} />
            <h3>
              {f.title[0]}
              <br />
              {f.title[1]}
            </h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item }) {
  const cls = [
    'tl-band',
    `img-${item.side}`,
    item.dark ? 'dark' : '',
    item.tight ? 'tight' : '',
    item.wide ? 'wide' : '',
    item.titleWide ? 'title-wide' : '',
  ].join(' ');
  const [open, setOpen] = useState(false);
  const hasMore = item.body.length > 1;
  return (
    <section className={cls} style={{ background: item.bg }}>
      <div className="tl-row">
        <div className="tl-media" data-reveal>
          <img src={item.img} alt={item.title.join(' ')} />
        </div>
        <div className="tl-text">
          <span className="tl-dot" aria-hidden />
          <span className="tl-line" aria-hidden />
          <p className="tl-date">{item.date}</p>
          <p className="tl-era" data-reveal>
            {item.era}
          </p>
          <h3 className="tl-title" data-reveal style={{ '--d': '100ms' }}>
            {item.title.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </h3>
          {/* data-open, not className: re-render must keep reveal's "in" class */}
          <div className="tl-body" data-open={open} data-reveal style={{ '--d': '220ms' }}>
            <p>{item.body[0]}</p>
            {hasMore && (
              <div className="tl-more">
                <div>
                  {item.body.slice(1).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}
            {/* mobile only: extra paragraphs hidden until tap */}
            {hasMore && (
              <button type="button" className="tl-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                {open ? 'Leggi di meno' : 'Leggi di più'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef(null);
  useTimelineSpine(ref);
  useTimelineStack(ref);
  return (
    <>
      <section className="timeline-head">
        <SectionHead kicker="Percorso Storico" title="Timeline" narrow>
          Un viaggio cronologico tra fondazioni, fasti rinascimentali, ferite sismiche e rinascita: tutti
          i secoli che hanno fatto la storia del luogo.
        </SectionHead>
      </section>
      <div className="timeline" ref={ref}>
        <span className="tl-spine" aria-hidden />
        {timeline.map((item) => (
          <TimelineItem key={item.date} item={item} />
        ))}
      </div>
    </>
  );
}

function Quote() {
  return (
    <section className="quote">
      <blockquote data-reveal>
        <span className="qmark open" aria-hidden>
          “
        </span>
        Un edificio non è mai una sola epoca. È una sezione nel tempo: fondazioni medievali, una chiesa
        gotica in rovina, chiostri cinquecenteschi, il rilievo dei tecnici
        <span className="qmark close" aria-hidden>
          ”
        </span>
      </blockquote>
    </section>
  );
}

function DoveSiamo() {
  return (
    <section className="dove" id="dove-siamo">
      <div className="dove-text" data-reveal>
        <p className="kicker-sm">La Localizzazione</p>
        <h2>Come Raggiungerci</h2>
        <div className="dove-item">
          <h3>In Automobile</h3>
          <p>
            Autostrada A18 Messina-Catania, uscita Messina Sud / Tremestieri. Proseguire seguendo le
            indicazioni storiche per San Placido Calonerò. Ampio parcheggio gratuito disponibile in loco.
          </p>
        </div>
        <div className="dove-item">
          <h3>Trasporto Pubblico</h3>
          <p>
            Servizio navetta speciale "Mostra Settecento" in partenza dalla stazione Centrale di Messina
            ogni fine settimana in concomitanza con gli orari delle visite guidate.
          </p>
        </div>
        <a
          className="btn btn-outline btn-lg"
          href="https://www.google.com/maps/search/?api=1&query=Monastero+San+Placido+Calonero+Messina"
          target="_blank"
          rel="noreferrer"
        >
          Ottieni indicazioni su Google Maps
        </a>
      </div>
      <div className="dove-map" data-reveal style={{ '--d': '150ms' }}>
        <img src="/img/mappa.png" alt="Mappa: posizione del Monastero di San Placido Calonerò" />
      </div>
    </section>
  );
}

function Vivi() {
  return (
    <section className="vivi" id="vivi">
      <header className="big-head" data-reveal>
        <p className="kicker">Esperienze e Attività</p>
        <h2>Vivi il monastero</h2>
        <p className="lead">
          Un patrimonio unico da scoprire di persona o da remoto. Scegli tra i percorsi di visita guidata,
          le degustazioni dedicate al territorio o l'esplorazione virtuale.
        </p>
      </header>
      <div className="vivi-btns" data-reveal style={{ '--d': '120ms' }}>
        <a className="btn btn-dark" href="#prenota">
          Prenota la tua visita
        </a>
        <a className="btn btn-red" href="#prenota">
          Prenota l’esperienza del vino
        </a>
        <a className="btn btn-outline" href="#vivi">
          Vai al virtual tour
        </a>
      </div>
      <div className="vivi-strip" data-reveal style={{ '--d': '200ms' }}>
        <div className="vivi-track">
          {/* list doubled: track slides -50% then restarts seamless */}
          {[...viviImages, ...viviImages].map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={i < viviImages.length ? `Monastero, foto ${i + 1}` : ''}
              aria-hidden={i >= viviImages.length || undefined}
              draggable="false"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Prenota() {
  const [sent, setSent] = useState(false);
  return (
    <section className="prenota" id="prenota">
      <header className="big-head" data-reveal>
        <p className="kicker">Monastero di San Placido</p>
        <h2>Prenota la Tua Visita</h2>
        <p className="lead wide">
          Prenota la tua visita alla mostra "Sussurri del Settecento" presso il Monastero di San Placido.
          <br />
          Compila il form qui sotto e riceverai una conferma via email.
        </p>
      </header>
      <form
        className="booking"
        data-reveal
        style={{ '--d': '120ms' }}
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div className="row">
          <label>
            <span>Nome</span>
            <input name="nome" placeholder="Nome" required />
          </label>
          <label>
            <span>Cognome</span>
            <input name="cognome" placeholder="Cognome" required />
          </label>
        </div>
        <div className="row">
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="email@esempio.it" required />
          </label>
          <label>
            <span>Data della visita</span>
            <input name="data" type="date" required />
          </label>
        </div>
        <div className="row">
          <label>
            <span>Numero visitatori</span>
            <input name="visitatori" type="number" min="1" placeholder="1" />
          </label>
          <Select
            name="attivita"
            label="Tipo di attività"
            options={['Mostra', 'Esperienza del vino']}
          />
        </div>
        <button type="submit" className="btn-book">
          Prenota Ora
        </button>
        <p className="form-note">
          {sent
            ? 'Grazie! Riceverai a breve una conferma via email.'
            : 'Riceverai una conferma via email con i dettagli della visita. Per modifiche o cancellazioni, contattaci a info@monasterosanplacido.it.'}
        </p>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/img/footer-logo.svg" alt="" />
            <span>Monastero di San Placido calonerò</span>
          </div>
          <p>
            Un monumento storico aperto alla cultura, dove la secolare tradizione benedettina e lo
            splendore artistico barocco rinascono per accogliere mostre e studi internazionali.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Navigazione</h4>
            <a href="#home">Home</a>
            <a href="#storia">La storia</a>
            <a href="#monastero">La mostra</a>
            <a href="#vivi">Virtual Tour</a>
          </div>
          <div>
            <h4>Visita</h4>
            <a href="#prenota">Prenota</a>
            <a href="#dove-siamo">Dove siamo</a>
          </div>
          <div>
            <h4>Contatti</h4>
            <a href="mailto:info@monasterosanplacido.it">info@monasterosanplacido.it</a>
            <a href="tel:+390901234567">+39 090 123 4567</a>
            <span>Messina, Italia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© Monastero di San Placido. Tutti i diritti riservati.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Termini d'Uso</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useSmoothScroll();
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Storia />
        <Monastero />
        <Timeline />
        <Quote />
        <DoveSiamo />
        <Vivi />
        <Prenota />
      </main>
      <Footer />
    </>
  );
}
