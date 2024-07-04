import React from 'react'

const Button = (props) => {
  return (
        <button className='w-[100px] h-[30px] bg-blue-600 text-white'>{props.text}</button>
  )
}

export default Button