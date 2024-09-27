import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

const Start = () => {
  return (
    <div className='sm:bg-yellow-600 md:bg-green-600 lg:bg-red-600 xl:bg-orange-600 '>
        <div className="box w-full h-[30rem] bg-[#367cf4] rounded-bl-[5rem] rounded-br-[5rem] p-4">
          <div className='nav flex justify-between flex-col'>
            <div className='flex justify-between mb-12'>
            <h1 className='text-white text-xl font-bold'>Quizinaut</h1>
            <Link to="/main">
              <button className='flex items-center bg-[#1e293b] text-white px-2 py-1 rounded-full cursor-pointer'>
                  Start building your Quiz <FaLongArrowAltRight className='ml-2'/>
              </button>
            </Link>
            </div>
            <h1 className='text-5xl text-white font-bold text-center mb-8'>Quizzes That Correct Themselves.</h1>
            <p className='text-lg text-white text-center mb-8'>Your time is precious. Design the quiz, we'll handle the rest.</p>
          </div>
        </div>
        
    </div>
  )
}

export default Start