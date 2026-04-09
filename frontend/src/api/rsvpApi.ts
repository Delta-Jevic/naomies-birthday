const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function getRsvps() {
  const response = await fetch(`${API_BASE_URL}/rsvps`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch RSVPs");
  }

  return result.data;
}

export async function createRsvp(
  name: string,
  phone: string,
  email: string
) {
  const response = await fetch(`${API_BASE_URL}/rsvps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      email,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit RSVP");
  }

  return result.data;
}