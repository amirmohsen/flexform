export default new mongoose.Schema({
	profile: {
		name: String
	},
	children: [
		{
			name: String,
			image: String,
			gender: String
		}
	]
});