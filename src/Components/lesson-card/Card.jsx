import React from 'react';
import { useNavigate } from 'react-router-dom';
import beginner from '../../assets/images/beginners.png'
import medium from '../../assets/images/medium.png'
import advanced from '../../assets/images/advanced.png'

export default function Card({lesson}){
    const navigate = useNavigate();
    const goToLesson = () => {
        navigate(`/lesson/${lesson.id}`);
    };
    const goToPayLesson = () => {
        navigate(`/lesson/pay/${lesson.id}`);
    };
    return(
        <>
        <div onClick={ lesson.isPaid ? goToPayLesson : goToLesson } className="bg-[#fff] shadow-sm rounded-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 overflow-hidden hover:scale-[98%] transition duration-300">
            <iframe
                width="100%"
                height="240"
                src={lesson.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <div className="p-5">
                <h2 className="text-[35px] font-semibold mb-2 leading-none capitalize hover:text-blue-700 transition duration-300 cursor-pointer">{lesson.title}</h2>
                <p className="text-[20px] mb-7 text-gray-700">{lesson.description}</p>
                <hr className="my-6 text-gray-300"/>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {lesson.classLevel=="Grade 1 Secondary"?<img src={beginner} alt="beginners" className="h-8 w-8"/>
                        :lesson.classLevel=="Grade 3 Secondary"?<img src={advanced} alt="experts" className="h-8 w-8"/>
                        :<img src={medium} alt="medium" className="h-8 w-8"/>}
                        <p className=" font-semibold">{lesson.classLevel}</p>
                    </div>
                    {lesson.isPaid?
                    <p className="text-[22px] font-semibold">{lesson.price} $</p>
                    :
                    <button className='px-[15px] py-[5px] text-[#fff] rounded bg-blue-900 hover:bg-blue-500 transition duration-300 cursor-pointer'>View</button>
                    }
                </div>
            </div>
        </div>
        </>
    )
}