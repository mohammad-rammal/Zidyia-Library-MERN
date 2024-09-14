// Import dependencies
const { registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl } = require('./authController');
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
const { VerificationToken } = require('../models/VerificationToken');
const bcrypt = require('bcryptjs');
const { cloudinaryUploadImage } = require('../utils/cloudinary');
const axios = require('axios');
const crypto = require('crypto');
const email = require('../utils/email');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');

// Mock dependencies
jest.mock('../models/User');
jest.mock('../models/VerificationToken');
jest.mock('bcryptjs');
jest.mock('../utils/cloudinary');
jest.mock('axios');
jest.mock('../utils/email');
jest.mock('fs');
jest.mock('crypto');

// Mock request and response objects
const req = {};
const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
};

// Tests for registerUserCtrl
describe('registerUserCtrl', () => {
    it('should register a new user', async () => {
        // Mock request body
        req.body = {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            studentId: '12345',
        };

        // Mock validation result
        validateRegisterUser.mockReturnValue({ error: null });

        // Mock user not found
        User.findOne.mockResolvedValue(null);

        // Mock bcrypt hashing
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');

        // Mock cloudinary upload
        cloudinaryUploadImage.mockResolvedValue({ secure_url: 'image_url', public_id: 'image_id' });

        // Mock axios response for location
        axios.get.mockResolvedValue({ data: { country: 'US', city: 'New York' } });

        // Mock saving user
        User.mockImplementationOnce(() => ({
            save: jest.fn().mockResolvedValue(),
        }));

        // Mock saving verification token
        VerificationToken.mockImplementationOnce(() => ({
            save: jest.fn().mockResolvedValue(),
        }));

        // Mock crypto token
        crypto.randomBytes.mockReturnValue({ toString: () => 'randomToken' });

        // Mock email sending
        email.mockResolvedValue();

        // Call the controller function
        await registerUserCtrl(req, res);

        // Check if response is sent with status 201
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'No image provided.' });
    });
});

// Tests for loginUserCtrl
describe('loginUserCtrl', () => {
    it('should login a user with valid credentials', async () => {
        // Mock request body
        req.body = {
            email: 'john@example.com',
            password: 'password',
        };

        // Mock validation result
        validateLoginUser.mockReturnValue({ error: null });

        // Mock user found
        const mockUser = {
            _id: 'user_id',
            role: 'user',
            profilePicture: 'profile_picture_url',
            fullName: 'John Doe',
            email: 'john@example.com',
            location: 'US, New York',
            bio: 'Lorem ipsum',
            generateAuthToken: jest.fn(() => 'token'),
            isAccountVerified: true, // Mocking isAccountVerified
        };
        User.findOne.mockResolvedValue(mockUser);

        // Mock bcrypt compare
        bcrypt.compare.mockResolvedValue(true);

        // Call the controller function
        await loginUserCtrl(req, res);

        // Check if response is sent with status 200
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: 'user_id',
            role: 'user',
            profilePicture: 'profile_picture_url',
            fullName: 'John Doe',
            email: 'john@example.com',
            location: 'US, New York',
            bio: 'Lorem ipsum',
            token: 'token',
        });
    });
});

// Tests for verifyUserAccountCtrl
describe('verifyUserAccountCtrl', () => {
    it('should verify a user account with valid token', async () => {
        // Mock request parameters
        req.params = { userId: 'user_id', token: 'verification_token' };

        // Mock user found
        User.findById.mockResolvedValue({ _id: 'user_id', save: jest.fn() }); // Mocking save method

        // Mock verification token found
        VerificationToken.findOne.mockResolvedValue({ userId: 'user_id', token: 'verification_token' });

        // Call the controller function
        await verifyUserAccountCtrl(req, res);

        // Check if response is sent with status 200
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Account Successfully Verified' });
    });
});
