var main = function () {
	"use strict";
	var toDos = [
				"Закончить писать эту книгу",
				"Вывести Грейси на прогулку в парк",
				"Ответить на электронные письма",
				"Подготовиться к лекции в понедельник",
				"Обновить несколько новых задач",
				"Купить продукты"
				];
	$(".tabs a span").toArray().forEach(function (element){
		//обработчик щелчка
		$(element).on("click", function () {
			var $element = $(element),
			$content;
			//снимае флаг активности с вкладки
			$(".tabs a span").removeClass("active");
			//делаем активную вкладку, на которой щёлкнули
			$element.addClass("active");
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")){
				$content=$("<ul>");
					toDos.reduceRight(function (a,todo){
						$content.append($("<li>").text(todo));
					},0);
					$("main .content").append($content);
					}
				else if ($element.parent().is(":nth-child(2)")){
					$content=$("<ul>");
					toDos.forEach(function (todo){
						$content.append($("<li>").text(todo));
					});
					$("main .content").append($content);
				}
				else if ($element.parent().is(":nth-child(3)")) {
						console.log("Щелчок на третьей вкладке!");
					}
			return false;
		});
			
		});
		$(".tabs a:first-child span").trigger("click");
	};

$(document).ready(main);