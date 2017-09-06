$(document).ready(function() {
  $('#newTaskForm').hide();
  var retrievedListo = localStorage.getItem('savedListo');
  var listo = JSON.parse(retrievedListo) || [];
  console.log('retrievedListo: ', JSON.parse(retrievedListo));
  var myTask = function(task) {
    this.task = task;
    this.id = 'new';
  };

  var savedHTML = function() {
    for (var i=0; i<listo.length; i++) {
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + listo[i].task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>')
    }
  }

  savedHTML();

  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i=0; i<listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

  var addTask = function(task) {
    if (task) {
      task = new myTask(task);
      listo.push(task);
      $('#newItemInput').val('');
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  })

  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  })

  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  })

  $(document).on('click', function() {
    localStorage.setItem('savedListo', JSON.stringify(listo));
    console.log('Im working');
  })

  var testObject = { 'one':1, 'two':2, 'three':3 };
  localStorage.setItem('testObject', JSON.stringify(testObject));
  var retrievedObject = localStorage.getItem('testObject');
  console.log('retrievedObject: ', JSON.parse(retrievedObject));

});
