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
				//теги заданий
				else if ($element.parent().is(":nth-child(3)")){
					//создаём пустой массив для тегов
						var tags=[];
						//перебираем все задачи
						toDoObjects.forEach(function (toDo){
							//перебираем все теги
							toDo.tags.forEach(function (tag){
								//если такого тега у нас нет,то добавляем его в массив
								if(tags.indexOf(tag)===-1){
									tags.push(tag);
								}
							});
						});
					  var tagObjects=tags.map(function (tag){
							//массив для задач, которые содержат этот тег
							var toDosWithTag=[];
							toDoObjects.forEach(function(toDo){
								//проверяем, есть ли у задачи текущий тег
								if(toDo.tags.indexOf(tag)!==-1){
									toDosWithTag.push(toDo.description);
								}
							});
							//создаём объект с тегом и списком задач, его содержащим
							return {"name":tag, "toDos": toDosWithTag};
					  });  
					  //формируем html-код для вывода тегов и заданий
					tagObjects.forEach(function (tag) {
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
					//на  вкладке формируем поле и кнопку для добавления заданий
						var $input=$("<input/>",
						{
							type:"text",
							class:"description",
						});
						var $inputLabel=$("<p/>",
						{
							text:"Описание",							
						});
						var $tagInput=$("<input/>",
						{
							type:"text",
							class:"tags",
						});
						var $tagLabel=$("<p/>",
						{
							text:"Теги",							
						});
						var $button=$("<button/>",
							{
							text:"+",
							click: function(){
								if ($input.val()!=="" && $tagInput.val()!=="" ) {
									var description=$input.val(),
										tags=$tagInput.val().split(",");
									toDoObjects.push({"description":description, "tags":tags});
									toDos=toDoObjects.map(function(toDo){
										return toDo.description;										
									});
									$input.val("");
									$tagInput.val("");
								}
							}
						});
					$content = $("<div>").append($inputLabel)
										.append($input)
										.append($tagLabel)
										.append($tagInput)
										.append($button);
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
