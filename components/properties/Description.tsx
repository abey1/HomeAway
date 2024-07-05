"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "./Title";

const Description = ({ description }: { description: string }) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const words = description.split(" ");
  const isLongDescription = words.length > 100;
  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };
  const displayDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.splice(0, 100).join(" ") + "..."
      : description;
  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayDescription}
      </p>
      {isLongDescription && (
        <Button className="pl-0" variant="link" onClick={toggleDescription}>
          {isFullDescriptionShown ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
};

export default Description;
