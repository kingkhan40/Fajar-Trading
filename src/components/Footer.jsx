import React from 'react'

const Footer = () => {
    return (
        <div className='w-full bg-slate-400'>
        <footer className="flex flex-col space-y-10 justify-center m-10 p-10">
           
            <div className="flex justify-center space-x-5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" className='w-12' />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"  className='w-12'/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png"  className='w-12' />
                </a>
                <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"  className='w-12'/>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/twitter.png"  className='w-12'/>
                </a>
            </div>
            <p className="text-center text-gray-700 font-medium">© 2022 Company Ltd. All rights reservered.</p>
        </footer>
        </div>

    )
}

export default Footer