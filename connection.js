function leer(name, att){
	var data = {
		tableName: name,
		attributes: att
	};

	$.ajax({
		url: 'https://lypqoj49qj.execute-api.us-east-2.amazonaws.com/dev/disasters/getData',
		type: 'POST',
		crossDomain: true,
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: 'json',
		success: function(data) {
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError);
		}
	});
}
