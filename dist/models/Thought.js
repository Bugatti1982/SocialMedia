import { Schema, model } from 'mongoose';
import ReactionSchema from './Reaction.js'; // Import the ReactionSchema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
const Thought = model('Thought', ThoughtSchema);
export default Thought;
