import { Request, Response } from 'express';
import User from '../models/User'; // Adjust import paths as needed
import Thought from '../models/Thought';

class UserController {
    
    // GET all users
    async getAllUsers(_req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch users', error: err });
        }
    }

    // GET single user by ID, with populated thoughts and friends
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch user', error: err });
        }
    }

    // POST new user
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message: 'Failed to create user', error: err });
        }
    }

    // PUT update user by ID
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: 'Failed to update user', error: err });
        }
    }

    // DELETE user by ID and remove associated thoughts
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            await Thought.deleteMany({ userId: user._id });
            res.json({ message: 'User and associated thoughts deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete user', error: err });
        }
    }

    // POST add a friend to user's friend list
    async addFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to add friend', error: err });
        }
    }

    // DELETE remove a friend from user's friend list
    async removeFriend(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Failed to remove friend', error: err });
        }
    }
}

export default new UserController();