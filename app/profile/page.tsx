import React from "react";
import FormContainer from "@/components/form/FormContainer";
import { updateProfileAction, fetchProfile } from "@/utils/actions";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import { updateProfileImageAction } from "@/utils/actions";

async function ProfilePage() {
  const profile = await fetchProfile();
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">user profile</h1>
      <div className="border p-8 rounded-md max-w-full">
        <ImageInputContainer
          image={profile.profileImage}
          name={profile.username}
          text="update profile image"
          action={updateProfileImageAction}
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              inputName="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
              defaultValue={profile.firstName}
            />
            <FormInput
              inputName="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              defaultValue={profile.lastName}
            />
            <FormInput
              inputName="username"
              type="text"
              label="User Name"
              placeholder="User Name"
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton className="mt-8" text="update profile" size="default" />
        </FormContainer>
      </div>
    </section>
  );
}

export default ProfilePage;

// async function ProfilePage() {
//   const user = await currentUser();
//   return (
//     <div className="flex gap-4">
//       <Button size="default">
//         <Link href="/profile/create">Create Profile</Link>
//       </Button>
//       {user && (
//         <Button>
//           <Link href="/profile/update">Update Profile</Link>
//         </Button>
//       )}
//     </div>
//   );
// }
// export default ProfilePage;
