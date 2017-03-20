/**
 * Created by user on 19.03.17.
 */
options = {
    elem: document.getElementsByClassName("list")[0],
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
    var elem = options.elem,
        tasks = [];
    /**
     * Create title and DOM elements (input, ul)
     */
   function initList(){
        var h2 = document.createElement("h2"),
            input = document.createElement("input"),
            ul = document.createElement("ul");

        h2.textContent = options.title;
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "input something");
        input.classList.add("list__input-field");
        elem.appendChild(h2);
        elem.appendChild(input);
        ul.classList.add("list__main");
        elem.appendChild(ul);
        elem.addEventListener("click", click);
        input.addEventListener("keydown", inputAction);
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
        obj.li = li;
        li.classList.add("list__item");
        li.innerHTML = `<i class="fa fa-circle-o list__status" aria-hidden="true"></i>
            <span class="list__text">${obj.text}</span>
            <i class="fa fa-trash list__delete" aria-hidden="true"></i>`;
        elem.querySelector(".list__main").appendChild(li);
    }
    /**
     * delete or swith state item list
     * @param {Object} e - event "click"
     */
    function click(e){
        var liElement = e.target.closest(".list__item");
        // delete element from DOM and delete from tasks
        if(e.target.classList.contains("list__delete")){
            tasks.forEach(function(item,i){
                if(item.li === liElement){
                    del(i, liElement);
                }
            });
            return;
        }
        // switch class and elements state
        if(liElement){
            tasks.forEach(function(item,i){
                if(item.li === liElement){
                   toggle(item, liElement) ;
                }
            });
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

        if(!item.ready){
            item.ready = true;
            icon.classList.add("fa-check-circle-o");
            icon.classList.remove("fa-circle-o");
        } else {
            item.ready = false;
            icon.classList.remove("fa-check-circle-o");
            icon.classList.add("fa-circle-o");
        }
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
            var obj = {
                text: e.target.value,
                ready:false,
                li:null
            };
            if(e.target.value == "") return;
            tasks.push(obj);
            renderItem(obj);
            e.target.value ="";
        }
    }
    /**
     *
     * @returns {Array}
     */
    function getTaks(){
        return tasks;
    }
    this.initList = initList;
    this.getTaks = getTaks;
}

var toDo = new List(options);
toDo.initList();