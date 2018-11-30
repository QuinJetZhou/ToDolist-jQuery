/*
 * @Author: ZHOU
 * @Date:   2018-11-26 15:12:43
 * @Last Modified by:   QuinJetZhou
 * @Last Modified time: 2018-11-30 15:43:44
 */
;
(function() {
    'use strict';

    var $form_add_task = $('.add-task'),
        
        task_list = {};

    
 

    init();

    $form_add_task.on('submit', function(e) {    
        var new_task = {},$input;
        // 禁用默认行为
        e.preventDefault();
        /*获取新Task值*/
        $input = $(this).find('input[name=content]');
        new_task.content = $input.val();

        // 如果新Task的值为空 则直接返回 否则继续执行
        if (!new_task.content) return;
        // 存入新Task
        if (add_task(new_task)){
            render_task_list();
            $input.val(null);
        }

    })

    function add_task(new_task){
        //将新task推入task_list
        task_list.push(new_task);
        //更新loaclStorage
        store.set('task_list',task_list);
        // store.clearAll();
        return true;
        console.log('task_list',task_list);
    }

    function init() {
        task_list = store.get('task_list') || [];
        if(task_list.length)
            render_task_list();
    }

    function render_task_list(){
        var $task_list = $('.task-list');
        $task_list.html('');
        for (var i = 0; i < task_list.length; i++) {
           var $task = render_task_item(task_list[i]);
           $task_list.append($task)
        }

    }

    function render_task_item(data){
        var list_item_tpl = 
        '<div class="task-item">'+
                '<span><input type="checkbox" ></span>'+
                '<span class="task-content">'+ data.content +'</span>'+
            '<span class="fr">'+
                '<span class="action"> 删除</span>'+
                '<span class="action"> 详细</span>'+
            '</span>'
        '</div>'; 
        return   $(list_item_tpl);
    }
})();