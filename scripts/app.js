var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo){
		//получаем из JSON описание задачи и переводим его в массив строк
		return toDo.description;
		
	});
	//var toDos = [
			//	"Закончить писать эту книгу",
			//	"Вывести Грейси на прогулку в парк",
			//	"Ответить на электронные письма",
			//	"Подготовиться к лекции в понедельник",
			//	"Обновить несколько новых задач",
			//	"Купить продукты"
			//	];
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
				else if ($element.parent().is(":nth-child(3)")){
					var organizedByTag = [
							{
							"name": "покупки",
							"toDos": ["Купить продукты"]
							},
							{
							"name": "рутина",
							"toDos": ["Купить продукты", "Вывести Грейси на прогулку в парк"]
							},
							{
							"name": "писательство",
							"toDos": ["Сделать несколько новых задач", "Закончить писать книгу"]
							},
							{

							"name": "работа",
									"toDos":  ["Сделать  несколько  новых  задач",  "Подготовиться  к  лекции в понедельник","Ответить на электронные письма", "Закончить писать книгу"]
							},
							{
							"name": " преподавание",
							"toDos": ["Подготовиться к лекции в понедельник"]
							},
							{
							"name": "питомцы",
							"toDos": ["Вывести Грейси на прогулку в парк "]
							}
						]
						organizedByTag.forEach(function (tag) {
							var $tagName=$("<h3/>").text(tag.name),
								$content=$("<ul/>");
							tag.toDos.forEach(function(description){
								var $li=$("<li/>").text(description);
								$content.append($li);								
							});
							$("main .content").append($tagName).append($content);
							
						});
						
						
				
				}
				else if ($element.parent().is(":nth-child(4)")) {
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

$(document).ready( function (){
	$.getJSON("todos.json", function (toDoObjects) {
		//передаём в main задачи
		main(toDoObjects);
	});
});