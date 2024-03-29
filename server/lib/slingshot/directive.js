Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
	bucket: "fotoposterireland",
	domain: "fotoposterireland.s3-eu-west-1.amazonaws.com",
	allowedFileTypes: ["image/tiff", "image/png", "image/jpeg"],
	maxSize: 0,
	acl: "public-read",

	authorize: function() {
		//Deny uploads if user is not logged in.
		if (!this.userId) {
			var message = "Please login before posting files";
			throw new Meteor.Error("Login Required", message);
		}

		return true;
	},

	key: function(file) {
		//Store file into a directory by the user's username.
		var user = Meteor.users.findOne(this.userId);
		return user._id + "/" + file.name;
	}
});
