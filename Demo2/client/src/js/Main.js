import React, { Component } from "react";
import "./../css/style.css";
import ListTodo from "./ListTodo";
import App from "../App";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '',count: '',bookshelf_num: '',search_content: '',todolist: []};
        this.handleChange = this.handleChange.bind(this);
        this.countChange = this.countChange.bind(this);
        this.positionChange = this.positionChange.bind(this);
        this.search_contentChange=this.search_contentChange.bind(this);
        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.handleClick = this.handleClick.bind(this);
        this.ResetClick = this.ResetClick.bind(this);
        this.SearchClick=this.SearchClick.bind(this);
        //this.addclick=this.addclick.bind(this);
        this.ResetClick();
    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    countChange(event) {
        var new_value=event.target.value;
        new_value=new_value.replace(/[^\d]/g,'');
        this.setState({count: new_value});
    }
    positionChange(event) {
        this.setState({bookshelf_num: event.target.value});
    }
    search_contentChange(event){
        this.setState({search_content: event.target.value});
    }
    addclick=async (item) =>{
        var instance=this.props.contract;
        if(item.remain_count==item.count)return;
        try{
            var a= await instance.return_id(item.id,{from:this.props.accounts[0],gas: 100000});
            this.ResetClick();
        }catch(err){
            this.setState({name: err});
        }
    }
    reduceclick=async (item) =>{
        var instance=this.props.contract;
        if(item.remain_count==0)return;
        try{
            var a= await instance.lend_id(item.id,{from:this.props.accounts[0],gas: 100000});
            this.ResetClick();
        }catch(err){
            this.setState({name: err});
        }
    }
    handleClick=async () => {
        var instance=this.props.contract;
        var t_name =this.state.name;
        var t_count =this.state.count;
        var t_bookshelf_num =this.state.bookshelf_num;
        if(t_name=='')return;
        if(t_count=='')return;
        if(t_bookshelf_num=='')return;
        var t_list=this.state.todolist;
        try{
            var a= await instance.add_books(t_name,1, parseInt(t_count), 1,t_bookshelf_num,{from:this.props.accounts[0],gas: 1000000});
        }catch(err){
            this.setState({name: err});
        }
        this.ResetClick();
        this.setState({name:'',count:'',bookshelf_num:''});
    }
    SearchClick=async() =>{
        var instance=this.props.contract;
        var t_name=this.state.search_content;
        try{
            var new_list=this.state.todolist;
            new_list=[];
            var response=await instance.find_name(t_name);
            var temp=new Object();
            if(response[1]==""&&response[0]==0){
                this.setState({todolist: new_list});
                return;
            }
            temp.id=response[0].toNumber();
            temp.name=response[1];
            temp.kind=response[2];
            temp.count=response[3].toNumber()+'';
            temp.remain_count=response[4].toNumber()+'';
            temp.floor_number=response[5].toNumber()+'';
            temp.bookshelf_num=response[6];
            new_list.push(temp);
            this.setState({todolist: new_list});
        }catch(err){
            this.setState({name: err});
        }
    }
    ResetClick=async () => {
        var instance=this.props.contract;
        try{
            var t_num=await instance.All_books_num();
            var new_list=this.state.todolist;
            new_list=[];
            for(var i=0;i<t_num;i++){
                var response = await instance.find_id(i);
                var temp=new Object();
                temp.id=response[0].toNumber();
                temp.name=response[1];
                temp.kind=response[2];
                temp.count=response[3].toNumber()+'';
                temp.remain_count=response[4].toNumber()+'';
                temp.floor_number=response[5].toNumber()+'';
                temp.bookshelf_num=response[6];
                new_list.push(temp);
            }
            this.setState({todolist: new_list});
        }catch(err){
            this.setState({name: err});
        }
    }
    render() {
        const { web3, accounts, contract} = this.props;
        var name = this.state.name;
        var count = this.state.count;
        var bookshelf_num = this.state.bookshelf_num;
        var search_content=this.state.search_content;

        return(
            <div>
            <link href="./../css/bootstrap.min.css" rel="stylesheet"></link>
            <div class="container">
                <div class="row">
                    <div class="t_title">
                    <label class="text-center">书  &nbsp;&nbsp;&nbsp;&nbsp; 库</label>
                    <hr/>
                    <br/>
                    </div>
                </div>

                <div class="Add">
                    <label class="text_add">Add New Books</label>
                    <div class="Add_input">
                    <label for="input-goods-name">Books Name : </label>
                    <input type="text" id="input-goods-name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div class="Add_input">
                        <label for="input-goods-number">Books Count : </label>
                        <input type="text" id="input-goods-number" value={count} onChange={this.countChange}/>
                    </div>
                    <div class="Add_input">
                        <label for="input-goods-Price">Books Position : </label>
                        <input type="text" id="input-goods-Price"  value={bookshelf_num} onChange={this.positionChange}/>
                    </div>

                    <button id="submit-goods-info" onClick={this.handleClick}>添加书籍</button>
                </div>
                <div class="parent">
                <div action="" class="b_parent">
                        <input type="text" id="search_input" placeholder="输入搜索的书籍名字" value={search_content} onChange={this.search_contentChange}/>
                        <button id="search_button" onClick={this.SearchClick}>搜索</button>
                        <button id="reset_button" onClick={this.ResetClick}></button>
                </div>
                <ListTodo 
                    todolist={this.state.todolist}
                    addclick={this.addclick}
                    reduceclick={this.reduceclick} />
                </div>
                </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="./bootstrap.min.js"></script>
            </div>
    );
    }
};

export default Main;