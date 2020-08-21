class User {
	id;
	socialId;
	username;
	photoUrl;
	email;
	provider;
	insertedAt;
	updatedAt;
	roles = [];
}

module.exports = User;