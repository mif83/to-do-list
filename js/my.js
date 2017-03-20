/**
 * Created by user on 19.03.17.
 */
options = {
    elem: document.getElementsByClassName("list")[0],
    title:"To do list"
}

function List(options){
    var elem = options.elem,
        tasks = [];
    
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
     *
     * @param e
     */
    function click(e){
        var liElement = e.target.closest(".list__item");
        if(e.target.classList.contains("list__delete")){
            tasks.forEach(function(item,i){
                if(item.li === liElement){
                    tasks.splice(i,1);
                    liElement.parentNode.removeChild(liElement);
                }
            });
            console.log("delete");
            return;
        }
        if(liElement){
            tasks.forEach(function(item,i){
                if(item.li === liElement){
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
            });
            console.log("li");
            return;
        }
    }
    function inputAction(e){
        if(event.keyCode == 13){
            var obj = {
                text: e.target.value,
                ready:false,
                li:null
            };
            tasks.push(obj);
            renderItem(obj);
        }

    }
    function getTaks(){
        return tasks;
    }
    this.initList = initList;
    this.getTaks = getTaks;
}
var toDo = new List(options);
toDo.initList();