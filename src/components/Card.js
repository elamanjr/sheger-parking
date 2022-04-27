import React from 'react'

export default function Card({name,text,nameClass}) {
  return (
            <div className='pt-3 px-2 pb-1 col-12 shadow rounded mb-4'>
                <div className={nameClass}>{name}</div>
                <p className="ms-2">{text}</p>
            </div>
  );
}
