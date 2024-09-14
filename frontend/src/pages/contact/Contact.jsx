import './contact.css';
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { formatPhoneNumberIntl, getCountries } from 'react-phone-number-input';
import contactImg from '../../assets/images/contactImage.png';
import Header from '../../components/header/Header';



function Contact() {
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState('LB');

  const getPlaceholderFormat = (country) => {
    const countries = getCountries();
    const selectedCountry = countries.find((c) => c.alpha2 === country);
    return selectedCountry ? selectedCountry.format : '';
  };

  return (

    <div className="flex flex-col md:flex-row bg">
      
      <div className="p-8 w-full">
        <div className="flex flex-row w-full justify-between">
          <div className="mb-8 left-0">
            <h1 className="text-3xl text-white font-CoreRhino65bold">Contact Us</h1>
            <div className=" bottom-0 h-0.5 bg-[#5DD3B3] mt-3" style={{ width: '170px' }}></div>
            <p className="mt-4 text-gray-300 text-md mb-10 font-CoreRhinoLight">Have questions or need support? We’re here to help! <br></br> Call +971 4 393 0782 or complete the form below and we’ll get in touch.</p>

            <form className="max-w-xlg" style={{ width: '640px' }}>
              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label htmlFor="firstName" className="block text-white text-l font-CoreRhinoMedium">First Name *</label>
                  <input type="text" id="firstName" name="firstName" className="mt-1 p-2 block w-full border-2 rounded-md border-focus" placeholder="First Name" />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="lastName" className="block text-l text-white font-CoreRhinoMedium">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" className="mt-1 p-2 block w-full border-2 rounded-md border-focus" placeholder="Last Name" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-l text-white font-CoreRhinoMedium">Email Address *</label>
                <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border-2 rounded-md border-focus" placeholder="Email Address" />
              </div>
              <div className="mb-4 relative bg">
                <label htmlFor="mobile" className="block text-l text-white font-CoreRhinoMedium">Mobile Number *</label>

                <div class="phone-input-container">
                  <PhoneInput
                    id="mobile"
                    name="mobile"
                    international
                    defaultCountry="LB"
                    value={phone}
                    onChange={setPhone}
                    country={country}
                    onCountryChange={setCountry}
                    placeholder={getPlaceholderFormat(country)}
                    className="mt-1 p-2 block text-white w-full border-2 rounded-md border-[#576474]"
                  />
                </div>

              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-l text-white font-CoreRhinoMedium">Message *</label>
                <textarea id="message" name="message" rows="4" className="mt-1 p-2 block w-full border-2 rounded-md no-resize border-focus bg-[#2D3741] " placeholder="Type your message here"></textarea>
              </div>
              <div className="mb-4 relative">
                <input type="file" id="file" name="file" className="hidden" />
                <div class="flex items-center justify-center w-full">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-[#576474] border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <img src="/uploadArrow.png" alt="Upload" class="w-8 h-8 mb-4 text-[#5DD3B3] dark:text-gray-400" />
                      <p class="mb-2 font-CoreRhinoMedium text-sm text-[#5DD3B3] dark:text-gray-400"><span>Click or Drag and Drop,</span> to upload files</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>

                </div>
              </div>
              <button type="submit" className="w-[30%] px-4 py-2 font-CoreRhinoMedium bg-[#5DD3B3] text-white rounded-3xl hover:bg-white hover:text-[#5DD3B3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Send Message</button>
            </form>
          </div>
          <div className=" md:block right-0 mt-20">
            <img src={contactImg} alt="Image" className="w-[400] h-[400] object-cover mt-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
