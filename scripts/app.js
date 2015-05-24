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
				//новые задания в начале списка
				$content=$("<ul>");
					toDos.reduceRight(function (a,todo){
						$content.append($("<li>").text(todo));
					},0);
					}
				else if ($element.parent().is(":nth-child(2)")){
					//Старые задания в начале списка
					$content=$("<ul>");
					toDos.forEach(function (todo){
						$content.append($("<li>").text(todo));
					});
					
				}
				else if ($element.parent().is(":nth-child(3)")) {
					//на 3 вкладке формируем поле и кнопку для добавления заданий
						var $input=$("<input/>",
						{
							type:"text",							
						});
						var $button=$("<button/>",
							{
							text:"+",
							click: function(){
								if ($input.val()!=="") {
									toDos.push($input.val());
									$input.val("");
								}
							}
						});
					$content=$("<div>").append($input).append($button);
					}
			$("main .content").append($content);
			return false;
		});
			
		});
		$(".tabs a:first-child span").trigger("click");
	};

$(document).ready(main);