import supabase, { supabaseUrl } from "./Supabase";

// FETCH all cabins from the database
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error! cabin could not be found");
  }
  return data;
}

//

// DELETE a cabin from the database
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error! cabin could not be deleted");
  }
}

//

// CREATE a new cabin in the database
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Generate a random image name
  const imageName = `${Math.floor(Math.random() * 1000)}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create cabin/edit cabin record in the database
  let query = supabase.from("cabins");

  //A. create new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. edt existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Error! cabin could not be created");
  }

  //2. UPLOAD image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);
  console.log(newCabin.image instanceof File, storageError);

  // Check if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id[0]);
    throw new Error("Error! image could not be uploaded");
  }

  return data;
}
