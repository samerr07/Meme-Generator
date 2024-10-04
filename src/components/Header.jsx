import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
    return (
        <header className="flex items-center justify-between h-16 p-4 bg-gradient-to-l from-green-500 to-gray-800 rounded-t-lg shadow-md">

            <h1 className="text-white text-2xl font-bold">Meme Generator</h1>

            <div className='flex gap-4'>
                <a
                    href="https://github.com/samerr07"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <FaGithub className='w-8 h-8' />

                </a>
                <a href="https://www.linkedin.com/in/sameer-srivastava-7896b8208/"
                    target='_blank'
                >
                    <FaLinkedin className='w-8 h-8' />
                </a>
            </div>
        </header>
    );
}
