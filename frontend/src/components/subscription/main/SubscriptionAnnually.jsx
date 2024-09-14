import React from "react";
import styles from "./subscriptionMain.css";
import trueO from "../../../assets/icons/true.png";
import aboutSub0 from "../../../assets/icons/true00.png";
import aboutSub from "../../../assets/icons/aboutSub.png";
import arrowsum from "../../../assets/icons/arrowabot.png";

function SubscriptionAnnually() {
    return (
        <div className="subscriptionMain app.light">
            <div className="subscriptionMainText">Zendy Plus</div>
            <div
                className="subscriptionMainAed"
                class="flex justify-between items-center"
            >
                <div className="subscriptionMainAedMoney">AED420</div>
                <div className="subscriptionMainAedType"> / Annually</div>
            </div>
            <div className="subscriptionMainLine"></div>

            <div
                className="subscriptionMainOption1"
                class="flex justify-start items-start g-5 me-72 "
            >
                <div className="subscriptionMainOption1-Text" class="mt-2" >
                    <img src={trueO} alt="" className="trueO1" />

                </div>
                <div className="div subscriptionMainOption12" class="ms-2">
                    <span className="subscriptionMainOption1-Text1" >Search Zendy’s Premium Database <br></br> Of articles From Top Publishers</span>
                </div>
            </div>

            <div className="seePub" class="flex justify-start items-start  mt-5 me-96  ">

                <div className="text-color-font">See Publishers</div >
                <div className="pubAbout12"><img src={aboutSub} alt="" className="pubAbout1" class="ms-4 mt-1" /></div>
                <div className="arrowpub"><img src={arrowsum} alt="" /></div>
                <div className="aboutpub"><div className="aboutpubtext">EBSCO <br></br>
                    Wiley <br></br>
                    Taylor & Francis <br></br>
                    IT Governance <br></br>
                    De Gruyter<br></br>
                    Bristol University Press<br></br>
                    Lived Places Publishing<br></br>
                    Oxford University Press<br></br>
                    <br></br>
                    <span className=" text-white-A700_7e">Some publishers may have limited availability in certain regions due to regional licensing agreements.</span></div></div>
            </div>


            <div className="feature" class="flex justify-start items-start  mt-5 me-96 pe-32 subscriptionMainOption2-Text11 ">Features</div>


            <div className="AI-Summarisation" class="flex justify-start items-start  mt-5 me-96  ">
                <img src={trueO} alt="" className="trueO0" class="mt-1 me-1" />
                <span className="AI-Summarisation2">AI Summarisation</span>
                <div className="pubAbout01"><img src={aboutSub0} alt="" className="pubAbout0" class="ms-3 mt-1" /></div>
                <div className="arrowsum"><img src={arrowsum} alt="" /></div>
                <div className="aboutsum">Summarise Lengthy research papers in just a click.</div>
            </div>

            <div
                className="subscriptionMainOption2"
                class="flex justify-start items-start  mt-5 me-80   "
            >
                <div className="subscriptionMainOption2-Text" class="flex justify-start items-start  mt-5  " >
                    <img src={trueO} alt="" className="trueO2" class="mt-1 me-1" />
                    <div class="w-48 subscriptionMainOption2-Text1">AI Key phrase highlighting</div>
                    <div className="abouticon"><img src={aboutSub0} alt="" className="pubAbout2" class="ms-2 mt-1" /></div>
                    <div className="arrowabot"><img src={arrowsum} alt="" /></div>
                    <div className="aboutky">Highlight key phrases and concepts within research papers.</div>
                </div>
            </div>



            <div
                className="subscriptionMainOption3"
                class="flex justify-start items-start  mt-5 me-96 pe-6  "
            >
                <div className="subscriptionMainOption3-Text" class="flex justify-start items-start  mt-5   ">
                    <img src={trueO} alt="" className="trueO4" class="mt-1 me-1" />
                    <span className="subscriptionMainOption3-Text1">One-click citations</span>
                </div>
            </div>




            <div
                className="subscriptionMainOption4"
                class="flex justify-start items-start  mt-5 me-96 pe-1  "
            >
                <div className="subscriptionMainOption4-Text" class="flex justify-start items-start  mt-5   ">
                    <img src={trueO} alt="" className="trueO5" class="mt-1 me-1" />
                    <div className="subscriptionMainOption5-Text1">Unlimited downloads</div>
                </div>
            </div>


            <div
                className="subscriptionMainOption5"
                class="flex justify-start items-start  mt-5 me-96 pe-9  "
            >
                <div className="subscriptionMainOption5-Text" class="flex justify-start items-start  mt-5   ">
                    <img src={trueO} alt="" className="trueO6" class="mt-1 me-1" />
                    <div className="subscriptionMainOption5-Text1">Favourite articles</div>
                </div>
            </div>

            <div
                className="subscriptionMainOption6"
                class="flex justify-start items-start  mt-5 me-96 pe-4  "
            >
                <div className="subscriptionMainOption6-Text" class="flex justify-start items-start  mt-5   ">
                    <img src={trueO} alt="" className="trueO7" class="mt-1 me-1" />
                    <div className="subscriptionMainOption6-Text1">Create reading lists</div>
                </div>
            </div>

            <div className="subscriptionMainBtn" >
                <div className="subscriptionMainBtnText" >Start 7-day free trial</div>
            </div>

            <div className="subscriptionMainTextDown">
                Contact us for discounted pricing for a group or to sponsor individuals
                within your organisation.
            </div>
        </div>
    );
}

export default SubscriptionAnnually;
