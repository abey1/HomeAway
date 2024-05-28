import React from "react";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProfileAction } from "@/utils/actions";

function CreateProfilePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-full">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              inputName="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
            />
            <FormInput
              inputName="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
            />
            <FormInput
              inputName="userName"
              type="text"
              label="User Name"
              placeholder="User Name"
            />
          </div>
          <SubmitButton className="mt-8" text="Create Profile" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProfilePage;
