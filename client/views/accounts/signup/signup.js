Template.Signup.events({
    'submit form': function(e, templ) {
        e.preventDefault();

        // retrieve the input field values
        var email = templ.find('input[name=email]').value,
            password = templ.find('input[name=password]').value,
            firstname = templ.find('input[name=firstname]').value,
            lastname = templ.find('input[name=lastname]').value,
            street = templ.find('input[name=street]').value,
            nr = templ.find('input[name=nr]').value,
            city = templ.find('input[name=city]').value,
            zip = templ.find('input[name=zip]').value,
            country = templ.find('input[name=country]').value;

        // Trim & Validate
        // trim helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        };
        email = trimInput(email);

        // Relying on standard HTML email validation

        // Password validation
        var isValidPassword = function(password) {
            if (password.length >= 6) {
            	return true;
            } else {
				Notifications.error('Error', 'Your password should be at least 6 characters long!');
            	return false;
            }
        };

        // Crreate loginObject for use below
        var loginObject = {
            email: email,
            password: password,
            profile: {
                firstname: firstname,
                lastname: lastname,
                addresses: [
                    {
                        street: street,
                        nr: nr,
                        city: city,
                        zip: zip,
                        country: country
                    }
                ]
            }
        };


        // If validation passes, supply the appropriate fields to the
        if (isValidPassword(password)) {
            Accounts.createUser(loginObject, function(err) {
                if (err) {
                    // The user might not have been found, or their passwword
                    // could be incorrect. Inform the user that their
                    // login attempt has failed.
                    console.log('Oops something went wrong! | ' + err);
                } else {
                    // The user has been logged in.
                    console.log('You have successfully logged in');
                    Router.go('orders.upload');
                }

            });
        }


    }
});
