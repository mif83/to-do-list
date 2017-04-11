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
        // get tasks list from server
        sendRequestInit();
    }
    /**
     * Draw list element in DOM
     * @param {Object} obj  - it is a one lists element
     * obj{
     *         {String} text: - some task input by user from text field
     *          {Boolean} ready: - state element in the tasks
     *          {String} tskId: - unic id list element
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
    /**
     * Render all task list
     * @param {Array} tasksList - array of tasks from server
     */
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
            sendRequestDeleteTask(liElement.dataset.taskId);
            return;
        }
        // switch class and elements state
        if(liElement){
            sendRequestToggle(liElement.dataset.taskId);
            return;
        }
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
    /**
     * Show all task or only not complite tasks
     * @param {Object} e - event
     */
    function changeChekbox(e){
        elem.classList.toggle("list__active-tasks", e.target.value == "active" );
    }
    /**
     * Create AJAX request and send to server, after get answer function launches rendering
     * @param {Object} data  - aur task ( text: "some text", ready: false, taskId: "23242" )
     * @param {String} url - part url link to get access to server
     * @param {String} contentType -  "text/plain", "application/json" ...
     */
    function sendRequest(task, url, contentType){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url, true);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.send(JSON.stringify(task));

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                renderList(JSON.parse(xhr.responseText));
            }
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
    function sendRequestInit(){
        sendRequest("", "/init", "text/plain");
    }

    this.initList = initList;
    this.sendRequestAdd = sendRequestAdd;
    this.sendRequestDeleteTask = sendRequestDeleteTask;
    this.sendRequestDeleteAll = sendRequestDeleteAll;
    this.getSelf = function(){
        return elem;
    }
}

var toDo = new List(options);
toDo.initList();
