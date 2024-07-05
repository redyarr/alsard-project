import React from 'react'

const Button = (props) => {
  return (
        <button className='w-[100px] h-[35px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium'>{props.text}</button>
  )
}

export default Button