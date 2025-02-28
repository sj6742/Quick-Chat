import User from "../Models/userm.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../Lib/utils.js";
import cloudinary from "../Lib/cloudinary.js";
// import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic: "",
            phone: "", 
            bio: "",
        });

        await newUser.save();

        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || "",
            phone: user.phone || "",
            bio: user.bio || "",
        });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBio = async (req, res) => {
    try {
        const { Bio } = req.body;
        const userId = req.user._id;

        if (!Bio) {
            return res.status(400).json({ message: "Bio is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { Bio }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Bio updated successfully",
            bio: updatedUser.Bio,
        });
    } catch (error) {
        console.error("Error in updateBio controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePhoneNumber = async (req, res) => {
    try {
        const { phone } = req.body;
        const userId = req.user._id;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { phone },
            { new: true }
        );

        res.status(200).json({
            message: "Phone number updated successfully",
            phone: updatedUser.phone,
        });
    } catch (error) {
        console.error("Error in updatePhoneNumber controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        
        const userId = req.user._id;
        console.log("User ID:", userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }    
        // await user.remove();
        await user.deleteOne();
        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        // console.error(error);
        console.error("Error during account deletion:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};
