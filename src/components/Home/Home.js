import { Modal } from 'react-bootstrap'
import { useState } from "react";
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
        <div className="home background-image-cover" style={{"backgroundImage":"url('/img/bg-2.webp')"}}>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-dark ${navbarHasBGColor ? 'bg-color-1' : ''}`} style={{transition:'0.5s'}}>
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
                            <li className="nav-item mt-2 mt-lg-0">
                                <a className="nav-link neo-ultlight active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link neo-ultlight" href="#">Roadmap</a>
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

            <div className="container">
                <div className="row min-vh-100 align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                        <p className="text-center text-md-start text-white font-size-190 font-size-240 font-size-sm-360 font-size-md-400 font-size-lg-430 font-size-xl-440 line-height-sm-130 line-height-md-100 mb-4 pb-2 rubik-regular">Ownchain<br/> NFT and Onchain<br/> Gaming Blockchain</p>
                        <p className="text-center text-md-start text-white font-size-110 font-size-sm-120 font-size-md-130 font-size-lg-170 line-height-sm-170 line-height-md-130 mb-4 pb-4">Recreating a Transparent, Cheating-Free, and Fun Gaming Experience for Gamers with the Use of Immutable Smart Contracts, NFT, and Crypto Technology</p>

                        <div className="text-center text-md-start">
                            <a href="#" className="btn btn-custom-1 font-size-100 font-size-sm-120 neo-regular px-5 py-3">LEARN MORE</a>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    )
}

export default Home