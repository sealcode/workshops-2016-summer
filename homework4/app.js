var tasks = [];

function render_task(task_data, index){
  var list = document.getElementById("to-do-list");
  var list_element = document.createElement("li");
  var item_title = document.createElement("div");
  var item_date = document.createElement("span");
  var item_checked = document.createElement("span");
  var icon = document.createElement("i");

  item_title.className = "title";
  item_date.className = "date";
  icon.className = "fa fa-clock-o";
  item_checked.className = "checked";

  item_title.textContent = task_data.title;

  var checkbox = document.createElement("input");
  var checked_info = document.createTextNode("Done?");

  checkbox.type="checkbox";

  if(task_data.done == true)
    checkbox.checked = "checked";

  checkbox["data-task-id"] = index;
  checkbox.onclick = checkbox_clicked;

  list_element.appendChild(item_title);
  list_element.appendChild(item_date);
  item_checked.appendChild(checkbox);
  item_date.appendChild(icon);

  item_date.innerHTML += " " + task_data.date_now;

  item_checked.appendChild(checked_info);
  list_element.appendChild(item_checked);
   
  list.appendChild(list_element);
  list.insertBefore(list_element, list.firstChild)
}

function checkbox_clicked(event){
  index = event.target["data-task-id"];
  tasks[index].done = event.target.checked;
}

function render(){
  var list = document.getElementById("to-do-list");

  while (list.hasChildNodes())
      list.removeChild(list.lastChild);

  tasks.forEach(render_task);
}

render();

function addTask(){
  var date_now = new Date().toJSON().slice(0,10);
  var title =  document.getElementById('new-title').value;

  if(title == "")
  {
    document.getElementById('new-title').style.border = '2px solid #9B0C00'; 
    return ;
  }
  else
     document.getElementById('new-title').style.border = '2px solid #ccc'; 

  var done = false;
  tasks.push({title,date_now,done});
  render();
  document.getElementById('new-title').value = "";
}


function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
      addTask;
    }
}

document.getElementById("create-new-task").onclick = addTask
document.getElementById("create-new-task").onkeyup = inputKeyUp;