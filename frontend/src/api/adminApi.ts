const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Admin login failed");
  }

  return result;
}

export async function verifyAdminOtp(email: string, code: string) {
  const response = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "OTP verification failed");
  }

  return result;
}

/*
This is ready for later.
It will work after we create POST /api/admin/signup in the backend.
*/
export async function adminSignup(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/admin/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Admin signup failed");
  }

  return result;
}