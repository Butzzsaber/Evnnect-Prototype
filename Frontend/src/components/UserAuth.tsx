import React, { useState } from "react";
import { User } from "lucide-react";
import axios from "axios";

type AppUser = {
  id: string;
  name: string;
  email: string;
  type: "user" | "host";
};

interface UserAuthPageProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  setCurrentPage: React.Dispatch<
    React.SetStateAction<
      "home" | "host-auth" | "user-auth" | "host-dashboard" | "user-dashboard" | "map"
    >
  >;

}

const UserAuthPage: React.FC<UserAuthPageProps> = ({ setCurrentUser, setCurrentPage }) => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
   const [Evmodel, setEvmodel] = useState('');
   const [ChargingType, setChargingType] = useState('');
 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:5000/data');
      const users = res.data;
      const user = users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      );
      console.log(user);
      if (user) {
        setCurrentUser({
          id: user.id,
          name: user.name,
          email: user.email,
          type: "user",
        });
        setCurrentPage("user-dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        
        const newUser = {
          
          name: name,
          email: email,
          password: password,
          evModel: Evmodel,
    ChargingType : ChargingType,
    type: "user" as "user",
        };
  await axios.post('http://localhost:5000/signup', newUser);
  const res = await axios.get('http://localhost:5000/data');
      const users = res.data;
      const user = users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      );
  setCurrentUser(user);
  setCurrentPage("user-dashboard");
      }
    catch(error){
      console.error('Error signing up:', error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {authMode === "login" ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-gray-600 mt-2">User Dashboard Access</p>
        </div>

        <form
          className="space-y-6"
          onSubmit = {authMode === "login" ? handleLogin : handleSignup}
        >
          {authMode === "signup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EV Model
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Tesla Model 3, Nissan Leaf"
                  value={Evmodel}
                  onChange={(e) => setEvmodel(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charging Port Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                onClick={(e) => setChargingType(e.currentTarget.value)}>
                  <option>Tesla</option>
                  <option>CCS</option>
                  <option>CHAdeMO</option>
                  <option>Type 2</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
               value={password}   
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition"
          >
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {authMode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
