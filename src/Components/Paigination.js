import React from 'react'

const Paigination = ({ goPrevPage, goNextPage }) => {
    return (
        <div>
            {goPrevPage && <button onClick={goPrevPage} className='btn'>Previous</button>}
            {goNextPage && <button onClick={goNextPage} className='btn'>Next</button>}
        </div>
    )
}

export default Paigination