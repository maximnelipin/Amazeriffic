var main = function () {
	"use strict";
	var addCommentFromInputBox = function () { //функция добаления комментрия
		var $new_comment;
		if($(".comment-input input").val()!==""){//Если поле непустое		
			$new_comment=$("<p>").text($(".comment-input input").val()); //создаем новый комментрий
			$new_comment.hide(); //скрыли
			$(".comments").append($new_comment); //добавили на страницу
			$new_comment.fadeIn(); //плавно вывели
			$(".comment-input input").val(""); //очмстили поле ввода
			}
	};
	$(".comment-input button").on("click", function (event) { //по нажатию на кнопку !!!! Обрабатываем кнопку BUTTON
		addCommentFromInputBox();
	});
	$(".comment-input input").on("keypress", function (event) {
		var $new_comment;
		if (event.keyCode === 13) { //по нажатию на Enter !!!! Обрабатываем поле ввода INPUT
			addCommentFromInputBox();
		}
	});
};
$(document).ready(main);