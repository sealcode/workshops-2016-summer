var taskUrl = 'http://sealcode.org:8082/api/v1/resources/task';
qwest.setDefaultOptions({
  cache: true
});

qwest.get(taskUrl, {}, {})
  .then(function(xhr, response) {
    for(var i = 0; i < response.length; i++) {
      var task = {
        title: response[i].body.title,
        is_done: response[i].body.is_done,
        id: response[i].id
      }
      tasks.push(task);
    }
    showTasks();
    onTaskChecked();
  });

var tasks = [
/*  {
    title: 'Odrobić zadanie domowe',
    is_done: false
  },
  {
    title: 'Napisać maila',
    is_done: false
  },
  {
    title: 'Spakować się',
    is_done: false
  },
  {
    title: 'Kupić klapki',
    is_done: false
  },
  {
    title: 'Zjeść obiad',
    is_done: true
  } */
];

function addTask(event) {
  event.preventDefault();
  var input = document.getElementById('todo-content');
  var title = input.value.trim();
  if(title) {
    var data = new FormData();
    data.append('title', title);
    data.append('is_done', false);

    qwest.post(taskUrl, data, { dataType: 'formdata' })
      .then(function(xhr, response) {
        var task = {
          title: response.body.title,
          is_done: response.body.is_done,
          id: response.id
        }
        tasks.push(task);
        showTask(task);
        input.value = '';
      }).catch(function(e, xhr, response) {
        console.log(e);
      });
  }
}

function showTask(task) {
  var list = document.querySelector('ul');
  var newTask = document.createElement('li');
  var taskLabel = document.createElement('span');
  var removeButton = document.createElement('span');

  var checkbox = document.createElement('input');
  checkbox.id = task.id;
  checkbox.type = 'checkbox';
  if(task.is_done) {
    checkbox.checked = 'checked';
  }
  checkbox.onclick = function() {
    check(task, !task.is_done);
    refreshCounter();
  }
  newTask.appendChild(checkbox);

  taskLabel.textContent = task.title;
  newTask.appendChild(taskLabel);
  removeButton.className = 'remove-button';
  removeButton.onclick = function () {
    removeTask(task);
  }
  newTask.appendChild(removeButton);
  list.appendChild(newTask);
  if(tasks.length) {
    hideEmptyListMessage();
  }
  refreshCounter();
}

function showTasks() {
  if(tasks.length) {
    tasks.forEach(showTask);
  } else {
    showEmptyListMessage();
  }
}

function showEmptyListMessage(show) {
  var message = document.getElementById('alert');
  if(!message) {
    message = document.createElement('h3');
    message.style.textAlign = 'center';
    message.textContent = 'Nie masz żadnych zadań do wykonania, dobra robota!';
    message.id = 'alert';
    document.querySelector('body').appendChild(message);
  }
  message.style.display = 'block';
  var counter = document.getElementById('counter');
  counter.style.display = 'none';
}

function hideEmptyListMessage() {
  var message = document.getElementById('alert');
  if(message && message.style.display !== 'none') {
    message.style.display = 'none';
  }
  var counter = document.getElementById('counter');
  counter.style.display = 'block';
}

function removeCompleted() {
  if(tasks.length) {
    var tasksToRemove = tasks.filter(task => task.is_done);
    tasksToRemove.forEach(removeTask);
  }
}

function removeTask(task) {
  qwest.delete(taskUrl + "/" + task.id, {}, {})
    .then(function(xhr, response) {
      tasks = tasks.filter(todo => todo.id != task.id);
      clearList();
      showTasks();
    });
}

function clearList() {
  var list = document.querySelector('ul');
  while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
  }
}

function countCompletedTasks() {
  return tasks.filter(task => task.is_done).length;
}

function refreshCounter() {
  var counter = document.getElementById('counter');
  counter.textContent = 'Wykonano ' + countCompletedTasks() + '/' + tasks.length + ' zadań';
}

function checkAll(is_done) {
  tasks.forEach(function(task) {
    check(task, is_done);
  });
}

function check(task, is_done) {
  var data = new FormData();
  data.append('title', task.title);
  data.append('is_done', is_done);
  qwest.put(taskUrl + "/" + task.id, data, {cache: true})
    .then(function(xhr, response) {
      task.is_done = response.body.is_done;
      document.getElementById(task.id).checked = task.is_done;
      refreshCounter();
      onTaskChecked();
    });
}

function areAllTasksSelected() {
  if(!tasks.filter(task => !task.is_done).length && tasks.length) {
    return true;
  }
  return false;
}

function onTaskChecked() {
  var selectAll = document.getElementById('select-all');
  var allSelected = areAllTasksSelected();
  selectAll.value = (allSelected ? 'Odznacz' : 'Zaznacz') + ' wszystkie';
  selectAll.onclick = function() {
    checkAll(!allSelected);
    clearList();
    showTasks();
  }
}

document.getElementById('todo-form').onsubmit = addTask;
document.getElementById('remove-completed').onclick = function() {
  removeCompleted();
  onTaskChecked();
};
