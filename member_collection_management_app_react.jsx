/*
DEPLOYMENT GUIDE
================

1. Open:
https://vercel.com
OR
https://netlify.com

2. Create a free account.

3. Create a React project using Vite:

Command:

npm create vite@latest member-management-app -- --template react

4. Open the project folder:

cd member-management-app

5. Install Tailwind CSS:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

6. Replace the code inside src/App.jsx with the below code.

7. Run the project:

npm install
npm run dev

8. Upload the project folder to GitHub.

9. Connect GitHub to Vercel or Netlify.

10. After deployment, you will get a live URL like:
https://member-management-app.vercel.app

=================================================
*/

export default function MemberCollectionApp() {
  const { useState } = React;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [currentPage, setCurrentPage] = useState('home');

  const [members, setMembers] = useState([
    { id: 1, name: 'Rahul', phone: '9876543210', role: 'Treasurer' },
    { id: 2, name: 'Ankit', phone: '9123456780', role: 'Member' },
  ]);

  const [memberForm, setMemberForm] = useState({
    id: null,
    name: '',
    phone: '',
    role: '',
  });

  const [collections, setCollections] = useState([
    { id: 1, member: 'Rahul', amount: 1000 },
    { id: 2, member: 'Ankit', amount: 1500 },
  ]);

  const [collectionForm, setCollectionForm] = useState({
    id: null,
    member: '',
    amount: '',
  });

  // LOGIN FUNCTION
  const handleLogin = () => {
    if (
      loginData.username === 'admin' &&
      loginData.password === 'admin123'
    ) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid Username or Password');
    }
  };

  // MEMBER CRUD
  const saveMember = () => {
    if (!memberForm.name || !memberForm.phone || !memberForm.role) {
      alert('Please fill all member fields');
      return;
    }

    if (memberForm.id) {
      setMembers(
        members.map((m) =>
          m.id === memberForm.id ? memberForm : m
        )
      );
    } else {
      setMembers([
        ...members,
        {
          ...memberForm,
          id: Date.now(),
        },
      ]);
    }

    setMemberForm({ id: null, name: '', phone: '', role: '' });
  };

  const editMember = (member) => {
    setMemberForm(member);
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // COLLECTION CRUD
  const saveCollection = () => {
    if (!collectionForm.member || !collectionForm.amount) {
      alert('Please fill all collection fields');
      return;
    }

    if (collectionForm.id) {
      setCollections(
        collections.map((c) =>
          c.id === collectionForm.id
            ? {
                ...collectionForm,
                amount: Number(collectionForm.amount),
              }
            : c
        )
      );
    } else {
      setCollections([
        ...collections,
        {
          ...collectionForm,
          id: Date.now(),
          amount: Number(collectionForm.amount),
        },
      ]);
    }

    setCollectionForm({ id: null, member: '', amount: '' });
  };

  const editCollection = (collection) => {
    setCollectionForm(collection);
  };

  const deleteCollection = (id) => {
    setCollections(collections.filter((c) => c.id !== id));
  };

  const totalAmount = collections.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login Page
          </h1>

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-3 rounded-xl mb-4"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                username: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl mb-4"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition"
          >
            Login
          </button>

          <div className="mt-4 text-sm text-gray-600 text-center">
            Username: admin <br /> Password: admin123
          </div>
        </div>
      </div>
    );
  }

  // HOME PAGE
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Member Collection Management</h1>

        <button
          className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>
      </div>

      <div className="p-6">
        {/* Navigation */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-gray-800 text-white px-5 py-3 rounded-xl hover:bg-black"
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage('members')}
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
          >
            Members List
          </button>

          <button
            onClick={() => setCurrentPage('collection')}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700"
          >
            Collection
          </button>
        </div>

        {/* HOME SECTION */}
        {currentPage === 'home' && (
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Welcome to the Management System
            </h2>

            <p className="text-lg text-gray-600 leading-8">
              This application is designed to manage members and collection
              details. You can:
            </p>

            <ul className="list-disc ml-8 mt-4 text-gray-700 space-y-2">
              <li>Add new members</li>
              <li>Update member details</li>
              <li>Delete members</li>
              <li>Add collection amounts</li>
              <li>Edit collection details</li>
              <li>Calculate total collection automatically</li>
            </ul>
          </div>
        )}

        {/* MEMBERS SECTION */}
        {currentPage === 'members' && (
          <div>
            <div className="bg-white p-6 rounded-3xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Add / Update Member</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Member Name"
                  className="border p-3 rounded-xl"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-3 rounded-xl"
                  value={memberForm.phone}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      phone: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Role"
                  className="border p-3 rounded-xl"
                  value={memberForm.role}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      role: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={saveMember}
                className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
              >
                {memberForm.id ? 'Update Member' : 'Add Member'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg overflow-auto">
              <h2 className="text-2xl font-bold mb-4">Members List</h2>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3">Name</th>
                    <th className="border p-3">Phone</th>
                    <th className="border p-3">Role</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="border p-3">{member.name}</td>
                      <td className="border p-3">{member.phone}</td>
                      <td className="border p-3">{member.role}</td>
                      <td className="border p-3 space-x-2">
                        <button
                          onClick={() => editMember(member)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteMember(member.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COLLECTION SECTION */}
        {currentPage === 'collection' && (
          <div>
            <div className="bg-white p-6 rounded-3xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">
                Add / Update Collection
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Member Name"
                  className="border p-3 rounded-xl"
                  value={collectionForm.member}
                  onChange={(e) =>
                    setCollectionForm({
                      ...collectionForm,
                      member: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Amount"
                  className="border p-3 rounded-xl"
                  value={collectionForm.amount}
                  onChange={(e) =>
                    setCollectionForm({
                      ...collectionForm,
                      amount: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={saveCollection}
                className="mt-4 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700"
              >
                {collectionForm.id
                  ? 'Update Collection'
                  : 'Add Collection'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg overflow-auto">
              <h2 className="text-2xl font-bold mb-4">Collection Table</h2>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3">Member</th>
                    <th className="border p-3">Amount</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {collections.map((item) => (
                    <tr key={item.id}>
                      <td className="border p-3">{item.member}</td>
                      <td className="border p-3">₹ {item.amount}</td>
                      <td className="border p-3 space-x-2">
                        <button
                          onClick={() => editCollection(item)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCollection(item.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-gray-300 font-bold">
                    <td className="border p-3 text-right">TOTAL =</td>
                    <td className="border p-3">₹ {totalAmount}</td>
                    <td className="border p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
