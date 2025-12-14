const API_BASE = 'http://localhost:8080/auth/user';

// Helper to get Authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
};

const UserService = {
  getAllUsers: async () => {
    const res = await fetch(`${API_BASE}/all`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  getUserById: async (userId) => {
    const res = await fetch(`${API_BASE}/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  createUser: async (user) => {
    const res = await fetch(`${API_BASE}/insertUser`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },

  getLoggedInUser: async () => {
    const res = await fetch(`${API_BASE}/me`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },

  updateUser: async (uid, data) => {
    const res = await fetch(`${API_BASE}/update?uid=${uid}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update user");

    const response = await res.json();

    // 🔁 Replace token immediately
    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    return response.user;
  },

  changePassword: async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/auth/user/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to change password");
  }

  return true;
},


};

export default UserService;
