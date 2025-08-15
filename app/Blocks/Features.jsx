import React from 'react'

const Features = ({fname , text}) => {
  return (

    <div className="w-72 p-4 rounded-xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm mx-4">
      <div className="flex items-center space-x-3 mb-3">
        <div>
          <p className="text-md font-bold text-black [font-family:var(--font-geist-mono)]">{fname}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-300 text-justify leading-snug [font-family:var(--font-geist-sans)]">{text}</p>
    </div>

  )
}

export default Features