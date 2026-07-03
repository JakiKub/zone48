"use client";

import Link from "next/link";
import { useState } from "react";
import { translation } from "@/constants/translations";
import { useSearchParams } from "next/navigation";

const HomeContent = () => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    
    const t = translation[isPolish];
    const miasto = t.home.miasto[index];

    const przesunieciePrawo = () => {
        setFade(false);

        setTimeout(() => {
            setIndex((prev) => (prev + 1) % t.home.miasto.length);
            setFade(true);
        }, 300);
    }

    const przesuniecieLewo = () => {
        setFade(false);

        setTimeout(() => {
            setIndex((prev) => prev === 0 ? t.home.miasto.length - 1 : prev - 1);
            setFade(true);
        }, 300)
    }

    const miastoKlik = (targetIndex) => {
        setFade(false);

        setTimeout(() => {
            setIndex(targetIndex);
            setFade(true);
        }, 300);
    }
    
    return (
        <main className="home-page">
            <section className="home-1">
                <div className="home-1-wrapper-1">
                    <h1>{t.home.n1}</h1>
                    <p>{t.home.t1}</p>
                    <button onClick={() => document.getElementById("homeTwo").scrollIntoView({ behavior: "smooth" })}>{t.home.b1} <img src="/desktop/home/stronaglowna_strzalkawdol.png" alt="strzalka" className="strzalkaScroll"/></button>
                </div>
                <div className="home-1-wrapper-2">
                    <hr className="home-1-hr-long"/>
                    <h2>{t.home.n1_2}</h2>
                    <hr className="home-1-hr-short"/>
                    <div>
                        {/* tutaj naglowki */}
                    </div>
                    <hr className="home-1-hr-long"/>
                </div>
            </section>
            <section className="home-2" id="homeTwo">
                <h2>{t.home.n2}</h2>
                <div>
                    <div className="home-2-wrapper">
                        <hr/>
                        <div className="home-2-wrapper-2">
                            <h3 className="first-h3">01</h3>
                            <h3 className="second-h3">{t.home.n2_01}</h3>
                            <p>{t.home.t2_01}</p>
                        </div>
                        <hr/>
                    </div>
                    <div className="home-2-wrapper">
                        <hr/>
                        <div className="home-2-wrapper-2">
                            <h3 className="first-h3">02</h3>
                            <h3 className="second-h3">{t.home.n2_02}</h3>
                            <p>{t.home.t2_02}</p>
                        </div>
                        <hr/>
                    </div>
                    <div className="home-2-wrapper">
                        <hr/>
                        <div className="home-2-wrapper-2">
                            <h3 className="first-h3">03</h3>
                            <h3 className="second-h3">{t.home.n2_03}</h3>
                            <p>{t.home.t2_03}</p>
                        </div>
                        <hr/>
                    </div>
                </div>
            </section>
            <section className="home-3">
                <img src="/mobile/home/sekcja_3_slogan.png" alt="slogan" className="zdj-1"/>
                <img src="/mobile/home/glowna_zdj_logowanie.png" alt="tlo" className="zdj-2"/>
                <div className="home-3-another-wrapper">
                    <h2>{t.home.n3}</h2>
                    <hr className="hr-3-1"/>
                </div>
                <h3>{t.home.n3_1}</h3>
                <hr className="hr-3-2"/>
                <div className="home-3-wrapper">
                    <p>{t.home.t3_01}</p>
                    <p>{t.home.t3_02}</p>
                    <p>{t.home.t3_03}</p>
                </div>
                <div className="home-3-wrapper-2">
                    <button>{t.home.b3_01}</button>
                    <button>{t.home.b3_02}</button>
                </div>
            </section>
            <section className="home-4">
                <div className="home-4-another-wrapper">
                    <h2>{t.home.n4}</h2>
                    <hr/>
                </div>
                <div className="strzalki-div">
                    <button onClick={() => przesuniecieLewo()}><img src="/mobile/home/strzalka_lewo.png" alt="strzalka"/></button>
                    <button onClick={() => przesunieciePrawo()}><img src="/mobile/home/strzalka_prawo.png" alt="strzlka"/></button>
                </div>
                <h3 className={fade ? "fade-in" : "fade-out"}><img src="/desktop/home/stronaglowna_flagapl.png" alt="flaga"/>{miasto.n4_1}</h3>
                <img src={miasto.imgMobile} alt="miasto" className={fade ? "fade-in" : "fade-out"} id="miastoImg"/>
                <p className={fade ? "fade-in" : "fade-out"}>{miasto.t4}</p>
                {/* dodac odpowiednie path w translations.js i je indexowac i potem mniej wiecej tak miasto.path}${isPolish ? "" : "?lang=en"}... no i pewnie flage tez */}
                <Link href="/" className="home-miasto-discover">{t.home.b4}</Link>
                <img src="/desktop/home/stronaglowna_mapapl_v2.png" alt="mapa" className={`mapa ${fade ? "fade-in" : "fade-out"}`}></img>
                <div className="gfhayrfgysrfsg">
                    {t.home.miasto.map((_, i) => (
                        <button 
                            key={i}
                            className={`miasto-button ${index === i ? "active" : ""}`} 
                            onClick={() => miastoKlik(i)}
                        ></button>
                    ))}
                </div>
            </section>
            <section className="home-5">
                <img src="/mobile/home/glowna_zdj_projekt.png" alt="jakies zdjecie"/>
                <div className="home-5-wrapper-mobile">
                    <h2>{t.home.n5}</h2>
                    <hr className="home-5-hr"/>
                </div>
                <h3>{t.home.n5_1}</h3>
                <hr className="hr-kolejne"/>
                <div className="home-5-wrapper">
                    <p>{t.home.t5_01}</p>
                    <p>{t.home.t5_02}</p>
                </div>
                <button>{t.home.b5}</button>
            </section>
        </main>
    )
}

export default HomeContent