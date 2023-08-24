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
        <div className="home background-image-cover" style={{"backgroundImage":"url('" + bg + "')"}}>
            <div className="container">
                <div className="d-flex flex-column justify-content-between min-vh-100">
                    <div className="row align-items-center py-5">
                        <div className="col-7 col-sm-6 col-md-5 col-lg-3">
                            <img src={ownly} width="160" alt="Ownly" />
                        </div>

                        <div className="col-5 col-sm-6">
                            <p className="text-white mb-0">See previous website <i className="fa-light fa-arrow-right-long ps-3"></i></p>
                        </div>
                    </div>

                    <div className="py-4">
                        <div className="row">
                            <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                                <p className="text-white font-size-190 font-size-240 font-size-sm-300 font-size-md-380 font-size-lg-450 line-height-100 mb-4 pb-lg-2">Stay Tuned.<br/> Our New Website<br/> is Coming Soon..</p>

                                <div className="pe-md-5">
                                    <div className="d-flex mb-2">
                                        <div className="flex-fill">
                                            <input className="form-control font-size-110 font-size-sm-120 px-4 py-md-3" name="emailAddress" placeholder="Enter Your Email Address Here" value={ inputsValues.emailAddress } onChange={handleInputChange} style={{"borderRadius":"15px 0 0 15px"}} />
                                        </div>
                                        <div>
                                            <button className="btn btn-custom-1 font-size-90 font-size-sm-100 px-4 py-md-3" onClick={subscribe} style={{"borderRadius":"0 15px 15px 0"}}>SUBSCRIBE <span className="d-none d-sm-inline-block">NOW</span></button>
                                        </div>
                                    </div>

                                    <p className="text-white line-height-110 font-size-90 font-size-xl-100">By joining our Ownly VIP list, you agree to receive news and updates from Ownly via our monthly newsletter. You can opt out of our marketing emails anytime.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-end py-5">
                        <div className="col-6 col-md-5 col-lg-3">
                            <p className="text-white font-size-130 mb-0">#OwnlyGaming</p>
                        </div>

                        <div className="col-6">
                            <p className="text-white font-size-100 mb-1">Connect with us:</p>

                            <div className="d-flex">
                                <div className="me-4">
                                    <i className="fa-brands fa-facebook-f text-white font-size-130"></i>
                                </div>

                                <div className="me-4">
                                    <i className="fa-brands fa-twitter text-white font-size-130"></i>
                                </div>

                                <div className="me-4">
                                    <i className="fa-brands fa-instagram text-white font-size-130"></i>
                                </div>

                                <div className="me-4">
                                    <i className="fa-brands fa-linkedin-in text-white font-size-130"></i>
                                </div>
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
        </div>
    )
}

export default Home