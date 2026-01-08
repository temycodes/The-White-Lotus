import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  // this function creates a new user in supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options aloows us to pass additional user metadata during signup
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  // this function verifies the user credentials with supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// this checks the local storage for an active session and gets the user info from supabase
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUser({ fullName, password, avatar }) {
  // password and user(fullname) cannot be updated at the same time cause they are in different forms
  let updateData = {};
  if (password) updateData = password ;
  if (fullName?.trim()) updateData.data = { fullName };

  // 1. update passord or fullname
  // the updateuser method knows which user to update based on the session
  const { data, error } = await supabase.auth.updateUser( updateData );
  if (error) throw new Error(error.message);

  // 2.upload avatar image
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // the filename and avatar are uploaded to the "avatar" storage bucket
  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
  if (storageError) throw new Error(error.message);

  // 3.update avatar in the user metadata
  // links the user to the avatar image in the storage bucket
  const { data: updatedAvatar, error: avatarError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (avatarError) throw new Error(error.message);
  return updatedAvatar;
}
