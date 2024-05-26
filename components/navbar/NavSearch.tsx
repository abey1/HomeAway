import React from "react";
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="text"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted"
    ></Input>
  );
}

export default NavSearch;