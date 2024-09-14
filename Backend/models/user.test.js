const mongoose = require('mongoose');
const { User, validateRegisterUser, validateLoginUser } = require('./User');

describe('User Model', () => {
    describe('Validation', () => {
        it('should return validation error if required fields are missing', () => {
            const user = new User();
            const validationResult = user.validateSync();
            expect(validationResult.errors.fullName).toBeDefined();
            expect(validationResult.errors.password).toBeDefined();
            expect(validationResult.errors.email).toBeDefined();
        });

        it('should return validation error if fullName is less than 2 characters', () => {
            const user = new User({ fullName: 'A' });
            const validationResult = user.validateSync();
            expect(validationResult.errors.fullName).toBeDefined();
        });
        
    });

    describe('Validation Functions', () => {
        describe('validateRegisterUser', () => {
            it('should return validation error if required fields are missing', () => {
                const userData = {};
                const validationResult = validateRegisterUser(userData);
                expect(validationResult.error).toBeDefined();
            });

            it('should return validation error if fullName is less than 2 characters', () => {
                const userData = { fullName: 'A' };
                const validationResult = validateRegisterUser(userData);
                expect(validationResult.error).toBeDefined();
            });

            it('should return validation error if email is not valid', () => {
                const userData = { email: 'invalid-email' };
                const validationResult = validateRegisterUser(userData);
                expect(validationResult.error).toBeDefined();
            });
        });

        describe('validateLoginUser', () => {
            it('should return validation error if required fields are missing', () => {
                const userData = {};
                const validationResult = validateLoginUser(userData);
                expect(validationResult.error).toBeDefined();
            });

            it('should return validation error if email is not valid', () => {
                const userData = { email: 'invalid-email' };
                const validationResult = validateLoginUser(userData);
                expect(validationResult.error).toBeDefined();
            });
        });
    });
});
