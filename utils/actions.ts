"use server";
import {
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from "@/utils/schemas";
import db from "./db";
import { User, auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route");
  else return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();

    if (!user) throw new Error("please login to continue");
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    return { message: "profile created", success: true };
  } catch (error) {
    console.log(error);
    return {
      message: validateError(error),
      success: false,
    };
  }
};

export async function fetchProfileImage() {
  // const user = await currentUser();
  // if (!user) return null;
  try {
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    });
    return profile?.profileImage;
  } catch (error) {
    console.log(error instanceof Error && error.message);
  }
}

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

const validateError = (error: unknown): string => {
  console.log(error);

  if (error instanceof Error) return error.message;
  return "an error occurred";
};

export async function updateProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return { message: "profile updated successfully", success: true };
  } catch (error) {
    return {
      message: validateError(error),
      success: false,
    };
  }
}

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    console.log(validatedFields);
    const fullPath = await uploadImage(validatedFields.image);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath("/profile");
    return { message: "Profile image updated successfully", success: true };
  } catch (error) {
    console.log(error);
    return { message: validateError(error), success: false };
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const file = formData.get("image") as File;
    const validatedImage = validateWithZodSchema(imageSchema, { image: file });
    const imageUrl = await uploadImage(validatedImage.image);
    const result = await db.property.create({
      data: { ...validatedFields, image: imageUrl, profileId: user.id },
    });
    return { message: "Property successfully created", success: true };
  } catch (error) {
    return { message: validateError(error), success: false };
  }
  //redirect("/")
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  try {
    const properties = await db.property.findMany({
      select: {
        id: true,
        name: true,
        tagline: true,
        country: true,
        price: true,
        image: true,
      },
      where: {
        category,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { tagline: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    return [];
    // return { message: validateError(error), success: false };
  }
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          profileId: user.id,
          propertyId,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId
        ? "Successfully removed from favorite list"
        : "Successfully added to favorite list",
      success: true,
    };
  } catch (error) {
    return { message: validateError(error), success: false };
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = async ({ id }: { id: string }) => {
  const singleProperty = await db.property.findUnique({
    where: { id },
    include: { profile: true },
  });
  return singleProperty;
};
