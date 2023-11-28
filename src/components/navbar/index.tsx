'use client';

import React from 'react';

const Navbar = () => {
  return (
    <div className="min-w-full lg:h-[103px] h-14 flex items-center justify-between px-5 bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo_kuning_kaleka 1.png"
        className="lg:w-32 w-24 "
        alt="logo"
      />
      <div className="flex lg:gap-7 gap-3 items-center justify-between text-center flex-wrap text-brand font-medium lg:text-xl text-sm">
        <a href="#" aria-label="beranda">
          BERANDA
        </a>
        <a href="#" aria-label="tentangkami">
          TENTANG KAMI
        </a>
      </div>
      <div className="lg:block hidden"></div>
    </div>
  );
};

export default Navbar;
