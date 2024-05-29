import React from "react";
import { LuUser2 } from "react-icons/lu";
import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  console.log("profile image = ", profileImage);
  if (!profileImage)
    return (
      <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white"></LuUser2>
    );
  else
    return (
      <Image
        src={profileImage}
        alt="profile image"
        width={24}
        height={24}
        className="rounded-full"
      />
    );

  // if (profileImage !== null)
  //   return (
  //     // <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
  //     <Image
  //       src={profileImage}
  //       alt="profile image"
  //       width={24}
  //       height={24}
  //       className="rounded-full"
  //     />
  //   );
  // else
  //   return (
  //     <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white"></LuUser2>
  //   );
}

export default UserIcon;
