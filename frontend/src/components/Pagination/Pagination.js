import React from 'react';
import "./Pagination.scss";

const Pagination = ({ noOfBlogs, paginateHandler }) => {

    let noOfPaginateItems = Math.ceil(noOfBlogs / 6);

    return (
        <div className='paginate-items flex align-center justify-center'>
            {
                [...Array(noOfPaginateItems)].map((item, idx) => {
                    return (
                        <button type="button" className='paginate-item font-core-rhino-45-regular bg-ex-blue flex align-center justify-center text-white-A700' onClick={() => paginateHandler(idx + 1)} key={idx + 1}>{idx + 1}</button>
                    )
                })
            }
        </div>
    )
}

export default Pagination