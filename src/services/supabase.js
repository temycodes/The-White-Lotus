import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qhjolsyplpevjuxtdviu.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoam9sc3lwbHBldmp1eHRkdml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzkzMjksImV4cCI6MjA3Nzg1NTMyOX0.vQamH8C6O6VO3l9Hyu_TMrC-36aG5hSYaF_eugOsYpM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
