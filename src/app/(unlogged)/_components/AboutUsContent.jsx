"use client";

import { translation } from "@/constants/translations";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AboutUsContent = () => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    const [igorModal, setIgorModal] = useState(false);
    const [jakubModal, setJakubModal] = useState(false);
    const [agataModal, setAgataModal] = useState(false);
    const [kingaModal, setKingaModal] = useState(false);

    return (
        <main className="o-nas-page">
            <section className="o-nas-section-1">
                <img src="/desktop/about-us/(o_o).png" className="o-nas-1-img" alt="efhyiruxwbr"/>
                <img src="/mobile/about-us/oprojekcie_mb_1.png" className="o-nas-1-img-mobile" alt="wehjgw"/>
                <h1>{t.about_us.n1}</h1>
                <p>{t.about_us.t1}</p>
                <button onClick={() => document.getElementById("oNasSekcjaDwa").scrollIntoView({ behavior: "smooth" })}>{t.about_us.b1} <img src="/desktop/home/stronaglowna_strzalkawdol.png" alt="strzalka" className="strzalkaScroll"/></button>
            </section>
            <hr className="o-nas-hr"/>
            <section className="o-nas-section-2" id="oNasSekcjaDwa">
                <div className="o-nas-2-top">
                    <img src="/desktop/about-us/O_o.png" className="o-nas-2-img" alt="gyreygqr"/>
                    <img src="/mobile/about-us/oprojekcie_mb_2.png" className="o-nas-2-img-mobile" alt="erhgbjgcqucr"/>
                    <div className="kys-igor">
                        <h2>{t.about_us.n2}</h2>
                        <hr className="kys"/>
                    </div>
                    <div className="kys-igor-2">
                        <h3>{t.about_us.n2_02}</h3>
                        <hr className="o-nas-hr-mobile"/>
                        <p className="o-nas-2-p-1">{t.about_us.t2}</p>
                    </div>
                </div>
                <div className="o-nas-2-bottom">
                    <div className="o-nas-2-actual-div">
                        <h4>70405</h4>
                        <p className="o-nas-2-p-2">{t.about_us.t2_02}</p>
                    </div>
                    <div className="o-nas-2-vertical-line"></div>
                    <div className="o-nas-2-actual-div">
                        <h4>3</h4>
                        <p className="o-nas-2-p-2">{t.about_us.t2_03}</p>
                    </div>
                    <div className="o-nas-2-vertical-line"></div>
                    <div className="o-nas-2-actual-div">
                        <h4>9</h4>
                        <p className="o-nas-2-p-2">{t.about_us.t2_04}</p>
                    </div>
                </div>
            </section>
            <hr className="o-nas-hr"/>
            <section className="o-nas-section-3">
                <div className="o-nas-3-top">
                    <h2>{t.about_us.n3}</h2>
                    <hr/>
                </div>
                <div className="o-nas-3-grid">
                    <div className="o-nas-3-grid-div">
                        <img src="/desktop/about-us/zespol_igor1.png" alt="igor"/>
                        <div className="o-nas-3-grid-div-2">
                            <h4>IGOR</h4>
                            <hr/>
                            <div className="o-nas-3-grid-div-3">
                                <p>{t.about_us.t4_igor}</p>
                                <p>{t.about_us.t4_02_igor}</p>
                            </div>
                            <button onClick={() => setIgorModal(!igorModal)}>{t.about_us.t4_dowiedz}</button>
                        </div>
                    </div>
                    <div className="o-nas-3-grid-div">
                        <img src="/desktop/about-us/zespol_jakub1.png" alt="jakub"/>
                        <div className="o-nas-3-grid-div-2">
                            <h4>JAKUB</h4>
                            <hr/>
                            <div  className="o-nas-3-grid-div-3">
                                <p>{t.about_us.t4_jakub}</p>
                                <p>{t.about_us.t4_02_jakub}</p>
                            </div>
                            <button onClick={() => setJakubModal(!jakubModal)}>{t.about_us.t4_dowiedz}</button>
                        </div>
                    </div>
                    <div className="o-nas-3-grid-div">
                        <img src="/desktop/about-us/zespol_agata1.png" alt="agata"/>
                        <div className="o-nas-3-grid-div-2">
                            <h4>AGATA</h4>
                            <hr/>
                            <div  className="o-nas-3-grid-div-3">
                                <p>{t.about_us.t4_agata}</p>
                                <p>{t.about_us.t4_02_agata}</p>
                            </div>
                            <button onClick={() => setAgataModal(!agataModal)}>{t.about_us.t4_dowiedz}</button>
                        </div>
                    </div>
                    <div className="o-nas-3-grid-div">
                        <img src="/desktop/about-us/zespol_kinga1.png" alt="kinga"/>
                        <div  className="o-nas-3-grid-div-2">
                            <h4>KINGA</h4>
                            <hr/>
                            <div className="o-nas-3-grid-div-3">
                                <p>{t.about_us.t4_kinga}</p>
                                <p>{t.about_us.t4_02_kinga}</p>
                            </div>
                            <button onClick={() => setKingaModal(!kingaModal)}>{t.about_us.t4_dowiedz}</button>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {igorModal && <motion.div className="osoba-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease: "easeInOut" }}>
                        <div className="osoba-div-inside">
                            <button onClick={() => setIgorModal(!igorModal)}><img src="/desktop/about-us/zespol_x.png"/></button>
                            <img src="/desktop/about-us/zespol_igor2.png" alt="igor"/>
                            <h2>IGOR</h2>
                            <h3>{t.about_us.t_01_modal_igor}</h3>
                            <hr/>
                            <p>{t.about_us.t_02_modal_igor}</p>
                            <hr/>
                            <div>
                                <p>{t.about_us.t_03_modal_igor}</p>
                                <h4>{t.about_us.t_04_modal_igor}</h4>
                            </div>
                            <div>
                                <p>{t.about_us.t_05_modal_igor}</p>
                                <h4>{t.about_us.t_06_modal_igor}</h4>
                            </div>
                        </div>
                    </motion.div>}
                    {jakubModal && <motion.div className="osoba-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease: "easeInOut" }}>
                        <div className="osoba-div-inside">
                            <button onClick={() => setJakubModal(!jakubModal)}><img src="/desktop/about-us/zespol_x.png"/></button>
                            <img src="/desktop/about-us/zespol_jakub2.png" alt="jakub"/>
                            <h2>JAKUB</h2>
                            <h3>{t.about_us.t_01_modal_jakub}</h3>
                            <hr/>
                            <p>{t.about_us.t_02_modal_jakub}</p>
                            <hr/>
                            <div>
                                <p>{t.about_us.t_03_modal_jakub}</p>
                                <h4>{t.about_us.t_04_modal_jakub}</h4>
                            </div>
                            <div>
                                <p>{t.about_us.t_05_modal_jakub}</p>
                                <h4>{t.about_us.t_06_modal_jakub}</h4>
                            </div>
                        </div>
                    </motion.div>}
                    {agataModal && <motion.div className="osoba-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease: "easeInOut" }}>
                        <div className="osoba-div-inside">
                            <button onClick={() => setAgataModal(!agataModal)}><img src="/desktop/about-us/zespol_x.png"/></button>
                            <img src="/desktop/about-us/zespol_agata2.png" alt="agata"/>
                            <h2>AGATA</h2>
                            <h3>{t.about_us.t_01_modal_agata}</h3>
                            <hr/>
                            <p>{t.about_us.t_02_modal_agata}</p>
                            <hr/>
                            <div>
                                <p>{t.about_us.t_03_modal_agata}</p>
                                <h4>{t.about_us.t_04_modal_agata}</h4>
                            </div>
                            <div>
                                <p>{t.about_us.t_05_modal_agata}</p>
                                <h4>{t.about_us.t_06_modal_agata}</h4>
                            </div>
                        </div>
                    </motion.div>}
                    {kingaModal && <motion.div className="osoba-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7, ease: "easeInOut" }}>
                        <div className="osoba-div-inside">
                            <button onClick={() => setKingaModal(!kingaModal)}><img src="/desktop/about-us/zespol_x.png"/></button>
                            <img src="/desktop/about-us/zespol_kinga2.png" alt="kinga"/>
                            <h2>KINGA</h2>
                            <h3>{t.about_us.t_01_modal_kinga}</h3>
                            <hr/>
                            <p>{t.about_us.t_02_modal_kinga}</p>
                            <hr/>
                            <div>
                                <p>{t.about_us.t_03_modal_kinga}</p>
                                <h4>{t.about_us.t_04_modal_kinga}</h4>
                            </div>
                            <div>
                                <p>{t.about_us.t_05_modal_kinga}</p>
                                <h4>{t.about_us.t_06_modal_kinga}</h4>
                            </div>
                        </div>
                    </motion.div>}
                </AnimatePresence>
            </section>
        </main>
    )
}

export default AboutUsContent