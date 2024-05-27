import React from "react";

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
