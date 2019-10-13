//Sets the username cookie when authed by Google
var user = cookie.get('user');
$('#google-button').on('click', function() {
	// Initialize with your OAuth.io app public key
	OAuth.initialize('vNZl9yAtVFT7j3XYV0art8LutKQ');
	// Use popup for oauth
	// Alternative is redirect
  	OAuth.popup('google').then(google => {
	    console.log(google);
	    google.me().done(function(data) {
	    	console.log(data.raw.names[0].displayName);
	    	if (!user) {
    			cookie.set('user', data.raw.names[0].displayName, {path: '/' });
  			}
	    	cookie.set('user', data.raw.names[0].displayName, {path: '/' });
		})
	});
})