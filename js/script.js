'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoBlock = document.querySelector('#todo'),
    completeBlock = document.querySelector('#completed');

  let data = {
    todo: [],
    completed: []
  };

  if (localStorage.getItem('localData')) {
    data = JSON.parse(localStorage.getItem('localData'));
  };

  const renderForUpData = function () {
    if (!data.todo.length && !data.completed.length) return;
    data.todo.forEach(function (item) {
      renderItem(item);
    });

    data.completed.forEach(function (item) {
      renderItem(item, true);
    });
  };

  const dataUpdata = function () {
    localStorage.setItem('localData', JSON.stringify(data));
  };

  const addItem = function (text) {
    renderItem(text);
    data.todo.push(text);
    headerInput.value = '';

    dataUpdata();
  },
    itemRemove = function (elem) {
      let item = this.parentNode.parentNode,
        itemParent = item.parentNode,
        id = itemParent.id,
        text = item.textContent;

      itemParent.removeChild(item);
      if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1);
      } else {
        data.completed.splice(data.completed.indexOf(text), 1);
      }

      dataUpdata();
    },
    itemComplete = function (elem) {
      let item = this.parentNode.parentNode,
        itemParent = item.parentNode,
        id = itemParent.id,
        text = item.textContent,
        block;

      if (id === 'todo') {
        block = completeBlock;
        data.todo.splice(data.todo.indexOf(text), 1);
        data.completed.push(text);
      } else {
        block = todoBlock;
        data.completed.splice(data.completed.indexOf(text), 1);
        data.todo.push(text);
      }
      itemParent.removeChild(item);
      block.insertBefore(item, block.childNodes[0]);

      dataUpdata();
    };

  const renderItem = function (text, completed = false ) {
    const item = document.createElement('li'),
      btns = document.createElement('div'),
      btnRemove = document.createElement('button'),
      btnComplete = document.createElement('button');

    let list;

    if (completed) {
      list = completeBlock;
    } else {
      list = todoBlock;
    }

    item.classList.add('todo-item');
    btns.classList.add('todo-buttons');
    btnRemove.classList.add('todo-remove');
    btnComplete.classList.add('todo-complete');

    item.textContent = text;
    btns.appendChild(btnRemove);
    btns.appendChild(btnComplete);
    item.appendChild(btns);
    list.insertBefore(item, list.childNodes[0]);

    btnRemove.addEventListener('click', itemRemove);
    btnComplete.addEventListener('click', itemComplete);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (headerInput.value !== '') {
      addItem(headerInput.value);
    }
  });

  renderForUpData();
});