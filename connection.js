var leerResult = [];

function leer(name, att, func = null){
	var data = {
		tableName: name,
		attributes: att
	};
	//Rodolfo
	$.ajax({
		url: 'https://lypqoj49qj.execute-api.us-east-2.amazonaws.com/dev/disasters/getData',
		type: 'POST',
		crossDomain: true,
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: 'json',
		success: function(data) {
			leerResult = data.Items;
			console.log(leerResult);
			if(func != null)
				func();
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError);
		}
	});
}
