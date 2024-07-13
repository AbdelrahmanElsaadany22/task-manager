import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    visibility:{
     type: String,
     enum: ['Public', 'Private'], 
     required: true 
    },
    type:{ 
        type: String, 
        enum: ['Text', 'List'], 
        required: true 
    },
    //if type is Text then the text field is required
    text: { 
        type: String, 
        required: function() { return this.type === 'Text'; } 
    },
    //if type is List then the ListItmes is required
    listItems: [{
    text: { 
        type: String,
        required: function() { return this.type === 'List'; } 
    }
  }],
  category: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'category', 
     required: true 
    },
  user: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user',
    }
});

export const taskModel = mongoose.model('task', taskSchema);
