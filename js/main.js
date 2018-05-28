$(function() {
	$.scrollify({
		section:".overlay",
		scrollSpeed:1000,
		before:function(i) {
			switch($.scrollify.currentIndex()){
				case 0:
					$("button").removeClass("active");
					$("#btnHome").addClass("active");
					break;
				case 1:
					$("button").removeClass("active");
					$("#btnEmployment").addClass("active");
					break;
				case 2:
					$("button").removeClass("active");
					$("#btnEducation").addClass("active");
					break;
				case 3:
					$("button").removeClass("active");
					$("#btnSkills").addClass("active");
					break;
				case 4:
					$("button").removeClass("active");
					$("#btnContact").addClass("active");
					break;
			}
		}
	});
});
