import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
        <span
        className="cursor-pointer text-2xl md:text-3xl font-bold hover:text-orange-700 uppercase italic"
        onClick={() => router.push('/')}
      >
        <span className="text-orange-600 mr-0.5">E</span>-
        <span className="text-black dark:text-white ml-0.5">cart</span>
      </span>
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5 uppercase">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5 uppercase">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91-1234567890</p>
              <p>contact@dummy.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;