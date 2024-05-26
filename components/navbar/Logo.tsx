import React from "react";
import { GiCampingTent } from "react-icons/gi";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <div className="">
      {/* <GiCampingTent className="text-4xl text-orange-700 " /> */}
      <Button size="icon" className="" asChild>
        <Link href="/">
          <GiCampingTent className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
}

export default Logo;
