import User from '../models/User.js';
import Image from '../models/Image.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// GET all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// GET single user by ID (admin only)
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate({
        path: 'orders',
        populate: { path: 'orderItems.product', model: 'Product' },
      });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// CREATE new user (signup)
export const registerUser = async (req, res, next) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user object
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'user',
    };

    // Handle profile image if provided
    if (req.file) {
      const img = await Image.create({
        filename: `${Date.now()}_${req.file.originalname}`,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });
      userData.profile_avatar = `/api/images/${img.filename}`;
    }

    // Create new user
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Return response
    res.status(201).json({
      success: true,
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN user
export const loginUser = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Set HTTP-only cookie with token (for added security)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Return response
    res.json({
      success: true,
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE user

export const updateUser = async (req, res, next) => {
  try {
    // Get the user ID (from params or the authenticated user)
    const userId = req.params.id || req.user._id;

    // Check if user is updating own profile or admin is updating
    if (req.user._id.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this user',
      });
    }

    // Don't allow role change unless admin
    if (req.body.role && req.user.role !== 'admin') {
      delete req.body.role;
    }

    // Create update data object
    const updateData = { ...req.body };

    // Handle password update if provided
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Handle file upload if provided
    if (req.file) {
      try {
        // Create image entry in database
        const img = await Image.create({
          filename: `user_${userId}_${Date.now()}_${req.file.originalname.replace(/\s/g, '_')}`,
          data: req.file.buffer,
          contentType: req.file.mimetype,
        });
      // Set the profile_avatar URL in update data
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://quickcart-api.onrender.com' 
        : 'http://localhost:5000';
        updateData.profile_avatar = `${baseUrl}/api/images/${img.filename}`;
      } catch (err) {
        console.error('Error handling profile image:', err);
        // Continue with update even if image fails
      }
    }

    // Update user with new data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

// DELETE user
export const deleteUser = async (req, res, next) => {
  try {
    // Check if user is deleting own account or admin is deleting
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this user',
      });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id).select('-password');

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User successfully deleted',
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  res.json({ success: true, data: req.user });
};

// Log out user
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
};

// change password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // check if required fields exit
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    // get user from database (including password)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // check if current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    next(err);
  }
};
