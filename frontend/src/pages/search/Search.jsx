import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { LuExpand } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsLink45Deg } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";
import { TbArrowsMinimize } from "react-icons/tb";

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [refineList, setRefineList] = useState([
    {
      title: "Resource type",
      isOpen: false,
      options: [
        { name: "Academic", count: 527 },
        { name: "Biographies", count: 20 },
      ],
    },
    {
      title: "Subject",
      isOpen: false,
      options: [
        { name: "Anatomy", count: 345 },
        { name: "Animals", count: 527 },
      ],
    },
    {
      title: "Publication title",
      isOpen: false,
      options: [
        { name: "Anatomy", count: 256 },
        { name: "Animals", count: 577 },
      ],
    },
    {
      title: "Language",
      isOpen: false,
      options: [
        { name: "Arabic", count: 200 },
        { name: "English", count: 47 },
      ],
    },
    {
      title: "Geographic coverage",
      isOpen: false,
      options: [
        { name: "Afr", count: 2890 },
        { name: "Afrikans", count: 397 },
      ],
    },
  ]);

  const toggleDropdown = (index) => {
    const updatedRefineList = refineList.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false,
    }));
    setRefineList(updatedRefineList);
  };

  const handleCheckboxChange = (optionIndex, listIndex) => {
    const updatedRefineList = [...refineList];
    updatedRefineList[listIndex].options[optionIndex].checked =
      !updatedRefineList[listIndex].options[optionIndex].checked;
    setRefineList(updatedRefineList);
  };

  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const toggleShareDropdown = (event) => {
    event.stopPropagation();
    setShowShareDropdown(!showShareDropdown);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  const sortingOptions = [
    { label: "All" },
    { label: "Relevance" },
    { label: "Date latest" },
    { label: "Date Oldest" },
    { label: "SJR" },
    { label: "H-INDEX" },
  ];

  const toggleDropdownSort = () => {
    setIsOpenSort(!isOpenSort);
  };
  const fieldLabels = [
    "Authors(s)",
    "Publication year",
    "Publication title",
    "Resource type",
    "Subject(s)",
    "SCImago Journal Rank",
    "H-Index",
    "eISSN",
    "pISSN",
    "DOI",
  ];

  const fieldDescription = [
    "The cognitive literature now shows how critically math performance depends on working memory, for any form of arithmetic and math that involves processes beyond simple memory retrieval. The psychometric literature is also very clear on the global consequences of mathematics anxiety. People who are highly math anxious avoid math:"
  ];

  const fieldAnswers = [
    "John Green",
    "2020",
    "Title of the Publication",
    "Book",
    "anxiety, cognition, cognitive psychology",
    "English",
    "2.5",
    "150",
    "1349-2847",
    "2384-2837",
    "10.3758/bf03194059"
  ];

  const dropdownRef = useRef(null);



  useEffect(() => {
    const handleBodyClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const dropSortdownRef = useRef(null);
  useEffect(() => {
    const handleBodyClick = (event) => {
      if (dropSortdownRef.current && !dropSortdownRef.current.contains(event.target)) {
        setIsOpenSort(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);



  const [fullTextChecked, setFullTextChecked] = useState(false);
  const [peerReviewedChecked, setPeerReviewedChecked] = useState(false);
  const [referencesAvailableChecked, setReferencesAvailableChecked] =
    useState(false);

  const clearAllFilters = () => {
    const updatedRefineList = refineList.map((item) => ({
      ...item,
      options: item.options.map((option) => ({
        ...option,
        checked: false,
      })),
    }));
    setRefineList(updatedRefineList);
    setFullTextChecked(false);
    setPeerReviewedChecked(false);
    setReferencesAvailableChecked(false);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSearchOption, setSelectedSearchOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedSearchOption(option);
    setShowDropdown(false);
  };

  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const handleSortOptionClick = (option) => {
    setSelectedSortOption(option);
    setIsOpenSort(false);
  };



  return (
    <>

      <div className="flex flex-row bg">
        <div
          className="relative bg-[#384450] ml-10 mt-10 top-220 shadow rounded-xl"
          style={{
            width: "305px",
            
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="flex  bg-[#384450]  items-center justify-between  text-white text-xl font-CoreRhino65bold shadow-xl rounded-lg"
            style={{ height: "54px" }}
          >
            <div className="  pl-4 bg-[#384450]">Refine results</div>
            <button>
              <IoMdArrowDropup
                className="text-white bg-inherit pr-3"
                size={38}
              />
            </button>
          </div>
          <div
            className="justify-between pl-4 flex items-center bg-[#2D3741] text-left text-white text-base font-CoreRhino65bold"
            style={{ height: "44px" }}
          >
            Full text
            <label className="inline-flex items-center cursor-pointer pr-2">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={fullTextChecked}
                onChange={() => setFullTextChecked(!fullTextChecked)}
              />
              <div
                className={`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-200 ${fullTextChecked ? "peer-checked" : "bg-[#5DD3B3]"
                  }`}
              >
                <div
                  className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${fullTextChecked ? "translate-x-full" : ""
                    }`}
                  onClick={() => setFullTextChecked(!fullTextChecked)}
                ></div>
              </div>
            </label>
          </div>

          <div
            className="justify-between pl-4 flex items-center bg-[#2D3741] text-left text-white text-base font-CoreRhino65bold"
            style={{ height: "44px" }}
          >
            Peer reviewed
            <label className="inline-flex items-center cursor-pointer pr-2">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={peerReviewedChecked}
                onChange={() => setPeerReviewedChecked(!peerReviewedChecked)}
              />
              <div
                className={`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-200 ${peerReviewedChecked ? "peer-checked" : ""
                  }`}
              >
                <div
                  className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${peerReviewedChecked ? "translate-x-full peer-checked" : ""
                    }`}
                ></div>
              </div>
            </label>
          </div>

          <div
            className="justify-between pl-4 flex items-center bg-[#2D3741] text-left text-white text-base font-CoreRhino65bold"
            style={{ height: "44px" }}
          >
            References available
            <label className="inline-flex items-center cursor-pointer pr-2">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={referencesAvailableChecked}
                onChange={() =>
                  setReferencesAvailableChecked(!referencesAvailableChecked)
                }
              />
              <div
                className={`relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-200 ${referencesAvailableChecked ? "peer-checked" : ""
                  }`}
              >
                <div
                  className={`absolute top-0 left-0 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${referencesAvailableChecked
                    ? "translate-x-full peer-checked"
                    : ""
                    }`}
                ></div>
              </div>
            </label>
          </div>

          <div
            className=" justify-between pl-4 flex items-center bg-[#2D3741] text-left text-white text-base font-CoreRhino65bold"
            style={{ height: "44px" }}
          >
            From date
            <button
              className="bg-[#2D3741] border-none relative"
              onClick={() => {
                setShowDatePicker(true);
              }}
            >
              <BsPlusCircleFill className="text-white pr-3" size={38} />
            </button>
          </div>

          {showDatePicker && (
            <>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
              />
            </>
          )}

{refineList.map((item, index) => (
  <div key={index} className="relative">
    <div
      className="justify-between pl-4 flex items-center bg text-left text-white text-base font-CoreRhino65bold"
      style={{
        height: "44px",
        marginBottom: item.isOpen ? "0px" : "0px",
      }}
    >
      {item.title}
      <button onClick={() => toggleDropdown(index)}>
        {item.isOpen ? (
          <IoMdArrowDropup
            className="text-white bg-inherit pr-3"
            size={38}
          />
        ) : (
          <IoMdArrowDropdown
            className="text-white bg-inherit pr-3"
            size={38}
          />
        )}
      </button>
    </div>
    {item.isOpen && (
      <div className="bg-[#384450] text-white font-CoreRhinoLight border border-[#2D3741] p-2">
        {item.options &&
          item.options.map((option, optionIndex) => (
            <label
              key={optionIndex}
              htmlFor={option}
              className="flex items-center cursor-pointer mb-2"
            >
              <input
                type="checkbox"
                id={option}
                checked={option.checked}
                onChange={() => handleCheckboxChange(optionIndex, index)}
                className="custom-checkbox"
              />
              <span className="ml-2 text-white">
                {option.name}
                <span className="text-[#89949C] font-CoreRhinoMedium ml-2 text-xs">
                  ({option.count})
                </span>
              </span>
            </label>
          ))}
      </div>
    )}
  </div>
))}


          <div className="h-20 bg-[#384450] flex justify-center rounded-b-xl">
            <button
              onClick={clearAllFilters}
              className="relative bg-[#5DD3B3] hover:text-[#5DD3B3] hover:bg-white m-4 text-white font-CoreRhino65bold w-3/4 py-2 px-4 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        </div>
        <div className="mt-10 pl-10 pt-2">
          <h1 className="text-white text-2xl font-CoreRhino65bold mb-6">
            Zendy, your online library
          </h1>

          <div className="flex items-center mb-3">
      <div style={{ width: '800px' }}>
        <form>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <IoMdSearch className="w-6 h-6 text-[#576371] dark:text-[#5DD3B3]" />
            </div>
            <input
              style={{ width: '800px', paddingRight: '50px' }}
              type="search"
              id="default-search"
              className="p-4 pl-10 pr-12 text-md text-[#576371] border-2 border-[#576371] rounded-full bg-transparent focus:ring-[#5DD3B3] focus:border-[#5DD3B3] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#5DD3B3] dark:focus:border-[#5DD3B3] border-focus "
              placeholder="Search For a Keyword, title, abstract, author, journal, ISSN, DOL"
              onFocus={(e) => (e.target.style.color = '#5DD3B3')}
              onBlur={(e) => (e.target.style.color = '#576371')}
            />
              <div className="absolute right-3 bottom-3 flex items-center ">
                <h1 className="text-white text-lg font-CoreRhinoLight pr-2 ">
                  {selectedSearchOption || 'Search By'}
                </h1>
                <LuSettings2
                  className="w-6 h-6 mr-4 hover:bg-[#5DD3B3] hover:text-[#1F2731] rounded-lg text-[#5DD3B3] dark:text-[#576371] cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              </div>
              {showDropdown && (
                <div className="ml-4 font-CoreRhinoLight w-60 border-[#1F2731] rounded-xl shadow-lg absolute right-0 ">
                  <div className="absolute right-0 w-44 text-white border-1 rounded-xl hover:bg-[#5DD3B3] hover:text-white">
                    {[
                      'Keyword',
                      'Title',
                      'Abstract',
                      'Author',
                      'Publication Title',
                      'ISSN',
                      'ISBN',
                      'DOI',
                      'Publisher',
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="bg-[#1F2731] text-white font-CoreRhinoLight hover:bg-[#5DD3B3] hover:text-white font-CoreRhinoMedium px-4 py-2 cursor-pointer"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </form>
      </div>

            <div className="flex justify-between">
              {selectedSortOption ? (
                <p
                  className="justify-between ml-4 w-60 px-4 py-2 font-CoreRhinoLight rounded-3xl bg-transparent border text-xl text-[#5DD3B3] border-[#5DD3B3] dark:bg-gray-700 dark:text-white flex items-center"
                  onClick={toggleDropdownSort}
                >
                  <span className="mr-3 pr-7">{selectedSortOption.label}</span>
                  {isOpenSort ? (
                    <IoMdArrowDropup className="text-[#5DD3B3]" size={34} />
                  ) : (
                    <IoMdArrowDropdown className="text-[#5DD3B3]" size={34} />
                  )}
                </p>
              ) : (
                <button
                  className="justify-between ml-4 w-60 px-4 py-2 font-CoreRhinoLight rounded-3xl bg-transparent border text-xl text-[#5DD3B3] border-[#5DD3B3] dark:bg-gray-700 dark:text-white flex items-center border-focus "
                  onClick={toggleDropdownSort}
                >
                  <span className="mr-3 pr-7">Sorting</span>
                  {isOpenSort ? (
                    <IoMdArrowDropup className="text-[#5DD3B3]" size={34}  />
                  ) : (
                    <IoMdArrowDropdown className="text-[#5DD3B3]" size={34} />
                  )}
                </button>
              )}
              {isOpenSort && (
                <div
                // ref={dropSortdownRef}
                className="absolute ml-4 mt-12 w-60 border-[#1F2731] rounded-xl shadow-lg">
                  <ul className="border-transparent rounded-xl overflow-hidden">
                    {sortingOptions.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 bg-[#1F2731] text-white font-CoreRhino65bold hover:bg-[#5DD3B3] hover:text-white cursor-pointer"
                        onClick={() => handleSortOptionClick(option)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="ml-2 mb-4 text-white font-CoreRhinoMedium">
              Showing <span className="text-[#5DD3B3]">1,230,000</span> results
            </h1>
          </div>
          <div
            style={{ width: "1056px" }}
            className="bg-[#384450] rounded-xl"
          >
              <div style={{ width: "1056px" }} className="bg-[#384450] rounded-xl">
      <div className="flex bg-[#384450] justify-between rounded-xl flex-row">
        <p className=" text-lg  bg-[#384450] font-CoreRhino65bold rounded-xl ml-6 text-white pt-4">
          Life and Science
        </p>
        <div className="flex flex-row bg-[#384450]    rounded-xl">
          <div className="bg-[#384450]">
            <GoShareAndroid
              className="cursor-pointer rounded-2xl bg-[#384450] text-[#5DD3B3] mr-3 mt-4 w-7 h-7"
              onClick={toggleShareDropdown}
            />

            {showShareDropdown && (
              <div
                ref={dropdownRef}
                className="absolute cursor-pointer shadow-[#5DD3B3] shadow bg-[#384450] flex items-center justify-center flex-col w-8 h-36 rounded-2xl"
              >
                <FaFacebook
                  size={28}
                  className="pb-1 hover:text-[#5DD3B3] bg-[#384450] text-white"
                />
                <FaXTwitter
                  size={30}
                  className="pb-1 hover:text-[#5DD3B3] bg-[#384450] text-white"
                />
                <BiLogoLinkedin
                  size={30}
                  className="hover:text-[#5DD3B3] bg-[#384450] text-white"
                />
                <BsLink45Deg
                  size={30}
                  className="hover:text-[#5DD3B3] bg-[#384450] text-white"
                />
              </div>
            )}
          </div>

          {expanded ? (
            <TbArrowsMinimize
              className=" icon bg-[#384450] text-white mr-6 mt-4 w-7 h-7 cursor-pointer"
              onClick={toggleExpand}
            />
          ) : (
            <LuExpand
              className="icon bg-[#384450] text-white mr-6 mt-4 w-7 h-7 cursor-pointer"
              onClick={toggleExpand}
            />
          )}
        </div>
      </div>
      {fieldLabels.slice(0, expanded ? fieldLabels.length : 5).map((label, index) => (
        <div className="flex flex-row justify-start bg-[#384450] rounded-xl " key={index}>
          <div key={index} className="rounded-xl flex bg-[#384450] w-60">
            <p className="bg-[#384450] text-md font-CoreRhinoLight text-[#FAFAFA] rounded-lg pl-6 pt-2">
              {label}
            </p>
          </div>
          <div></div>
          <div className="flex rounded-xl justify-end">
            <p className="bg-[#384450] text-md font-CoreRhinoLight text-[#FAFAFA]  pl-2 pt-2">
              {fieldAnswers[index]}
            </p>
          </div>
        </div>
      ))}


              </div>
              
              

            <div className="flex rounded-xl bg-[#384450]">
              <div className="mt-4 mb-4 mr-4 ml-6 bg-[#384450]">
                <button
                  style={{ width: "124px", height: "34px" }}
                  className="text-white font-CoreRhinoLight text-md p-1 w-122 hover:text-[#5DD3B3] hover:bg-white h-34 bg-[#5DD3B3] rounded-lg"
                >
                  Get it now
                </button>
              </div>
              <div className="mt-4 mb-4 mr-4 bg-[#384450]">
                <button
                  style={{ width: "124px", height: "34px" }}
                  className="text-[#5DD3B3] text-md font-CoreRhinoLight hover:text-white hover:border-white h-34 border-2 border-[#5DD3B3] rounded-lg border-focus "
                >
                  Cite
                </button>
              </div>
              <div className="mt-4 mb-4 mr-4 bg-[#384450]">
                <button
                  style={{ width: "124px", height: "34px" }}
                  className="text-[#5DD3B3] flex justify-center flex-row hover:text-white hover:border-white items-center text-md font-CoreRhinoLight h-34 border-2 border-[#5DD3B3] rounded-lg border-focus "
                >
                  <FiUpload className="bg-[#384450] m-1 w-4 h-4 text-[#5DD3B3] " />
                  Export
                </button>
              </div>
              <div className="mt-4 mb-4 bg-[#384450] hover:text-white">
                <button
                  style={{ width: "41px", height: "34px" }}
                  className=" hover:text-white text-[#5DD3B3] items-center flex justify-center  hover:border-white text-md font-CoreRhinoLight h-34 border-2 border-[#5DD3B3] rounded-lg border-focus "
                >
                  <MdOutlineFileDownload className=" bg-[#384450] w-5 h-5 text-[#5DD3B3] " />
                </button>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>

      
    </>
  );
}

export default Search;
