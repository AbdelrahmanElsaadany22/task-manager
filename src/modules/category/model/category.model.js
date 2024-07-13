import mongoose, {Mongoose} from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: 
{ 
    type: String, 
    required: true 
},
user: 
{ 
type: mongoose.Schema.Types.ObjectId, ref: 'user'
},
  tasks:
   [{ type: mongoose.Schema.Types.ObjectId,  ref: 'task' }]
});

export const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;
