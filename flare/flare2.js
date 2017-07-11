var data = {
 "name": "Desastres Naturales",
 "children": [
  {
   "name": "Europe",
   "id": "europa",
   "children": []
  },	
  {
   "name": "America",
   "id": "america",
   "children": []
  },
  {
   "name": "Asia",
   "id": "asia",
   "children": []
  },
  {
   "name": "Oceania",
   "id": "oceania",
   "children": []
  },
  {
   "name": "Africa",
   "id": "africa",
   "children": []
   }]
};

var asia = ["Indonesia","Philippines","Japan","Russia"];
var america = ["Nicaragua","Guatemala","Chile","Costa Rica","Ecuador","Mexico","Colombia","Peru","Montserrat","Trinidad","Canada","Martinique","St. Kitts & Nevis","Trinidad"];
var europa = ["Iceland","Spain","Portugal","Italy","United States","Greece"];
var africa = ["Congo, DRC","Cameroon","Yemen","Eritrea","Ethiopia","Comoros","Equatorial Guinea","Cape Verde"];
var oceania = ["Papua New Guinea","New Zealand","Tonga","Samoa","Vanuatu","Solomon Is.","Trinidad"];

$(function(){
	var url='https://lypqoj49qj.execute-api.us-east-2.amazonaws.com/dev/disasters/MapReduceQuery';
	var body = {
		tableName:"Eruptions",	
		groupingKey:"Country",
		groupinValue:"DEATHS"
	};
	$.post(url,body,function(message){
		var asiaChild = $.grep(data.children, function(e){ return e.id == "asia"; })[0];
		var americaChild = $.grep(data.children, function(e){ return e.id == "america"; })[0];
		var europaChild = $.grep(data.children, function(e){ return e.id == "europa"; })[0];
		var africaChild = $.grep(data.children, function(e){ return e.id == "africa"; })[0];
		var oceaniaChild = $.grep(data.children, function(e){ return e.id == "oceania"; })[0];
		$.each(message, function(index, elem) {
			var country = {"name": index, "size": elem};
			if ($.inArray(index,asia) > -1) {
				//console.log("asia",index);
				asiaChild.children.push(country);
			} else if ($.inArray(index,america) > -1) {
				//console.log("america",index);
				americaChild.children.push(country);
			} else if ($.inArray(index,europa) > -1) {
				//console.log("europa",index);
				europaChild.children.push(country);
			} else if ($.inArray(index,africa) > -1) {
				//console.log("africa",index);
				africaChild.children.push(country);
			} else if ($.inArray(index,oceania) > -1) {
				//console.log("oceania",index);
				oceaniaChild.children.push(country);
			} else {
				console.log("no contest",index);
			}
		});
		console.log(data.children);
		setD3();
	}); 
});


