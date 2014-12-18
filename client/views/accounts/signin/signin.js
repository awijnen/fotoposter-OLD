Template.Signin.events({
    'submit form': function(e, templ) {
        e.preventDefault();
        // retrieve the input field values
        var email = templ.find('input[name=email]').value,
            password = templ.find('input[name=password]').value;

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
            	// The user might not have been found, or their passwword
                // could be incorrect. Inform the user that their
                // login attempt has failed.
                console.log('Oops something went wrong! | ' + err);
			}
            else {
            	// The user has been logged in.
            	console.log('You have successfully logged in');
            }

        });
        return false;
    }
});
