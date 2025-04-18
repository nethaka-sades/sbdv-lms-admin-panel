"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formatDate } from "date-fns/format";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error: signin_error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: u_data, error: u_error, status: u_status } = await supabase
    .from("profiles")
    .select(`is_Admin`)
    .eq("id", user?.id)
    .single();

  if (signin_error) {
    return encodedRedirect("error", "/sign-in", signin_error.message);
  } else {
    if (u_data?.is_Admin === true) {
      return redirect("/protected");
    } else {
      signOutAction();
      return encodedRedirect("error", "/sign-in", "Access Denied");
    }
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};


//user profile

export type UserProfile = {
  id: string;
  created_at: string;
  full_name: string;
  user_email: string;
  admin_no: string;
  admin_year: string;
  address: string,
  phone_no: string,
  whatsapp_no: string,
  verified: boolean,
  deletion_req: boolean,
  deletion_req_date: string,
  deletion_confirmed: boolean
};

// Verify Users
export const getVerifiedProfiles = async (): Promise<{
  data: UserProfile[];
  error: Error | null;
}> => {
  const supabase = await createClient();
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        admin_no,
        admin_year,
        created_at,
        user_email,
        verified,
        address,
        phone_no,
        whatsapp_no,
        deletion_req,
        deletion_req_date,
        deletion_confirmed
      `)
      .eq('verified', false)
      .order('created_at', { ascending: false });

    if (profilesError) throw profilesError;
    if (!profiles) return { data: [], error: null };

    const profilesWithEmails = profiles.map(profile => ({
      ...profile,
      email: profile.user_email || 'No email',
      created_at: new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      deletion_req_date: new Date(profile.deletion_req_date || "").toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }));

    return { data: profilesWithEmails, error: null };
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return {
      data: [],
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

export const updateVerifyUserData = async (updatedUser: UserProfile) => {
  try {
    const supabase = await createClient();
    const { data: updatedData, error } = await supabase
      .from('profiles')
      .update({ ...updatedUser, created_at: new Date(updatedUser.created_at), deletion_req_date: new Date(updatedUser.deletion_req_date) })
      .eq('id', updatedUser.id)
      .select();

    if (error) throw error;
    return updatedData;
  } catch (err) {
    console.error('Error updating profile:', err);
    return err;
  }
};

// Users
export const getUsersProfiles = async (): Promise<{
  data: UserProfile[];
  error: Error | null;
}> => {
  const supabase = await createClient();
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        admin_no,
        admin_year,
        created_at,
        user_email,
        verified,
        address,
        phone_no,
        whatsapp_no,
        deletion_req,
        deletion_req_date,
        deletion_confirmed
      `)
      .order('full_name', { ascending: true });

    if (profilesError) throw profilesError;
    if (!profiles) return { data: [], error: null };

    const profilesWithEmails = profiles.map(profile => ({
      ...profile,
      email: profile.user_email || 'No email',
      created_at: new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      deletion_req_date: new Date(profile.deletion_req_date || "").toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }));

    return { data: profilesWithEmails, error: null };
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return {
      data: [],
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

export const updateUserData = async (updatedUser: UserProfile) => {
  try {
    const supabase = await createClient();
    const { data: updatedData, error } = await supabase
      .from('profiles')
      .update({ ...updatedUser, created_at: new Date(updatedUser.created_at), deletion_req_date: new Date(updatedUser.deletion_req_date) })
      .eq('id', updatedUser.id)
      .select();

    if (error) throw error;
    return updatedData;
  } catch (err) {
    console.error('Error updating profile:', err);
    return err;
  }
};

// Deletion Requests
export const getDRProfiles = async (): Promise<{
  data: UserProfile[];
  error: Error | null;
}> => {
  const supabase = await createClient();
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        admin_no,
        admin_year,
        created_at,
        user_email,
        verified,
        address,
        phone_no,
        whatsapp_no,
        deletion_req,
        deletion_req_date,
        deletion_confirmed
      `)
      .eq('deletion_req', true)
      .order('deletion_req_date', { ascending: false });

    if (profilesError) throw profilesError;
    if (!profiles) return { data: [], error: null };

    const profilesWithEmails = profiles.map(profile => ({
      ...profile,
      email: profile.user_email || 'No email',
      created_at: new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      deletion_req_date: new Date(profile.deletion_req_date || "").toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }));

    return { data: profilesWithEmails, error: null };
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return {
      data: [],
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

export const updateDRData = async (updatedUser: UserProfile) => {
  try {
    const supabase = await createClient();
    const { data: updatedData, error } = await supabase
      .from('profiles')
      .update({ ...updatedUser, created_at: new Date(updatedUser.created_at), deletion_req_date: new Date(updatedUser.deletion_req_date) })
      .eq('id', updatedUser.id)
      .select();

    if (error) throw error;
    return updatedData;
  } catch (err) {
    console.error('Error updating profile:', err);
    return err;
  }
};