const mongoose = require('mongoose');

const { Schema } = mongoose;
 
const userSchema = new Schema({
  twitterID: Number
});

mongoose.model('users', userSchema);