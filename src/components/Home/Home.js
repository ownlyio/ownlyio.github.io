import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';

// images
import bg from '../../img/bg.webp';
import ownly from '../../img/ownly.webp';

function Home(props) {
    const [inputsValues, setInputsValues] = useState({
        emailAddress: '',
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

    let subscribe = (event) => {
        let button = event.target;
        button.disabled = true;

        let url = "https://ownly.market/api/store-mustachio-subscriber";
        let data = {
            email_address: inputsValues.emailAddress,
        };

        axios.post(url, data)
            .then((response) => {
                setInputsValues({ ...inputsValues, emailAddress: '', showModalSuccess: true, modalSuccessMessage: 'Thank you for subscribing to our newsletter; we\'re excited to share our latest updates and stories with you!' });
            })
            .catch(error => {
                setInputsValues({ ...inputsValues, showModalError: true, modalErrorMessage: error.message });
            })
            .then((response) => {
                button.disabled = false;
            });
    };

    return (
        <div>
            <div className="home background-image-cover" style={{"backgroundImage":"url('/img/bg-2.webp')"}}>
                <nav className={`navbar fixed-top navbar-expand-lg navbar-dark ${navbarHasBGColor || scrolled ? 'bg-color-1' : ''}`} style={{transition:'0.5s'}}>
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src={ownly} alt="" className="d-inline-block align-text-top tw-h-[44px]" />
                        </a>

                        <button className="navbar-toggler" onClick={toggleNavbarDropdown} type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-size-110">
                                <li className="nav-item">
                                    <a className="nav-link neo-ultlight" href="#roadmap">Roadmap</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link neo-ultlight" href="#">OwnChain</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link neo-ultlight" href="#">Community</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link neo-ultlight" href="#">Ecosystem</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link neo-ultlight" href="#">Resources</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container">
                    <div className="row min-vh-100 align-items-center">
                        <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h1 className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-360 font-size-md-400 font-size-lg-430 font-size-xl-440 line-height-sm-130 line-height-md-100 mb-4 pb-2 rubik-regular">Ownchain<br/> NFT and Onchain<br/> Gaming Blockchain</h1>
                            <p className="text-center text-md-start text-white font-size-110 font-size-sm-120 font-size-md-130 font-size-lg-170 line-height-sm-170 line-height-md-130 mb-4 pb-4">Recreating a Transparent, Cheating-Free, and Fun Gaming Experience for Gamers with the Use of Immutable Smart Contracts, NFT, and Crypto Technology</p>

                            <div className="text-center text-md-start">
                                <a href="#" className="btn btn-custom-1 font-size-100 font-size-sm-120 neo-regular px-5 py-3">LEARN MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <div className="position-relative py-5 overflow-hidden">
                <div className="position-absolute tw-top-[-72px]" id="roadmap"></div>

                <div className="container py-5">
                    <h2 className="text-center text-color-1 font-size-200 font-size-210 font-size-sm-220 font-size-md-230 font-size-lg-240 font-size-xl-250 mb-5 pb-2 rubik-regular">OwnChain Roadmap</h2>

                    <div className="main-timeline">
                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-0 mt-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/own-1.png" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] tw-opacity-[0.9] rounded-circle tw-bg-[#202020]" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium text-white">2024</span>
                                        <span className="year rubik-medium text-white">Q1</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-1">
                                <h5 className="title neo-bold">Platform Selection and Testnet Launch</h5>

                                <ul className="fa-ul font-size-110 text-start text-md-start">
                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Conduct thorough research to determine the most suitable platform for OwnChain, considering options such as Orbit, Cosmos, and OP (Polygon).
                                    </li>

                                    <li>
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Initiate testnet launch to assess functionality and performance.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-1 mt-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/own-1.png" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] tw-opacity-[0.9] rounded-circle tw-bg-[#202020]" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium text-white">2024</span>
                                        <span className="year rubik-medium text-white">Q2</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-0">
                                <h5 className="title neo-bold tw-ps-[44px] lg:tw-ps-[0]">Mainnet Launch and Token Migration</h5>

                                <ul className="fa-ul font-size-110 text-start text-md-end md:tw-ms-[0] md:tw-me-[44px]">
                                    <li className="mb-2">
                                        Officially launch OwnChain's mainnet.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Execute the migration process for OWN tokens, integrating them as gas within the OwnChain ecosystem.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Conduct a snapshot and airdrop campaign to distribute OWN tokens to existing addresses on OwnChain.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>

                                    <li>
                                        Introduce a simple decentralized exchange (DEX) for trading activities.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>

                            <div className="date-content order-md-1 mt-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/own-1.png" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] tw-opacity-[0.9] rounded-circle tw-bg-[#202020]" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium text-white">2024</span>
                                        <span className="year rubik-medium text-white">Q3</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-1">
                                <h5 className="title neo-bold">Growth and Expansion</h5>

                                <ul className="fa-ul font-size-110 text-start text-md-start">
                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Enhance liquidity options for trading OWN tokens.
                                    </li>

                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Pursue listings on centralized exchanges (CEX), aiming for at least one major exchange.
                                    </li>

                                    <li className="mb-2">
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Explore opportunities for venture capital (VC) funding to support project development.
                                    </li>

                                    <li>
                                        <span className="fa-li tw-pt-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                        Evaluate the feasibility of migrating NFT collections to the OwnChain platform.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="timeline d-md-flex align-items-md-center">
                            <div className="icon"></div>
                            <div className="date-content order-md-1 mt-0">
                                <div className="date-outer position-relative">
                                    <img src="/img/own-1.png" className="position-absolute tw-top-[4px] tw-left-[1px] tw-w-[102px] md:tw-w-[118px] tw-z-[2] tw-opacity-[0.9] rounded-circle tw-bg-[#202020]" />

                                    <span className="date position-relative tw-z-[3] tw-top-[26px!important] md:tw-top-[30px!important] tw-left-[-2px!important]">
                                        <span className="month rubik-medium text-white">2024</span>
                                        <span className="year rubik-medium text-white">Q4</span>
                                    </span>
                                </div>
                            </div>

                            <div className="timeline-content order-md-0">
                                <h5 className="title neo-bold">Diversification and Sustainability</h5>

                                <ul className="fa-ul font-size-110 text-start text-md-end md:tw-ms-[0] md:tw-me-[44px]">
                                    <li className="mb-2">
                                        Launch #project-tong-its, a strategic initiative aimed at further enriching the OwnChain ecosystem.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>

                                    <li className="mb-2">
                                        Strategize and execute revenue-generating activities to ensure sustainable growth.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>

                                    <li>
                                        Continuously monitor and adapt strategies to optimize project success.
                                        <span className="fa-li md:tw-pt-[2px] md:tw-left-[initial] md:tw-right-[-50px] tw-top-[2px]">
                                            <img src="/img/own-1.png" className="tw-w-[20px]" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
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