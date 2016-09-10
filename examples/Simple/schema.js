export default new mongoose.Schema({
	profile: {
		name: String,
		age: Number,
		higherEd: Boolean
	},
	children: [
		{
			name: String,
			gender: {
				type: String,
				default: 'female'
			}
		}
	]
});