import '../styles/default.scss';




document.addEventListener('DOMContentLoaded', function () {

    var form = document.querySelector('.main-layout');
    var input = document.querySelector('.todo-creator_text-input');
    var list = document.querySelector('.todos-list');
    var removeItems = list.querySelectorAll('.todos-list_item_remove');
    var filteWrapper = document.querySelector('.filters');
    var filters = document.querySelectorAll('.filter-item');
    var clearCompleted = document.querySelector(".todos-toolbar_clear-completed");

    clearCompleted.addEventListener(
            'click',
            function (e) {
                var listItems = document.querySelectorAll('.todos-list_item');
                for (var m = 0; m < listItems.length; m++){
                    var input = listItems[m].querySelector('input');
                    if (input.checked === true){
                        listItems[m].parentNode.removeChild(listItems[m]);
                    }
                }
            }
    );

    for (var j = 0; j < filters.length; j++) {
        filters[j].addEventListener(
                'click',
                function (e) {
                    var filterLastSelected = filteWrapper.querySelector('.filter-item.__selected');
                    if (!this.classList.contains('__selected')) {
                        filterLastSelected.classList.remove('__selected');
                        this.classList.add('__selected');
                        if (this.dataset.action === 'active') {
                            showFilterItems('active');
                        } else if (this.dataset.action === 'completed') {
                            showFilterItems('completed');
                        } else {
                            showFilterItems('all');
                        }
                    }
                }
        );
    }

    function showFilterItems(activeFilter) {
        var listItems = document.querySelectorAll('.todos-list_item');
        for (var k = 0; k < listItems.length; k++) {
            var input = listItems[k].querySelector('input');
            console.log(input.value);
            switch (activeFilter) {
            case 'active':
                if (input.checked === true && !listItems[k].classList.contains('hidden')){
                    listItems[k].classList.add('hidden');
                } else {
                    listItems[k].classList.remove('hidden');
                }
                break;
            case 'completed':
                if (input.checked === false && !listItems[k].classList.contains('hidden')){
                    listItems[k].classList.add('hidden');
                } else {
                    listItems[k].classList.remove('hidden');
                }
                break;
            default:
                if (listItems[k].classList.contains('hidden')) {
                    listItems[k].classList.remove('hidden');
                }
                break;
            }

        }
    }


    var templates = {
        listItem: function (data) {
            var item = document.createElement('div');
            item.className = 'todos-list_item';
            var checkboxwrapper = document.createElement('div');
            checkboxwrapper.className = 'custom-checkbox todos-list_item_ready-marker';
            var checkbox = document.createElement('input');
            checkbox.className = 'custom-checkbox_target';
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('aria-label','Mark todo as ready');
            checkboxwrapper.appendChild(checkbox);
            var customcheckboxvisual = document.createElement('div');
            customcheckboxvisual.className = 'custom-checkbox_visual';
            item.appendChild(checkboxwrapper);
            var customcheckboxvisualicon = document.createElement('div');
            customcheckboxvisualicon.className = 'custom-checkbox_visual_icon';
            customcheckboxvisual.appendChild(customcheckboxvisualicon);
            checkboxwrapper.appendChild(customcheckboxvisual);
            var itemremove = document.createElement('button');
            itemremove.className = 'todos-list_item_remove';
            itemremove.setAttribute('aria-label','Delete todo');
            item.appendChild(itemremove);
            var itemtextw = document.createElement('div');
            itemtextw.className = 'todos-list_item_text-w';
            var itemtext = document.createElement('textarea');
            itemtext.className = 'todos-list_item_text';
            itemtext.appendChild(document.createTextNode(data.text || ''));
            itemtextw.appendChild(itemtext);
            item.appendChild(itemtextw);
            return {
                root: item,
                deleteLink: itemremove
            };
        }
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            processingInput();
        }
    });

    function processingInput() {
        var text = input.value.trim();
        if (text.length !== 0) {
            input.value = '';
            addItem(text);
        }
    }
    function addItem(text) {
        var templateResult = templates.listItem({
            text: text
        });

        templateResult.deleteLink.addEventListener(
                'click',
                function (e) {
                    e.preventDefault();
                    var item = this.closest('.todos-list_item');
                    item.parentNode.removeChild(item);
                }
        );
        console.log(templateResult);
        list.appendChild(templateResult.root);
    }



    for (var i = 0; i < removeItems.length; i++) {
        removeItems[i].addEventListener(
                'click',
                function (e) {
                    e.preventDefault();
                    var item = this.closest('.todos-list_item');
                    item.parentNode.removeChild(item);
                }
        );
    }
});

