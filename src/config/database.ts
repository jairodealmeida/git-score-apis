export default {
  url: process.env.MONGO_URI || 'mongodb://localhost:27017/git-score',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};
