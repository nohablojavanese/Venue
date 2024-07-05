import React from "react";
import { NavigationMenuDemo } from "./ui/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed inset-x-0 bg-white text-black p-4 z-50">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center">
        <Link href={"/"} className="flex items-center">
          <div className="flex items-center">
            <Image
              className="h-10 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Gojek_logo_2019.svg/2560px-Gojek_logo_2019.svg.png"
              alt="Logo"
              width={2500}
              height={600}
            />
            <span className="ml-2 font-semibold text-green-600 text-lg">
              GoSport
            </span>
          </div>
        </Link>
        <div className="flex justify-center flex-grow"> {/* Centered NavigationMenuDemo */}
          <NavigationMenuDemo />
        </div>
      </div>
    </header>
  );
};

export default Header;
