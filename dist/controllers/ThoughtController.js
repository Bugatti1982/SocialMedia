import User from '../models/User'; // Adjust import paths as needed
import Thought from '../models/Thought';
class ThoughtController {
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
            res.json(newThought);
        }
        catch (err) {
            res.status(500).json({ message: 'Failed to create thought', error: err });
        }
    }
    // DELETE a thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json({ message: 'Thought deleted' });
        }
        catch (err) {
            res.status(500).json({ message: 'Failed to delete thought', error: err });
        }
    }
    // POST a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json({ message: 'Failed to add reaction', error: err });
        }
    }
    // DELETE a reaction by reaction ID
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json({ message: 'Failed to delete reaction', error: err });
        }
    }
}
export default new ThoughtController();
