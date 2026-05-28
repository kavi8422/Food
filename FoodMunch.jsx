import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #c9a227;
    --gold-dark: #9a7a18;
    --gold-light: #f0d878;
    --dark: #0d2436;
    --text: #1a2e3d;
    --muted: #5a7184;
    --light: #f9fbfe;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    scroll-behavior: smooth;
  }

  .fm-nav {
    position: sticky; top: 0;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #eee;
    z-index: 100;
    padding: 14px 32px;
    display: flex; justify-content: space-between; align-items: center;
    transition: box-shadow 0.3s;
  }
  .fm-nav.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  .fm-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--gold-dark); letter-spacing: -0.5px;
  }
  .fm-nav-links { display: flex; gap: 28px; }
  .fm-nav-links a {
    text-decoration: none; color: var(--muted);
    font-size: 14px; font-weight: 500; transition: color 0.2s;
    position: relative; padding-bottom: 2px;
  }
  .fm-nav-links a::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 2px; background: var(--gold);
    transition: width 0.25s;
  }
  .fm-nav-links a:hover { color: var(--gold); }
  .fm-nav-links a:hover::after { width: 100%; }
  .fm-hamburger {
    display: none; background: none; border: none;
    font-size: 24px; cursor: pointer; color: var(--dark);
  }

  .fm-hero {
    background: linear-gradient(135deg, #0d2436 0%, #1a3a50 50%, #243f52 100%);
    min-height: 90vh;
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 100px 24px;
    position: relative; overflow: hidden;
  }
  .fm-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://png.pngtree.com/background/20210710/original/pngtree-food-overlooking-the-background-banner-picture-image_1055258.jpg') center/cover;
    opacity: 0.25;
  }
  .fm-hero-content { position: relative; z-index: 1; }
  .fm-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 54px; font-weight: 700;
    color: #fff; margin: 0 0 14px; line-height: 1.15;
    animation: fadeUp 0.8s ease both;
  }
  .fm-hero h1 em { color: var(--gold-light); font-style: italic; }
  .fm-hero p {
    color: rgba(255,255,255,0.75); font-size: 20px;
    margin: 0 0 36px;
    animation: fadeUp 0.8s ease 0.15s both;
  }
  .fm-hero-btns { animation: fadeUp 0.8s ease 0.3s both; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fm-btn {
    display: inline-block; padding: 13px 30px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    cursor: pointer; border: none; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .fm-btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: #fff; margin-right: 12px;
  }
  .fm-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201,162,39,0.45);
  }
  .fm-btn-outline {
    background: transparent; color: var(--gold-light);
    border: 1.5px solid var(--gold);
  }
  .fm-btn-outline:hover { background: rgba(201,162,39,0.12); }

  .fm-section { padding: 72px 32px; }
  .fm-section-light { background: var(--light); }
  .fm-section-white { background: #fff; }
  .fm-section-gradient { background: radial-gradient(ellipse at center, #fffae0, #fce87a); }
  .fm-container { max-width: 960px; margin: 0 auto; }
  .fm-section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 8px;
  }
  .fm-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 36px; font-weight: 700;
    color: var(--dark); margin: 0 0 12px; line-height: 1.2;
  }
  .fm-section-desc {
    color: var(--muted); font-size: 16px;
    margin: 0 0 44px; max-width: 520px; line-height: 1.7;
  }

  .fm-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fm-fade.visible { opacity: 1; transform: translateY(0); }

  .fm-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 20px; }
  .fm-wcu-card {
    background: #fff; border: 1px solid #e8edf4;
    border-radius: 16px; padding: 30px 24px; text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .fm-wcu-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }
  .fm-wcu-icon {
    width: 68px; height: 68px; border-radius: 50%;
    background: linear-gradient(135deg,#fff8e0,#fdedb0);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 18px; font-size: 30px;
  }
  .fm-wcu-card h3 { font-size: 18px; font-weight: 600; color: var(--dark); margin: 0 0 10px; }
  .fm-wcu-card p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.7; }
  .fm-offer-tag {
    display: inline-block; background: #fff3cd;
    color: #856404; font-weight: 700; padding: 1px 7px; border-radius: 4px;
  }

  .fm-menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px,1fr)); gap: 18px; }
  .fm-menu-card {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    transition: transform 0.22s, box-shadow 0.22s; cursor: pointer;
  }
  .fm-menu-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.13); }
  .fm-menu-card img { width: 100%; height: 135px; object-fit: cover; display: block; transition: transform 0.3s; }
  .fm-menu-card:hover img { transform: scale(1.05); }
  .fm-menu-img-wrap { overflow: hidden; }
  .fm-menu-card-body { padding: 14px 16px; }
  .fm-menu-card h4 { font-size: 15px; font-weight: 600; color: var(--dark); margin: 0 0 7px; }
  .fm-menu-link {
    font-size: 13px; color: var(--gold); font-weight: 500;
    text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
    transition: gap 0.2s;
  }
  .fm-menu-link:hover { gap: 8px; color: var(--gold-dark); }

  .fm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  .fm-split img { width: 100%; border-radius: 20px; object-fit: cover; }
  .fm-split-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: 32px; color: var(--dark); margin: 0 0 16px; line-height: 1.25;
  }
  .fm-split-content p { color: var(--muted); font-size: 15px; line-height: 1.8; margin: 0 0 26px; }
  .fm-payment-icons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px; }
  .fm-payment-icons img {
    height: 36px; border-radius: 6px;
    border: 1px solid #e0e0e0; padding: 4px 8px; background: #fff;
    transition: transform 0.2s;
  }
  .fm-payment-icons img:hover { transform: scale(1.08); }

  .fm-thank-content { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  .fm-thank-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 34px; color: var(--dark); margin: 0 0 12px; line-height: 1.2;
  }
  .fm-thank-text p { color: var(--muted); font-size: 16px; margin: 0 0 26px; }
  .fm-thank-img { width: 100%; border-radius: 20px; }

  .fm-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55); z-index: 200;
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn 0.2s ease;
  }
  .fm-modal {
    background: #fff; border-radius: 16px;
    max-width: 440px; width: 100%; overflow: hidden;
    box-shadow: 0 28px 72px rgba(0,0,0,0.22);
    animation: scaleIn 0.25s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  .fm-modal-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 24px; border-bottom: 1px solid #eee;
  }
  .fm-modal-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--gold); }
  .fm-modal-close {
    background: none; border: none; font-size: 22px;
    cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
    transition: color 0.2s;
  }
  .fm-modal-close:hover { color: #333; }
  .fm-modal img { width: 100%; display: block; }
  .fm-modal-footer {
    padding: 14px 24px; display: flex; justify-content: flex-end;
    border-top: 1px solid #eee;
  }
  .fm-modal-footer button {
    padding: 9px 22px; border-radius: 8px;
    background: #e0e0e0; border: none;
    cursor: pointer; font-size: 14px; font-weight: 500;
    transition: background 0.2s;
  }
  .fm-modal-footer button:hover { background: #ccc; }

  .fm-follow { text-align: center; }
  .fm-follow h2 {
    font-family: 'Playfair Display', serif;
    font-size: 34px; color: var(--dark); margin: 0 0 34px;
  }
  .fm-social-row { display: flex; justify-content: center; gap: 20px; }
  .fm-social-btn {
    width: 76px; height: 76px; border-radius: 50%;
    background: #fffbe8;
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; color: var(--gold);
    transition: all 0.25s; cursor: pointer;
    border: 1.5px solid #fde68a; text-decoration: none;
  }
  .fm-social-btn:hover {
    background: var(--gold); color: #fff;
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 8px 20px rgba(201,162,39,0.35);
  }

  .fm-footer { text-align: center; padding: 48px 32px; background: var(--dark); }
  .fm-footer-logo { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--gold-light); margin: 0 0 12px; }
  .fm-footer-email { color: #a0aec0; font-size: 15px; font-weight: 600; margin: 0 0 6px; }
  .fm-footer-addr { color: #718096; font-size: 14px; margin: 0; }

  .fm-toast {
    position: fixed; bottom: 28px; right: 28px;
    background: var(--dark); color: #fff;
    padding: 14px 22px; border-radius: 10px;
    font-size: 14px; font-weight: 500; z-index: 300;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .fm-back-top {
    position: fixed; bottom: 28px; left: 28px;
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--gold); color: #fff;
    border: none; cursor: pointer; font-size: 20px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(201,162,39,0.4);
    transition: all 0.25s; z-index: 150;
    opacity: 0; pointer-events: none;
  }
  .fm-back-top.show { opacity: 1; pointer-events: auto; }
  .fm-back-top:hover { transform: translateY(-3px); }

  @media (max-width: 768px) {
    .fm-nav-links { display: none; flex-direction: column; position: absolute; top: 60px; left: 0; right: 0; background: #fff; padding: 16px 24px; border-bottom: 1px solid #eee; gap: 16px; }
    .fm-nav-links.open { display: flex; }
    .fm-hamburger { display: block; }
    .fm-hero h1 { font-size: 34px; }
    .fm-split, .fm-thank-content { grid-template-columns: 1fr; }
    .fm-split img, .fm-thank-img { max-height: 240px; }
    .fm-menu-grid { grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); }
    .fm-section { padding: 52px 20px; }
  }
`;

const menuItems = [
  { title: "Non-Veg Starters", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzH2xif3yhfvuIp9Q1v37KMECZkpjoIkBGA&s" },
  { title: "Veg Starters",     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKZLlL2hef0YSETW9jh32DgVyw3ysoIrF0g&s" },
  { title: "Soups",            img: "https://www.eatingwell.com/thmb/LLdW9pYNi-Ikv3F24ZscgVEnqdg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spaghetti-squash-soup-57d1df1e64744dbe913baa3579c8d4ce.jpg" },
  { title: "Fish & Seafood",   img: "https://c8.alamy.com/comp/GK9MFB/angle-fish-collage-GK9MFB.jpg" },
  { title: "Main Course",      img: "https://thumbs.dreamstime.com/b/various-main-course-meals-collage-beautifully-styled-including-pasta-vegetables-meat-fish-44218711.jpg" },
  { title: "Noodles",          img: "https://img.freepik.com/free-photo/street-food-still-life_23-2151535187.jpg?w=740&q=80" },
  { title: "Salads",           img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkwuF5Ruw7o97pgLD_p7r1BjEDZqW_3TrjK60J9D7I-q4n_-VsxxN9BKwFAD9q5sJu8k&usqp=CAU" },
  { title: "Desserts",         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQihxCDBeGvV50kk9y4elNq-993AIN2XdlBw&s" },
];

const wcuCards = [
  { emoji: "🍽️", title: "Food Service",  desc: "Experience fine dining at the comfort of your home. All orders are carefully packed to give you nothing less than perfect.", special: false },
  { emoji: "🥦", title: "Fresh Food",    desc: "Fresh-cut fruits and vegetables picked directly from our partner farms — tree to plate, every single time.", special: false },
  { emoji: "🏷️", title: "Best Offers",  desc: null, special: true },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fm-fade ${className}`}>{children}</div>;
}

function Modal({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fm-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fm-modal" role="dialog" aria-modal="true">
        <div className="fm-modal-header">
          <span className="fm-modal-title">🎁 Gift Voucher</span>
          <button className="fm-modal-close" onClick={onClose}>×</button>
        </div>
        <img src="https://mobycashback.com/blog/wp-content/uploads/2022/03/Discount-Coupons-blog.jpg" alt="Discount coupon" />
        <div className="fm-modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="fm-toast">{message}</div>;
}

export default function FoodMunch() {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [showTop,   setShowTop]   = useState(false);
  const [toast,     setToast]     = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (msg) => setToast(msg);

  return (
    <>
      <style>{styles}</style>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <button
        className={`fm-back-top ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >↑</button>

      {/* NAV */}
      <nav className={`fm-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="fm-logo-text">🍴 FoodMunch</div>
        <button className="fm-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className={`fm-nav-links ${menuOpen ? "open" : ""}`}>
          {["#wcu","#menu","#delivery","#follow"].map((href, i) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {["Why Choose Us","Explore Menu","Delivery & Pay","Follow Us"][i]}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div className="fm-hero">
        <div className="fm-hero-content">
          <h1>Get <em>Delicious</em> Food Anytime</h1>
          <p>Eat Smart &amp; Healthy</p>
          <div className="fm-hero-btns">
            <button className="fm-btn fm-btn-primary" onClick={() => document.querySelector("#menu").scrollIntoView({ behavior: "smooth" })}>
              View Menu
            </button>
            <button className="fm-btn fm-btn-outline" onClick={() => showToast("🛒 Redirecting to order page…")}>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="fm-section fm-section-light" id="wcu">
        <div className="fm-container">
          <FadeSection>
            <p className="fm-section-label">Our Promise</p>
            <h2 className="fm-section-title">Why Choose Us?</h2>
            <p className="fm-section-desc">We use both original recipes and classic versions of famous food items.</p>
          </FadeSection>
          <div className="fm-cards-grid">
            {wcuCards.map((c, i) => (
              <FadeSection key={i}>
                <div className="fm-wcu-card">
                  <div className="fm-wcu-icon">{c.emoji}</div>
                  <h3>{c.title}</h3>
                  {c.special
                    ? <p>Coupons &amp; offers up to <span className="fm-offer-tag">50% OFF</span> and exclusive promo codes on all online food orders.</p>
                    : <p>{c.desc}</p>
                  }
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE MENU */}
      <section className="fm-section fm-section-white" id="menu">
        <div className="fm-container">
          <FadeSection>
            <p className="fm-section-label">Discover</p>
            <h2 className="fm-section-title">Explore Menu</h2>
          </FadeSection>
          <div className="fm-menu-grid">
            {menuItems.map((m, i) => (
              <div className="fm-menu-card" key={i} onClick={() => showToast(`📋 Viewing ${m.title}…`)}>
                <div className="fm-menu-img-wrap">
                  <img src={m.img} alt={m.title} />
                </div>
                <div className="fm-menu-card-body">
                  <h4>{m.title}</h4>
                  <a className="fm-menu-link" href="#" onClick={(e) => e.preventDefault()}>View All →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTHY FOOD */}
      <section className="fm-section fm-section-light">
        <div className="fm-container">
          <div className="fm-split">
            <FadeSection>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZpZ__p5AV5n_WkPOIUzS6ojoHG8arAGxQAw&s" alt="Fresh fruits" />
            </FadeSection>
            <FadeSection className="fm-split-content">
              <p className="fm-section-label">100% Organic</p>
              <h2>Fresh, Healthy, Organic &amp; Delicious Fruits</h2>
              <p>Say no to harmful chemicals and go fully organic with our range of fresh fruits and veggies. Pamper your body with the true and unadulterated gifts from mother nature.</p>
              <button className="fm-btn fm-btn-primary" onClick={() => showToast("▶ Opening video…")}>Watch Video</button>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* DELIVERY & PAYMENT */}
      <section className="fm-section fm-section-white" id="delivery">
        <div className="fm-container">
          <div className="fm-split">
            <FadeSection className="fm-split-content">
              <p className="fm-section-label">Fast &amp; Secure</p>
              <h2>Delivery &amp; Payment</h2>
              <p>Enjoy hassle-free payment with a wide range of options. Track your order live on a map, and get a 5% discount every time you pay online.</p>
              <button className="fm-btn fm-btn-primary" onClick={() => showToast("🛒 Redirecting to order page…")}>Order Now</button>
              <div className="fm-payment-icons">
                {[
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrzRLwWYLMY9ycTxGMqtX4Hn_9SANF-RdkA&s",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwjtPCc1j975-ayK4GPoIbV_vLUt01_8xdQ&s",
                  "https://ik.imagekit.io/wn7kjdkkwi/nopadvance-store/images/thumbs/0000376_cash-on-delivery-cod-nopcommerce-plugin_1920.jpeg",
                ].map((src, i) => <img key={i} src={src} alt="Payment method" />)}
              </div>
            </FadeSection>
            <FadeSection>
              <img src="https://static.vecteezy.com/system/resources/thumbnails/008/687/818/small/food-delivery-logo-free-vector.jpg" alt="Delivery" />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* THANK YOU */}
      <section className="fm-section fm-section-gradient">
        <div className="fm-container">
          <div className="fm-thank-content">
            <FadeSection className="fm-thank-text">
              <h2>Thank you for being a valuable customer 🙏</h2>
              <p>We have a surprise gift waiting just for you.</p>
              <button className="fm-btn fm-btn-primary" onClick={() => setShowModal(true)}>Redeem Gift 🎁</button>
            </FadeSection>
            <FadeSection>
              <img className="fm-thank-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTacHtmFJy3yTUOIkXO1sjV9fs79dwRZCnlfNucveeF2ja27J_SwiKZ4GFeF2J-ZsAK-AU&usqp=CAU" alt="Gift" />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FOLLOW US */}
      <section className="fm-section fm-section-white fm-follow" id="follow">
        <div className="fm-container">
          <FadeSection>
            <h2>Follow Us</h2>
            <div className="fm-social-row">
              {[
                { icon: "🐦", label: "Twitter",   href: "https://twitter.com" },
                { icon: "📸", label: "Instagram", href: "https://instagram.com" },
                { icon: "👥", label: "Facebook",  href: "https://facebook.com" },
              ].map((s) => (
                <a key={s.label} className="fm-social-btn" href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fm-footer">
        <p className="fm-footer-logo">🍴 FoodMunch</p>
        <p className="fm-footer-email">orderfood@foodmunch.com</p>
        <p className="fm-footer-addr">123 Ayur Vigyan Nagar, New Delhi, India</p>
      </footer>
    </>
  );
}