import express from 'express';
import User from '../../models/User';
const router = express.Router();
router.get('/api/users', async (_req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export default router;
