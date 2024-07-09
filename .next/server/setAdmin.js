import supabaseAdmin from "./supabaseAdmin";

const ADMIN_EMAIL = "avdktlels@gmail.com";

export async function setAdmin() {
  const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  for (const user of users) {
    if (user.email === ADMIN_EMAIL) {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ is_admin: true })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating admin user:", error);
      } else {
        console.log(`Admin rights granted to ${user.email}`);
      }
    }
  }
}
