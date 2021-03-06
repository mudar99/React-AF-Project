import React, { Component } from "react";
import { ChatIcon, HomeIcon } from "@heroicons/react/outline";
import { UserCircleIcon, CogIcon, EyeIcon } from '@heroicons/react/outline'
import Logout from "../../Main Page/components/Logout";
import ChangePassword from "./ChangePassword";
import { LogoutAPI } from '../../API';
import ID_Verification from "./ID_Verification";
import Email_Verification from "./Email_Verification";
import Balance from "./Balance";

class Navbar extends Component {
    state = {
        chkAbout: false,
        chkPastWork: false,
        chkSkills: false,
    }
    editHandler = (e) => {
        let val = e.target.value;
        if (val == "About") {
            this.setState({
                chkAbout: true,
                chkPastWork: false,
                chkSkills: false,
            });
        }
        else if (val == "Past Work") {
            this.setState({
                chkAbout: false,
                chkPastWork: true,
                chkSkills: false,
            });
        }
        else if (val == "Skills") {
            this.setState({
                chkAbout: false,
                chkPastWork: false,
                chkSkills: true,
            });
        }
        else {
            this.setState({
                chkAbout: false,
                chkSkills: false,
                chkPastWork: false
            });
        }
    }
    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                <div>
                    <a href="#contact" className=""><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">

                    <ul className=" text-right navbar-nav text-center">
                        <div className="dropdown d-lg-flex d-none">
                            <a className="m-1" role="button"><EyeIcon height={25} /></a>
                            <div class="dropdown-content">
                                <a className="dropdown-item" href="#testimonials">?????????? ??????????????</a>
                                <a className="dropdown-item" href="#skills">????????????????</a>
                                <a className="dropdown-item" href="#projects" >?????????????? ??????????????</a>
                            </div>
                        </div>
                        <li className="mr-3 ml-3 " ><Logout remember="RememberMe" startPage='/' parentUrl={LogoutAPI} Token='userToken' /></li><hr />
                        <li><a href="#" className="mr-3 ml-3">???????????? <ChatIcon height={25} /></a></li><hr />
                        <li><a href="/MainPage" className="mr-3 ml-3">?????????? <HomeIcon height={25} /></a></li><hr />

                        <div className="dropdown d-lg-flex d-none">
                            <a className="mr-3 ml-3" role="button"><CogIcon id="setting" height={25} /></a>
                            <div class="dropdown-content">
                                <a className="" data-toggle="modal" data-target=".modal-changePassword" style={{ cursor: "pointer" }}>?????????? ???????? ???????????? </a>
                                <a className="dropdown-item" data-toggle="modal" data-target=".modal-VerifyID">?????????? ????????????</a>
                                <a className="dropdown-item" data-toggle="modal" data-target=".modal-VerifyEmail">?????????? ???????????? ????????????????????</a>
                                <a className="dropdown-item" data-toggle="modal" data-target=".modal-Balance">??????????????</a>
                            </div>
                        </div>

                        <div className="d-block d-lg-none">
                            <a href="#" data-toggle="modal" data-target=".modal-changePassword" style={{ cursor: "pointer" }}>?????????? ???????? ???????????? </a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-VerifyID">?????????? ????????????</a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-VerifyEmail">?????????? ???????????? ????????????????????</a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-Balance">??????????????</a>
                        </div>
                        <li>
                            <a href="#about" className="pl-4 d-none d-lg-flex font-weight-bold text-success border-left"><UserCircleIcon height={25} className="mr-2" />
                                <h6 className="m-1">{this.props.Fname}</h6>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className=" modal fade modal-changePassword" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container PasswordEdit">
                                <div id="card-body" className="card-body">
                                    <ChangePassword email={this.props.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-VerifyID" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container VerifyID">
                                <div id="card-body" className="card-body">
                                    <ID_Verification />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-VerifyEmail" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container VerifyEmail">
                                <div id="card-body" className="card-body">
                                    <Email_Verification email={this.props.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-Balance" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container Balance">
                                <div id="card-body" className="card-body">
                                    <Balance Balance = {this.props.Balance}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        );
    }
}
export default Navbar
