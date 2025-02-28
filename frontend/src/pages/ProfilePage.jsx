import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Phone } from "lucide-react";

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
];

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, updatePhoneNumber, updateBio } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [phone, setPhone] = useState(authUser?.phone?.replace(/^(\+\d{1,3})\s?/, '') || "");
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    if (phone && !phone.startsWith(countryCode)) {
      setPhone(phone.replace(/^(\+\d{1,3})\s?/, ''));
    }
  }, [countryCode, phone]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleProfileUpdate = async () => {
    const finalPhone = `${countryCode} ${phone.replace(/^(\+\d{1,3})\s?/, '')}`;
    await updatePhoneNumber(finalPhone);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-900 via-purple-700 to-fuchsia-500 text-gray-100 p-8 overflow-hidden">
      <div className="w-full max-w-4xl bg-gray-900/80 p-10 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-700 mt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Profile</h1>
          <p className="text-gray-300 mt-2">Update your profile information</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-fuchsia-500 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-fuchsia-500 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Full Name */}
          <div className="space-y-2">
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-4 py-2.5 w-full bg-gray-800 rounded-lg border border-gray-600 text-fuchsia-300"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 w-full bg-gray-800 rounded-lg border border-gray-600 text-fuchsia-300"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2 col-span-2">
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number
            </div>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-gray-800 text-white px-2 py-2 border border-gray-600 rounded-lg"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <input
                maxLength={10}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-2.5 w-full bg-gray-800 rounded-lg border border-gray-600 text-fuchsia-300"
              />
            </div>
          </div>

          <div
            className="mt-6 rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center py-20 ">
            <button
              onClick={handleProfileUpdate}
              className="bg-fuchsia-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-fuchsia-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
