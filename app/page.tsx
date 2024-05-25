"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
  const buttonStyle = "capitalize m-8";
  return (
    <div>
      <h3 className="text-3xl">HomePage</h3>
      <Button
        size="default"
        className={buttonStyle}
        onClick={() => {
          console.log("i am clicked");
        }}
      >
        Button
      </Button>
      <Button asChild variant="ghost">
        <Link href="/properties">properties</Link>
      </Button>
    </div>
  );
}

export default HomePage;
