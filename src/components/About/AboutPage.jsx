import React, { useEffect } from "react";
import { FaInstagram, FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";



const AboutPage = () => {

    return (
        <div className="flex h-screen w-full">
            {/* Left Section */}
            <div
                className="flex-1 p-5 flex justify-center items-center"
            >
                <div className="text-6xl text-gray-700">
                    {/* Icons can be added here */}
                    <div className="flex flex-col items-center">
                        <FaInstagram className="text-6xl mb-4" />
                        <FaTelegramPlane className="text-6xl mb-4" />
                        <FaGithub className="text-6xl mb-4" />
                        <FaLinkedin className="text-6xl mb-4" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div
                className="flex-1 p-5 flex flex-col justify-center"
            >
                <h1 className="text-4xl sm:text-6xl font-bold">
                    Curious Coder <span className="text-orange-600">Harsh</span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-gray-600 mt-4 mb-6">
                    I'm Harsh Gupta, currently pursuing a B-Tech in Computer Science and Engineering from The LNM Institute of Information Technology, Jaipur. I have a strong foundation in data structures, algorithms, and core computer science fundamentals. My technical expertise includes working with modern web technologies like the MERN stack and Next.js, which I've utilized in several impactful projects.

                    I have also gained practical industry experience as a Software Developer Intern at Linux Socials and as a Summer Intern at Celebal Technologies. These experiences have enhanced my problem-solving skills and exposed me to real-world challenges, allowing me to grow as a developer. I am always eager to explore new opportunities, take on challenges, and contribute to innovative solutions in the tech space.

                </p>
                <div className="flex gap-5">
                    <FaInstagram className="text-2xl cursor-pointer hover:blur-sm" />
                    <FaTelegramPlane className="text-2xl cursor-pointer hover:blur-sm" />
                    <FaGithub className="text-2xl cursor-pointer hover:blur-sm" />
                    <FaLinkedin className="text-2xl cursor-pointer hover:blur-sm" />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
