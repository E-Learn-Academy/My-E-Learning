import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#2e3267] text-white p-9">
        <div className="w-[80%] mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-9 mb-10">
          
          {/* Section 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">EDUCATION</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quisquam.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">PermaLink</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="education.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="courses.html">Courses</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">Privacy</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <p>+965 51682199</p>
              <p>contact@edumaster.org</p>
            </div>
            <ul className="footer__socials flex gap-3">
              <li>
                <a href="#"><i className="uil uil-facebook-f"></i></a>
              </li>
              <li>
                <a href="#"><i className="uil uil-instagram-alt"></i></a>
              </li>
              <li>
                <a href="#"><i className="uil uil-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i className="uil uil-linkedin-alt"></i></a>
              </li>
            </ul>
          </div>

        </div>

        <hr />

        <div className="text-center mt-4 text-2xl">
          <small>Copyright © 2025 All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}


// import React from 'react'

// export default function Footer() {
//   return (
//   <footer>
//     <div class=" bg-[#2e3267] text-white p-9">
//       <div className='w-[80%] mx-auto grid md:grid-cols-4 gap-9 mb-10 sm:grid-cols-2'>
//            <div className="flex flex-col gap-3">
//             <h4 className='text-2xl font-bold'>EDUCATION</h4>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quisquam.</p>
//         </div>
//         <div className="flex flex-col gap-3">
//             <h4  className='text-2xl font-bold'>PermaLink</h4>
//             <ul className='flex flex-col gap-3'>
//                 <li><a href="education.html">Home</a></li>
//                 <li><a href="about.html">About</a></li>
//                 <li><a href="courses.html">Courses</a></li>
//                 <li><a href="contact.html">Contact</a></li>
//             </ul>
//         </div>
//         <div className="flex flex-col gap-3">
//             <h4  className='text-2xl font-bold'>primacy</h4>
//             <ul className='flex flex-col gap-3'>
//                 <li><a href="#">Privacy Policy</a></li>
//                 <li><a href="#">Terms and conditions</a></li>
//                 <li><a href="#">Refund Policy</a></li>
//             </ul>
//         </div>
//         <div className="flex flex-col gap-3">
//             <h4  className='text-2xl font-bold'>Contact Us</h4>
//             <div className='flex flex-col gap-3'>
//                 <p>+965 51682199</p>
//                 <p>contact@edumaster.org</p>
//             </div>
//             <ul class="footer__socials">
//                 <li>
//                     <a href="#"><i class="uil uil-facebook-f"></i></a>
//                 </li>
//                 <li>
//                     <a href="#"><i class="uil uil-instagram-alt"></i></a>
//                 </li>
//                 <li>
//                     <a href="#"><i class="uil uil-twitter"></i></a>
//                 </li>
//                 <li>
//                     <a href="#"><i class="uil uil-linkedin-alt"></i></a>
//                 </li>
//             </ul>
//         </div>
//       </div>
//       <hr></hr>  
//         <div className='text-center mt-4 text-2xl'>
//         <small> Copyright © 2025 All rights reserved.</small>
//     </div>
     
//     </div>

  

// </footer>
//   )
// }
