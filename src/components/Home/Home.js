import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';

// images
import ownly from '../../img/ownly.webp';
import isma from '../../img/team/isma.webp';
import bernard from '../../img/team/bernard.webp';
import rico from '../../img/team/rico.webp';
import aldrick from '../../img/team/aldrick.webp';
import cedric from '../../img/team/cedric.webp';
import teamBG from '../../img/team/bg-1.webp';
import ownChainBG from '../../img/ownchain/bg-1.webp';
import arbitrum from '../../img/ownchain/arbitrum.webp';

function Home(props) {
    const [inputsValues, setInputsValues] = useState({
        email: '',
        showModalSuccess: false,
        showModalError: false,
        modalSuccessMessage: '',
        modalErrorMessage: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsValues({ ...inputsValues, [name]: value });
    }

    const [navbarHasBGColor, setNavbarHasBGColor] = useState(false)
    const toggleNavbarDropdown = () => {
        if(document.querySelectorAll(".navbar-toggler")[0].classList.contains("collapsed")) {
            setNavbarHasBGColor(false)
        } else {
            setNavbarHasBGColor(true)
        }
    }

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY || window.pageYOffset;
            setScrolled(currentPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let showRequestError = (error) => {
        let content = '';

        if(error.response) {
            if(error.response.data) {
                content = error.response.data.message;
            }
        }

        setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: content });
    };

    let subscribe = (event) => {
        let button = event.target;
        button.disabled = true;

        let url = "https://ownly.world/api/email-subscriptions";
        let data = {
            email: inputsValues.email,
        };

        axios.post(url, data)
            .then((response) => {
                setInputsValues({ ...inputsValues, email: '', showModalSuccess: true, modalSuccessMessage: 'Thank you for subscribing to our newsletter; we\'re excited to share our latest updates and stories with you!' });
            })
            .catch(error => {
                console.log(error)
                showRequestError(error);
            })
            .then((response) => {
                button.disabled = false;
            });
    };

    const [countdownTime, setCountdownTime] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    })

    let padZeroes = (number) => {
        number = number.toString();

        while(number.length < 2) {
            number = "0" + number;
        }

        return number;
    };

    let startCountdown = async (futureDate) => {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
            const data = await response.json();
            const currentTime = new Date(data.utc_datetime).getTime();

            const futureTime = new Date(futureDate).getTime();

            const remaining_time = Math.floor((futureTime - currentTime) / 1000);

            let countDownDate = new Date().getTime() + (remaining_time * 1000);

            let x = setInterval(function() {
                let now = new Date().getTime();
                let distance = countDownDate - now;

                setCountdownTime({
                    days: padZeroes(Math.floor(distance / (1000 * 60 * 60 * 24))),
                    hours: padZeroes(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                    minutes: padZeroes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
                    seconds: padZeroes(Math.floor((distance % (1000 * 60)) / 1000)),
                })

                if (distance < 0) {
                    clearInterval(x);
                }
            }, 500);
        } catch (error) {
            console.error('Error fetching current time:', error);
            return null;
        }
    };

    useEffect(() => {
        startCountdown("2024-06-15T11:00:00+00:00");
    }, [])

    return (
        <div>
            <div className="home background-image-cover" style={{"backgroundImage":"url('/img/hero/bg.webp')"}}>
                <nav className={`navbar fixed-top navbar-expand-lg navbar-dark ${navbarHasBGColor || scrolled ? 'bg-color-1' : ''}`} style={{transition:'0.5s'}}>
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src={ownly} className="d-inline-block align-text-top tw-h-[44px]" alt="Ownly" />
                        </a>

                        <button className="navbar-toggler" onClick={toggleNavbarDropdown} type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-size-110 align-items-center">
                                <li className="nav-item px-2">
                                    <a className="nav-link neo-ultlight font-size-130 text-white" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-2">
                                    <a className="nav-link neo-ultlight font-size-130 text-white" href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item px-2 dropdown">
                                    <a className="nav-link dropdown-toggle neo-ultlight text-white text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Get involved
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div>Run a node</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div>Build with us</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Join community</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item ps-2 dropdown">
                                    <a className="nav-link dropdown-toggle neo-ultlight text-white text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Learn
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://twitter.com/ownlyio/status/1774617875975979388" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Node key NFT presale</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly/ownchain/intro" target="_blank" rel="noreferrer">
                                                <div className="pe-3">About Ownchain</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">
                                                <div className="pe-3">About Ownly</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://ownlyio.gitbook.io/ownly/all-about-ownly/ecosystem" target="_blank" rel="noreferrer">
                                                <div className="pe-3">Ownly Ecosystem</div>
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container">
                    <div className="row min-vh-100 align-items-center tw-pt-[10px]">
                        <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6 py-5">
                            <div className="py-5">
                                <h1 className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-340 font-size-md-360 font-size-lg-380 font-size-xl-400 line-height-90 mb-4">OWNCHAIN<br/> NFT and Onchain<br/> Gaming Blockchain</h1>
                                <p className="text-center text-md-start text-white font-size-130 font-size-sm-140 font-size-lg-170 line-height-100 mb-4 pb-2">Recreating a Transparent, Cheating-Free, and Fun Gaming Experience for Gamers with the Use of Immutable Smart Contracts, NFT, and Crypto Technology</p>

                                <div className="text-center text-md-start mb-3 tw-w-[initial]">
                                    <a href="javascript:void(0);" className="btn btn-custom-1 font-size-sm-120 tw-rounded-[15px] neo-regular tw-w-[100%] md:tw-min-w-[590px] px-5 py-3">
                                        {/*<div>Join Node Key NFT Presale</div>*/}
                                        <div>Node Key NFT Presale starts on June 15th, 11:00AM UTC</div>
                                        <div className="tw-text-[0.9em]">{ countdownTime.days }D : { countdownTime.hours }H : { countdownTime.minutes }M : { countdownTime.seconds }S</div>
                                    </a>
                                </div>

                                <div className="mb-4 d-flex justify-content-center justify-content-md-start">
                                    <a href="https://ownlyio.gitbook.io/ownly/ownchain/intro" target="_blank" rel="noreferrer" className="btn btn-custom-2 font-size-sm-120 tw-rounded-[15px] neo-regular tw-w-[100%] md:tw-min-w-[590px] tw-h-[105px] sm:tw-h-[119px] md:tw-h-[90px] d-flex justify-content-center align-items-center px-5 py-3">Learn More About OWNCHAIN</a>
                                </div>

                                <p className="text-center text-md-start font-size-100 neo-ultlight text-white">Leveraging Arbitrum Orbit technology by Offchain Labs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <div className="position-relative py-5 overflow-hidden">
                <div className="position-absolute tw-top-[-72px]" id="roadmap"></div>

                <div className="container py-5">
                    <h2 className="text-center font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 mb-5 pb-4 neo-regular">OwnChain Roadmap</h2>

                    <div className="main-timeline">
                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-0 mt-0 mb-3 mb-md-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/roadmap/own.webp" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] rounded-circle tw-bg-[#1f3863]" alt="Ownly" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium position-relative tw-z-[4] text-white">2024</span>
                                        <span className="year rubik-medium position-relative tw-z-[4] text-white">Q1</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-1">
                                <h5 className="neo-regular font-size-130 font-size-sm-140 font-size-lg-170 mb-4">Platform Selection and Testnet Launch</h5>

                                <ul className="fa-ul font-size-110 font-size-lg-120 text-start text-md-start">
                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Conduct thorough research on OwnChain with Arbitrum Orbit Chain.
                                    </li>

                                    <li>
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Initiate testnet launch to assess functionality and performance.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-1 mt-0 mb-3 mb-md-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/roadmap/own.webp" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] rounded-circle tw-bg-[#1f3863]" alt="Ownly" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium position-relative tw-z-[4] text-white">2024</span>
                                        <span className="year rubik-medium position-relative tw-z-[4] text-white">Q2</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-0">
                                <h5 className="neo-regular font-size-130 font-size-sm-140 font-size-lg-170 mb-4">Mainnet Launch and Token Migration</h5>

                                <ul className="fa-ul font-size-110 font-size-lg-120 text-start text-md-end md:tw-ms-[0] md:tw-me-[44px]">
                                    <li className="mb-2">
                                        Officially launch OwnChain's mainnet.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Execute the migration process for OWN tokens, integrating them as gas within the OwnChain ecosystem.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Conduct a snapshot and airdrop campaign to distribute OWN tokens to existing addresses on OwnChain.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>

                                    <li>
                                        Introduce a simple decentralized exchange (DEX) for trading activities.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-1 mt-0 mb-3 mb-md-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/roadmap/own.webp" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] rounded-circle tw-bg-[#1f3863]" alt="Ownly" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium position-relative tw-z-[4] text-white">2024</span>
                                        <span className="year rubik-medium position-relative tw-z-[4] text-white">Q3</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-1">
                                <h5 className="neo-regular font-size-130 font-size-sm-140 font-size-lg-170 mb-4">Growth and Expansion</h5>

                                <ul className="fa-ul font-size-110 font-size-lg-120 text-start text-md-start">
                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Enhance liquidity options for trading OWN tokens.
                                    </li>

                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Pursue listings on centralized exchanges (CEX), aiming for at least one major exchange.
                                    </li>

                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Explore opportunities for venture capital (VC) funding to support project development.
                                    </li>

                                    <li>
                                        <span className="fa-li tw-pt-[4px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                        Evaluate the feasibility of migrating NFT collections to the OwnChain platform.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>
                            <div className="date-content order-md-1 mt-0 mb-3 mb-md-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/roadmap/own.webp" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] rounded-circle tw-bg-[#1f3863]" alt="Ownly" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium position-relative tw-z-[4] text-white">2024</span>
                                        <span className="year rubik-medium position-relative tw-z-[4] text-white">Q4</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-0">
                                <h5 className="neo-regular font-size-130 font-size-sm-140 font-size-lg-170 mb-4">Diversification and Sustainability</h5>

                                <ul className="fa-ul font-size-110 font-size-lg-120 text-start text-md-end md:tw-ms-[0] md:tw-me-[44px]">
                                    <li className="mb-2">
                                        Launch #project-tong-its, a strategic initiative aimed at further enriching the OwnChain ecosystem.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Strategize and execute revenue-generating activities to ensure sustainable growth.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>

                                    <li>
                                        Continuously monitor and adapt strategies to optimize project success.
                                        <span className="fa-li md:tw-pt-[4px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/roadmap/own.webp" className="tw-w-[20px]" alt="Ownly" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="background-image-cover position-relative pt-5 pb-4 overflow-hidden" style={{backgroundImage:"url('" + teamBG + "')"}}>
                <div className="position-absolute tw-top-[-72px]" id="team"></div>

                <div className="container pt-5">
                    <h2 className="neo-regular text-center text-white font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 mb-5 pb-4">Meet Our Team</h2>

                    <div className="row justify-content-center">
                        <div className="col-10 col-sm-12 col-xl-11 col-xxl-10">
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-4 px-3 px-md-4 px-lg-5 mb-5 pb-4">
                                    <a href="https://www.linkedin.com/in/ismaeljerusalem" target="_blank" rel="noreferrer" className="text-decoration-none">
                                        <div className="rounded-circle tw-border-[2px] tw-border-[#ffffff] w-100 tw-pt-[100%] background-image-cover mb-4" style={{backgroundImage:"url('" + isma + "')"}}></div>

                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-center neo-bold mb-2">Ismael<br className="d-none d-lg-block d-xl-none"></br> Jerusalem</p>
                                        <p className="font-size-110 font-size-lg-120 text-white text-center neo-regular">Chief Executive Officer</p>
                                    </a>
                                </div>

                                <div className="col-sm-6 col-md-4 px-3 px-md-4 px-lg-5 mb-5 pb-4">
                                    <a href="https://www.linkedin.com/in/bernhistorillo" target="_blank" rel="noreferrer" className="text-decoration-none">
                                        <div className="rounded-circle tw-border-[2px] tw-border-[#ffffff] w-100 tw-pt-[100%] background-image-cover mb-4" style={{backgroundImage:"url('" + bernard + "')"}}></div>

                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-center neo-bold mb-2">Bernard<br className="d-none d-lg-block d-xl-none"></br> Historillo</p>
                                        <p className="font-size-110 font-size-lg-120 text-white text-center neo-regular">Chief Technology Officer</p>
                                    </a>
                                </div>

                                <div className="col-md-4 px-4 px-lg-5 mb-5 pb-4">
                                    <a href="https://www.linkedin.com/in/ricoz" target="_blank" rel="noreferrer" className="text-decoration-none">
                                        <div className="rounded-circle tw-border-[2px] tw-border-[#ffffff] w-100 tw-pt-[100%] background-image-cover mb-4" style={{backgroundImage:"url('" + rico + "')"}}></div>

                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-center neo-bold mb-2">Rico<br className="d-none d-lg-block d-xl-none"></br> Zuñiga</p>
                                        <p className="font-size-110 font-size-lg-120 text-white text-center neo-regular">Technical Advisor</p>
                                    </a>
                                </div>

                                <div className="col-md-4 px-4 px-lg-5 mb-5 pb-4">
                                    <a href="https://www.linkedin.com/in/aldrickb" target="_blank" rel="noreferrer" className="text-decoration-none">
                                        <div className="rounded-circle tw-border-[2px] tw-border-[#ffffff] w-100 tw-pt-[100%] background-image-cover mb-4" style={{backgroundImage:"url('" + aldrick + "')"}}></div>

                                        <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-center neo-bold mb-2">Aldrick<br className="d-none d-lg-block d-xl-none"></br> Bonaobra</p>
                                        <p className="font-size-110 font-size-lg-120 text-white text-center neo-regular">Blockchain Consultant</p>
                                    </a>
                                </div>

                                <div className="col-md-4 px-4 px-lg-5 mb-5 pb-4">
                                    <div className="rounded-circle tw-border-[2px] tw-border-[#ffffff] w-100 tw-pt-[100%] background-image-cover mb-4" style={{backgroundImage:"url('" + cedric + "')"}}></div>

                                    <p className="font-size-130 font-size-sm-140 font-size-lg-170 text-white text-center neo-bold mb-2">Cedric<br className="d-none d-lg-block d-xl-none"></br> Naño</p>
                                    <p className="font-size-110 font-size-lg-120 text-white text-center neo-regular">Full Stack Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OwnChain */}
            <div className="position-relative background-image-cover" style={{backgroundImage:"url('" + ownChainBG + "')"}}>
                <div className="position-absolute tw-top-[-72px]" id="ownchain"></div>

                <div className="container">
                    <div className="row justify-content-end align-items-center tw-min-h-[calc(100vh-71.6px)]">
                        <div className="col-md-12 col-lg-9 col-xl-8 col-xxl-10 py-5">
                            <div className="text-center text-md-end pt-4 pb-5 py-sm-5">
                                <p className="neo-regular text-white font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 line-height-sm-130 line-height-md-100 px-4 px-md-0 mb-5">Empowering the Future of Blockchain with OwnChain</p>
                                <p className="text-white font-size-110 font-size-lg-120 px-4 px-md-0 mb-5">OWNCHAIN is redefining the intersection of blockchain gaming and NFTs, enabling millions of gamers to effortlessly engage in the open trade of in-game items and digital assets without the complexity of crypto wallets. This groundbreaking platform, developed by Ownly, is rooted in a philosophy of seamless integration, allowing traditional and blockchain gamers to navigate the digital economy with ease. By eliminating the barriers to entry, OWNCHAIN ensures that every player can fully participate in the value creation and trading processes that define the new era of gaming.</p>

                                <div className="text-center text-md-end">
                                    <a href="javascript:void(0);" className="btn btn-custom-1 font-size-100 font-size-sm-120 neo-regular px-5 py-3">
                                        <div>Node Key NFT Presale starts on June 15th, 11:00AM UTC</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OwnChain Features */}
            <div className="container py-5">
                <div className="row justify-content-center pt-5">
                    <h2 className="neo-regular text-center font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 mb-5">Ownchain Core Technology</h2>
                    <p className="font-size-110 font-size-lg-120 text-center text-center mb-5 pb-3">OWNCHAIN is built on the Nitro framework, derived from Arbitrum, enhancing blockchain gaming and NFT transactions with efficient and secure operations.</p>

                    <div className="row justify-content-center align-items-stretch">
                        <div className="col-md-6 col-lg-3 px-2 mb-5">
                            <div className="card h-100 tw-rounded-[20px] tw-bg-transparent tw-border-[rgb(23,42,74,0.5)] tw-border-[2px]">
                                <div className="card-body">
                                    <div className="p-5 mb-4 tw-border-[rgb(34,34,34,0.1)] tw-border-solid tw-rounded-[20px] tw-border-[1px]" style={{background:'linear-gradient(220deg, rgba(23,42,74,1) 25%, rgba(23,42,74,0.7) 100%)'}}>
                                        <img src="/img/ownchain/consensus.webp" className="w-100" alt="OwnChain" />
                                    </div>

                                    <p className="font-size-110 font-size-lg-120 text-center neo-bold text-center mb-3">OWNCHAIN<br/> Data Consensus</p>
                                    <p className="font-size-110 font-size-lg-120 text-center text-center mb-0">OWNCHAIN employs the Anytrust protocol, managing data availability through selected entities. This ensures optimized transaction costs while maintaining security.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 px-2 mb-5">
                            <div className="card h-100 tw-rounded-[20px] tw-bg-transparent tw-border-[rgb(23,42,74,0.5)] tw-border-[2px]">
                                <div className="card-body">
                                    <div className="p-5 mb-4 tw-border-[rgb(23,42,74,0.5)] tw-border-solid tw-rounded-[20px] tw-border-[1px]" style={{background:'linear-gradient(220deg, rgba(23,42,74,1) 25%, rgba(23,42,74,0.7) 100%)'}}>
                                        <img src="/img/ownchain/layers.webp" className="w-100" alt="OwnChain" />
                                    </div>

                                    <p className="font-size-110 font-size-lg-120 text-center neo-bold text-center mb-3">OWNCHAIN<br/> Layers</p>
                                    <p className="font-size-110 font-size-lg-120 text-center text-center mb-0">OWNCHAIN comprises two layers: the Essential Layer for cost-effectiveness and the Sovereign Layer for enhanced security. Both integrate seamlessly to ensure optimal performance.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 px-2 mb-5">
                            <div className="card h-100 tw-rounded-[20px] tw-bg-transparent tw-border-[rgb(23,42,74,0.5)] tw-border-[2px]">
                                <div className="card-body">
                                    <div className="p-5 mb-4 tw-border-[rgb(34,34,34,0.1)] tw-border-solid tw-rounded-[20px] tw-border-[1px]" style={{background:'linear-gradient(220deg, rgba(23,42,74,1) 25%, rgba(23,42,74,0.7) 100%)'}}>
                                        <img src="/img/ownchain/orbiting.webp" className="w-100" alt="OwnChain" />
                                    </div>

                                    <p className="font-size-110 font-size-lg-120 text-center neo-bold text-center mb-3">Orbiting<br/> OWNCHAIN</p>
                                    <p className="font-size-110 font-size-lg-120 text-center text-center mb-0">Building on Arbitrum Orbit, OWNCHAIN enables independent Rollup and AnyTrust chains. These tailored solutions cater specifically to gaming and NFT sectors.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 px-2 mb-5">
                            <div className="card h-100 tw-rounded-[20px] tw-bg-transparent tw-border-[rgb(23,42,74,0.5)] tw-border-[2px]">
                                <div className="card-body">
                                    <div className="p-5 mb-4 tw-border-[rgb(34,34,34,0.1)] tw-border-solid tw-rounded-[20px] tw-border-[1px]" style={{background:'linear-gradient(220deg, rgba(23,42,74,1) 25%, rgba(23,42,74,0.7) 100%)'}}>
                                        <img src="/img/ownchain/support.webp" className="w-100" alt="OwnChain" />
                                    </div>

                                    <p className="font-size-110 font-size-lg-120 text-center neo-bold text-center mb-3">OWNCHAIN<br/> Ecosystem and Support</p>
                                    <p className="font-size-110 font-size-lg-120 text-center text-center mb-0">Supported directly by Ownly, OWNCHAIN benefits from the Anytrust model for operational speed and reduced costs. Close collaboration ensures rapid evolution and strong support for developers and users alike.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OwnChain Architecture */}
            <div className="container-fluid">
                <div className="row tw-min-h-[calc(100vh-78px)] align-items-stretch">
                    <div className="col-lg-7 bg-color-1 d-flex justify-content-end">
                        <div className="lg:tw-max-w-[calc((960px/12)*7)] xl:tw-max-w-[calc((1140px/12)*7)] xxl:tw-max-w-[calc((1320px/12)*7)] w-100 tw-px-[8px]">
                            <div className="h-100 d-flex align-items-center">
                                <div className="py-5 pe-md-5 text-center text-md-start">
                                    <div className="py-5">
                                        <p className="neo-regular text-white font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 line-height-sm-130 line-height-md-100 mb-5">OwnChain's Blueprint: Unleashing Blockchain Potential</p>
                                        <p className="text-white font-size-110 font-size-lg-120 px-4 px-md-0 mb-5">OwnChain's architecture is built upon Arbitrum's Layer 2 scaling technology, which optimizes transaction throughput and minimizes costs while maintaining Ethereum's security guarantees. By utilizing a combination of rollups and off-chain computation, OwnChain achieves a balance between scalability and decentralization, enabling fast and cost-effective transactions without sacrificing security.</p>

                                        <div className="text-center text-md-start">
                                            <a href="javascript:void(0);" className="btn btn-custom-1 font-size-100 font-size-sm-120 neo-regular px-5 py-3">
                                                <div>Presale starts on June 15th, 11:00AM UTC</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 background-image-cover p-0 tw-min-h-[calc(100vh-78px)] lg:tw-min-h-[initial]" style={{backgroundImage:"url('" + arbitrum + "')"}}></div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-color-1 py-5">
                <div className="container py-3">
                    <div className="row justify-content-center align-items-center mb-4">
                        <div className="col-7 col-sm-5 col-md-3 mb-5 mb-md-0">
                            <div className="d-flex justify-content-center">
                                <div className="mb-4 mb-lg-5 text-center">
                                    <a href="#" className="text-decoration-none">
                                        <img src={ownly} className="tw-w-[100%] lg:tw-w-[80%] xl:tw-w-[70%]" alt="Ownly" />
                                    </a>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center flex-wrap font-size-130 font-size-md-110 font-size-lg-140">
                                <div className="px-3">
                                    <a href="https://t.me/ownlyio" target="_blank" rel="noreferrer"
                                       className="text-white text-decoration-none">
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </a>
                                </div>

                                <div className="px-3">
                                    <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer" className="text-white text-decoration-none">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </div>

                                <div className="px-3">
                                    <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer"
                                       className="text-white text-decoration-none">
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 px-lg-5">
                            <div className="text-white font-size-110 font-size-lg-120 text-center mb-5 mb-md-0">
                                <div className="mb-4">
                                    <a href="mailto:support@ownly.io" target="_blank" rel="noreferrer" className="d-flex justify-content-center justify-content-md-start text-decoration-none text-white mb-4">
                                        <div className="tw-min-w-[23px] text-center">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div className="ps-4">
                                            support@ownly.io
                                        </div>
                                    </a>
                                </div>

                                <div className="">
                                    <div className="d-flex mb-2">
                                        <div className="flex-fill">
                                            <input className="form-control px-3 py-md-3 tw-h-[60px]" name="email" value={ inputsValues.email } onChange={handleInputChange} placeholder="Enter your email address" style={{borderRadius:'.25rem 0px 0px .25rem'}} />
                                        </div>
                                        <div>
                                            <button className="btn btn-custom-1 px-3 py-md-3 tw-h-[60px]" onClick={subscribe} style={{borderRadius:'0px .25rem .25rem 0px'}}>Subscribe</button>
                                        </div>
                                    </div>
                                    <p className="text-white text-center text-md-start font-size-80">By joining our Ownly VIP list, you agree to receive news and updates from Ownly via our monthly newsletter.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="d-flex justify-content-center">
                                <div className="">
                                    <div className="d-flex flex-column justify-content-center align-items-center align-items-md-start flex-wrap font-size-110 font-size-lg-120 mb-4 mb-lg-0">
                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">Run a Node</a>
                                        </div>

                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://ownlyio.gitbook.io/ownly" target="_blank" rel="noreferrer">Build With Us</a>
                                        </div>

                                        <div className="px-2 mb-2">
                                            <a className="text-decoration-none text-white" href="https://t.me/ownlyio" target="_blank" rel="noreferrer">Join Community</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-white font-size-110 font-size-lg-120">
                            © 2024 Ownly.<br className="d-block d-lg-none" /> All rights reserved
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={ inputsValues.showModalError } onHide={handleInputChange} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5">
                    <div className="text-center">
                        <i className="fas fa-times-circle font-size-400 text-color-1 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2">{ inputsValues.modalErrorMessage }</p>

                        <button className="btn btn-custom-1 px-5 py-2 font-size-110 mx-1" onClick={ () => setInputsValues({ ...inputsValues, showModalError: false }) }>Close</button>
                    </div>
                </div>
            </Modal>

            <Modal show={ inputsValues.showModalSuccess } onHide={handleInputChange} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5 border-0">
                    <div className="text-center">
                        <i className="fas fa-check-circle font-size-400 text-color-1 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2">{ inputsValues.modalSuccessMessage }</p>

                        <button className="btn btn-custom-1 px-5 py-2 font-size-110 mx-1" onClick={ () => setInputsValues({ ...inputsValues, showModalSuccess: false }) }>Okay</button>
                    </div>
                </div>
            </Modal>

            {/*<div className="pe-md-5">*/}
            {/*    <div className="d-flex mb-2">*/}
            {/*        <div className="flex-fill">*/}
            {/*            <input className="form-control font-size-90 font-size-sm-120 px-4 py-md-3" name="emailAddress" placeholder="Enter Your Email Address Here" value={ inputsValues.emailAddress } onChange={handleInputChange} style={{"borderRadius":"15px 0 0 15px"}} />*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <button className="btn btn-custom-1 font-size-90 font-size-sm-120 px-4 py-md-3" onClick={subscribe} style={{"borderRadius":"0 15px 15px 0"}}>SUBSCRIBE <span className="d-none d-sm-inline-block">NOW</span></button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <p className="text-white line-height-110 font-size-90 font-size-xl-100">By joining our Ownly VIP list, you agree to receive news and updates from Ownly via our monthly newsletter. You can opt out of our marketing emails anytime..</p>*/}
            {/*</div>*/}

            {/*<div className="row align-items-end py-5">*/}
            {/*    <div className="col-6 col-md-5 col-lg-3">*/}
            {/*        <p className="text-white font-size-130 mb-0">#OwnlyGaming</p>*/}
            {/*    </div>*/}

            {/*    <div className="col-6">*/}
            {/*        <p className="text-white font-size-100 mb-1">Connect with us:</p>*/}

            {/*        <div className="d-flex">*/}
            {/*            <div className="me-4">*/}
            {/*                <a href="https://facebook.com/ownly.io" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-facebook-f text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://twitter.com/ownlyio" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-twitter text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://www.instagram.com/ownly.io" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-instagram text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}

            {/*            <div className="me-4">*/}
            {/*                <a href="https://www.linkedin.com/company/ownlyio" target="_blank" rel="noreferrer" className="text-decoration-none">*/}
            {/*                    <i className="fa-brands fa-linkedin-in text-white font-size-130"></i>*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Home