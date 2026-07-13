"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { translation } from "@/constants/translations";

const Footer = () => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    return (
        <footer className="footer">
            <section className="footer-top">
                {/* <img src="/desktop/home/stronaglowna_stopka_sloganlogo.png" alt="propaganda"/> */}
                <picture>
                    <source srcSet="/mobile/home/navbar_tel_stopka.png" media="(max-width: 768px)"/>
                    <img src="/desktop/home/stronaglowna_stopka_sloganlogo.png" alt="propaganda"/>
                </picture>
                <div>
                    <nav>
                        <p>{t.footer.n1}</p>
                        <Link href={isPolish ? "/" : "/?lang-en"} className="footer-link">{t.footer.l1}</Link>
                        <Link href={isPolish ? "/o-nas" : "/o-nas?lang=en"} className="footer-link">{t.footer.l2}</Link>
                        <Link href="/" className="footer-link">{t.footer.l3}</Link>
                        <Link href="/" className="footer-link">Podcast</Link>
                        <Link href={isPolish ? "/kontakt" : "/kontakt?lang=en"} className="footer-link">{t.footer.l4}</Link>
                    </nav>
                    <nav>
                        <p>{t.footer.n2}</p>
                        <Link href="/" className="footer-link">{t.footer.l5}</Link>
                        <Link href="/" className="footer-link">{t.footer.l6}</Link>
                        <Link href="/" className="footer-link">FAQ</Link>
                    </nav>
                    <nav>
                        <p>{t.footer.n3}</p>
                        <Link href="https://www.tiktok.com/@wearezone.48?_r=1&_t=ZN-97jbsOxf12k" className="footer-link">TikTok</Link>
                        <Link href="https://www.instagram.com/wearezone.48?igsh=YjVzbDFzOXRoczBi" className="footer-link">Instagram</Link>
                        <Link href="/" className="footer-link">Facebook</Link>
                        <Link href="https://www.youtube.com/@chaoticism" className="footer-link">Youtube</Link>
                        <Link href="/" className="footer-link">Spotify</Link>
                    </nav>
                </div>
            </section>
            <hr></hr>
            <section className="footer-bottom">
                <nav>
                    <Link href="/" className="footer-link-2">{t.footer.regulamin}</Link>
                    <Link href="/" className="footer-link-2">{t.footer.cookies}</Link>
                    <Link href="/" className="footer-link-2">{t.footer.cookie_settings}</Link>
                </nav>
                <hr></hr>
                <p>© 2026, Zone 48. {t.footer.rights}</p>
            </section>  
        </footer>
    )
}

export default Footer