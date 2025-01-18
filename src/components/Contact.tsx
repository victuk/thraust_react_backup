// import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import AnimateOnScroll from "react-animate-on-scroll";

export default function ContactComponent() {
  return (
    <AnimateOnScroll animateIn="fadeIn" duration={2}>
    <section className="mx-10 xl:mx-[140px] h[1000px] sm:h-[900px] md:h-[850px] xl:h-[850px] my-12 rounded-xl text-white bg-[#222] bg-black overflow-hidden">
          <div className="flex gap-4">
            <img src="/contactus.jpg" className="hidden lg:block lg:w-1/2" />
            <div className="px-6 py-10 w-full lg:w-1/2">
              <div className="col-md-6">
                <div className="font-bold text-[35px]">Get in Touch</div>
                <p className="text-[20px] mb-4">
                  Have a question or want to collaborate?
                </p>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col">
                    <label className="text-[12px] mb-2">Full Name</label>
                    <input
                      className="px-5 py-2 rounded-md"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col">
                      <label className="text-[12px] mb-2">Email</label>
                      <input
                        className="px-5 py-2 rounded-md"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col">
                      <label className="text-[12px] mb-2">Message</label>
                      <textarea
                        className="px-5 py-2 rounded-md"
                        name="message"
                        placeholder="Message"
                        rows={5}
                      ></textarea>
                    </div>
                  </div>

            
                <button
                    className="bg-primary font-bold py-4 rounded-lg"
                >Send Message</button>
                </div>
              </div>
              <div className="mt-8">
                <div className="font-bold text-[30px] mb-4">Contact Information</div>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 items-center">
                    <IoLocationSharp size={25} /> Odani City,
                    Port-Harcourt, Rivers, Nigeria.
                  </li>
                  <li className="flex gap-2 items-center">
                    <FaPhoneFlip size={25} /> 0810 039-3579
                  </li>
                  <li className="flex gap-2 items-center">
                    <MdEmail size={25} />
                    <a href="mailto:harltze@luxury.com">harltze@luxury.com</a>
                  </li>
                </ul>
                <ul className="flex gap-4 mt-4">
                  <li>
                    <a href="#">
                      <FaFacebookSquare size={35} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <RiTwitterXLine size={35} />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <RiInstagramFill size={35} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
    </AnimateOnScroll>
  )
}
