/**
 * Created by user on 19.03.17.
 */
options = {
    elem: document.querySelector('.list'),
    title:"To do list"
};
/**
 * Create elem to to lists
 * @param {Object} options params need for first start
 * options{
 *  {DOM elem } elem: - here insert toDo list
 *  {String} title: - title toDo list
 * }
 * @constructor
 */
function List(options){
    var elem = options.elem;
 //       tasks = [];
    /**
     * Create title and DOM elements (input, ul)
     */
   function initList(){
        var h2 = document.createElement("h2"),
            input = document.createElement("input"),
            ul = document.createElement("ul"),
            radio = document.createElement("div");

        h2.textContent = options.title;
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "input something");
        input.classList.add("list__input-field");
        ul.classList.add("list__main");
        radio.classList.add("list__radio");
        radio.innerHTML = `<label><input type="radio" name="chekbox" checked value="all"> All tasks</label>
        <label><input type="radio" name="chekbox" value="active"> Active tasks</label>`;

        elem.appendChild(h2);
        elem.appendChild(input);
        elem.appendChild(radio);
        elem.appendChild(ul);

        elem.addEventListener("click", click);
        input.addEventListener("keydown", inputAction);
        elem.addEventListener("change", changeChekbox);
    }
    /**
     * Draw list element in DOM
     * @param {Object} obj  - it is a one lists element
     * obj{
     *         {String} text: - some task input by user from text field
     *          {Boolean} ready: - state element in the tasks
     *          {DOM elemnt} li: - current item element self
     * }
     */
    function renderItem(obj){
        var li = document.createElement("li");
        li.classList.add("list__item");
        li.dataset.taskId = obj.taskId;
        li.innerHTML = `<i class="fa ${obj.ready? "fa-check-circle-o" : "fa-circle-o"} list__status" aria-hidden="true"></i>
            <span class="list__text">${obj.text}</span>
            <i class="fa fa-trash list__delete" aria-hidden="true"></i>`;
        elem.querySelector(".list__main").appendChild(li);
        li.classList.toggle("list__item--complete", obj.ready);

    }
    function renderList(tasksList){
        document.querySelector(".list .list__main").innerHTML = "";
        for(var i = 0; i < tasksList.length; i++){
            renderItem(tasksList[i]);
        }
    }
    /**
     * delete or swith state item list
     * @param {Object} e - event "click"
     */
    function click(e){
        var liElement = e.target.closest(".list__item");
        // delete element from DOM and delete from tasks
        if(e.target.classList.contains("list__delete")){
            console.log("list__delete");
            console.log(liElement.dataset.taskId);
            sendRequestDeleteTask(liElement.dataset.taskId);
            return;
        }
        // switch class and elements state
        if(liElement){
            console.log("toggle");
            sendRequestToggle(liElement.dataset.taskId);
            return;
        }
    }
    /**
     * Togle state in the DOM and in the object
     * @param {Object} item - one element from task
     * @param {DOM element} liElement - current elem
     */
    function toggle(item, liElement) {
        var icon = liElement.querySelector(".list__status");

        item.ready = !item.ready;
        icon.classList.toggle("fa-check-circle-o", item.ready);
        icon.classList.toggle("fa-circle-o", !item.ready);
        liElement.classList.toggle("list__item--complete");
    }
    /**
     * delete list element from DOM and tasks array
     * @param {number} i index i elemenst tasks
     * @param {DOM element} liElement curent DOM element
     */
    function del(i, liElement){
        tasks.splice(i,1);
        liElement.parentNode.removeChild(liElement);
    }
    /**
     * save some task from text field to the DOM and tasks array
     * @param {Object} e - event "keydown"
     */
    function inputAction(e){
        if(e.keyCode == 13){
            var newTask = {
                text: e.target.value,
                ready:false,
                taskId: (""+Math.random()).slice(2)
            };
            if(e.target.value == "") return;
            sendRequestAdd(newTask);
            e.target.value ="";
        }
    }
    function changeChekbox(e){
        elem.classList.toggle("list__active-tasks", e.target.value == "active" );
    }
    /**
     *
     * @returns {Array}
     */
    function getTaks(){
        return tasks;
    }
    function sendRequest(data, url, contentType){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url, true);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                renderList(JSON.parse(xhr.responseText));
               // return xhr.responseText;
            }

        }

    }
    function findDomElement(taskId){
        var tasks = document.querySelectorAll(".list .list__main li");
        for (var i =0; i < tasks.length; i++){
            if(tasks[i].taskId === taskId) return tasks[i];
        }
    }
    function sendRequestAdd(newTask){
        sendRequest(newTask, "/add", "application/json");

    }
    function sendRequestDeleteTask(taskId){
        sendRequest(taskId, "/delete", "text/plain");
    }
    function sendRequestDeleteAll(){
        sendRequest("", "/delete-all", "text/plain");
    }
    function sendRequestToggle(taskId){
        sendRequest(taskId, "/toggle", "text/plain");
    }
    this.initList = initList;
    this.getTaks = getTaks;
    this.sendRequestAdd = sendRequestAdd;
    this.sendRequestDeleteTask = sendRequestDeleteTask;
    this.sendRequestDeleteAll = sendRequestDeleteAll;
    this.getSelf = function(){
        return elem;
    }
}
/**
 *
 * @type {List}
 */
var toDo = new List(options);
toDo.initList();


/*
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length !== 0){
            var target = mutation.addedNodes[0];
            if (traget.id === "dsq-app4"){
                target.parentElement.removeChild(target);
                observer.disconnect();
            }
            console.log(mutation.addedNodes[0]);
        }

    });
});
var config = { attributes: true, childList: true, characterData: true, subtree: true };*/

// передаём в качестве аргументов целевой элемент и его конфигурацию
//observer.observe(toDo.getSelf(), config);

// позже можно остановить наблюдение
//observer.disconnect();