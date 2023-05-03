/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Ajoute une nouvelle tâche à la liste
function addTask(event) {
  event.preventDefault(); // Empêche la page de se recharger
  const taskText = newTaskInput.value;
  if (taskText === '') {
    return; // Si le champ est vide, on ne fait rien
  }
  const newTask = document.createElement('li');
  
  // Ajout de la case à cocher
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  newTask.appendChild(checkbox);
  
  // Ajout du texte de la tâche
  const taskTextSpan = document.createElement('span');
  taskTextSpan.innerText = taskText;
  newTask.appendChild(taskTextSpan);
  
  taskList.appendChild(newTask);
  newTaskInput.value = ''; // Efface le champ de saisie
}

// Gère les clics sur le bouton d'ajout de tâche
addTaskButton.addEventListener('click', addTask);

// Gère les appuis sur la touche "Entrée" dans le champ de saisie
newTaskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask(event);
  }
});

// Gère les clics sur les cases à cocher
taskList.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'INPUT' && target.type === 'checkbox') {
    const listItem = target.parentNode;
    if (target.checked) {
      // Supprime l'élément de la liste après 2 secondes
      setTimeout(function() {
        listItem.parentNode.removeChild(listItem);
      }, 2000);
    }
  }
});
