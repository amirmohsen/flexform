export default new mongoose.Schema({
	profile: {
		name: String,
		age: Number,
		higherEd: Boolean
	},
	children: [
		{
			name: String,
			image: String,
			gender: {
				type: String,
				default: 'female'
			}
		}
	]
});