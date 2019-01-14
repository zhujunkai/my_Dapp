import React, { Component } from "react";
import "./../css/style.css";
class ListTodo extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const { todolist,addclick,reduceclick} = this.props;
        return(
        <div id="todo-list">
            {
                 // this.props.todo 获取父组件传递过来的数据
                 // {/* 遍历数据 */}
                 todolist.map(function (item,i) {
                     return (
                         <div id="petTemplate">
                             <h3>{item.id}</h3>
                             <strong>Books Name</strong>: <span>{item.name}</span><br/><br/>
                             <strong>Books Count</strong>: <span>{item.count}</span><br/><br/>
                             <strong>Books Remain</strong>: <span>{item.remain_count}</span><br/><br/>
                             <strong>Books Position</strong>: <span>{item.bookshelf_num}</span><br/><br/>
                             <button class="button_l" onClick={addclick.bind(this,item)}>还书</button><button class="button_r" onClick={reduceclick.bind(this,item)}>借书</button>
                         </div>
                     );
                 }) 
             }
            </div>
        );
    }
};

export default ListTodo;