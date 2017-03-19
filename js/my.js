/**
 * Created by user on 19.03.17.
 */
function List(options){
    var elem = options.elem;
    
    
    
    elem.onclick = function(event) {
        if (event.target.closest('.list__item')) {
            console.log("click");
        }
    };
}