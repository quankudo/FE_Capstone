import React from 'react'

const TextTitle = ({text}) => {
  return (
    <h2 className="text-3xl font-medium text-text text-center mb-8 relative inline-block after:content-[''] after:block after:w-24 after:h-1 after:mx-auto after:mt-2 after:bg-gradient-to-r after:from-red-500 after:to-yellow-400 after:rounded">
        {text}
    </h2>
  )
}

export default TextTitle
