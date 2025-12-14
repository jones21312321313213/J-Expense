const API_BASE = 'http://localhost:8080/api/user';

const UserService = {
  getAllUsers: async () => {
    const res = await fetch(`${API_BASE}/getAllUsers`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  createUser: async (user) => {
    const res = await fetch(`${API_BASE}/insertUser`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  }
};

export default UserService;
