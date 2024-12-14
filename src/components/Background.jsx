import React from 'react';

function Background() {
  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        <div className="absolute top-[5%] nav w-full py-10 flex justify-center font-medium text-black text-xl">
          महत्वपूर्ण दस्तावेज़ 📝
        </div>
        <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[11vw] text-black leading-none tracking-tight font-medium'>
          Docs
        </h1>
      </div>
    </>
  );
}

export default Background;
